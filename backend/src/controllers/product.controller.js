const prisma = require("../utils/prisma");

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, storeId } = req.body;

    const cleanTitle = String(title || "").trim();
    const cleanDescription = String(description || "").trim();
    const cleanPrice = Number(price);
    const cleanStoreId = Number(storeId);

    if (!cleanTitle || !cleanDescription || !cleanPrice || !cleanStoreId) {
      return res.status(400).json({
        message: "Ürün adı, açıklama, fiyat ve mağaza zorunlu"
      });
    }

    if (cleanPrice <= 0) {
      return res.status(400).json({
        message: "Fiyat 0'dan büyük olmalı"
      });
    }

    const store = await prisma.store.findUnique({
      where: {
        id: cleanStoreId
      }
    });

    if (!store) {
      return res.status(404).json({
        message: "Mağaza bulunamadı"
      });
    }

    if (store.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Bu mağaza sana ait değil"
      });
    }

    // Geçici güvenli çözüm:
    // status alanı yoksa veya boşsa ürün eklemeyi engelleme.
    if (store.status && store.status !== "active") {
      return res.status(400).json({
        message: "Mağaza aktif değil"
      });
    }

    const productCount = await prisma.product.count({
      where: {
        storeId: cleanStoreId
      }
    });

    if (productCount >= 10) {
      return res.status(400).json({
        message: "Bir mağaza en fazla 10 ürün ekleyebilir"
      });
    }

    const product = await prisma.product.create({
      data: {
        title: cleanTitle,
        description: cleanDescription,
        price: cleanPrice,
        storeId: cleanStoreId
      }
    });

    return res.status(201).json({
      message: "Ürün başarıyla eklendi",
      product
    });

  } catch (error) {
    console.error("createProduct error:", error);
    return res.status(500).json({
      message: "Ürün eklenirken sunucu hatası oluştu",
      error: error.message
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    const where = {};

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

    return res.json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    console.error("getProducts error:", error);
    return res.status(500).json({
      message: "Ürünler getirilemedi",
      error: error.message
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        message: "Geçersiz ürün id"
      });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { store: true }
    });

    if (!product) {
      return res.status(404).json({
        message: "Ürün bulunamadı"
      });
    }

    return res.json(product);

  } catch (error) {
    console.error("getProductById error:", error);
    return res.status(500).json({
      message: "Ürün detayı getirilemedi",
      error: error.message
    });
  }
};