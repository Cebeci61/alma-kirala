const prisma = require("../utils/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, storeId } = req.body;

    if (!title || !price || !storeId) {
      return res.status(400).json({ message: "Ürün adı, fiyat ve mağaza zorunlu" });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({ message: "Fiyat 0'dan büyük olmalı" });
    }

    const store = await prisma.store.findUnique({
      where: { id: Number(storeId) }
    });

    if (!store) return res.status(404).json({ message: "Mağaza bulunamadı" });
    if (store.ownerId !== req.user.id) return res.status(403).json({ message: "Bu mağaza sana ait değil" });
    if (store.status !== "active") return res.status(400).json({ message: "Mağaza aktif değil" });

    const productCount = await prisma.product.count({
      where: { storeId: Number(storeId) }
    });

    if (productCount >= 10) {
      return res.status(400).json({ message: "Bir mağaza en fazla 10 ürün ekleyebilir" });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        storeId: Number(storeId)
      }
    });

    res.json({
      message: "Ürün başarıyla eklendi",
      product
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const where = {
      store: {
        status: "active"
      }
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { store: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: Number(limit)
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: { store: true }
    });

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }

    res.json(product);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};