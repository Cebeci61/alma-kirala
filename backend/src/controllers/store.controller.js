const prisma = require("../utils/prisma");

exports.createStore = async (req, res) => {
  try {
    const { name, description } = req.body;

    const store = await prisma.store.create({
      data: {
        name,
        description,
        ownerId: req.user.id
      }
    });

    res.json({
      message: "Mağaza oluşturuldu, onay bekliyor",
      store
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};
exports.getPendingStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        status: "pending"
      }
    });

    res.json(stores);

  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
exports.approveStore = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.update({
      where: { id: parseInt(id) },
      data: { status: "active" }
    });

    res.json({
      message: "Mağaza onaylandı",
      store
    });

  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
exports.getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        status: "active"
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        products: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(stores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findUnique({
      where: {
        id: Number(id)
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        products: true
      }
    });

    if (!store) {
      return res.status(404).json({ message: "Mağaza bulunamadı" });
    }

    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};
exports.getMyStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        ownerId: req.user.id
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        products: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.json({ stores });
  } catch (error) {
    console.error("getMyStores error:", error);
    return res.status(500).json({
      message: "Mağazalar getirilemedi"
    });
  }
};