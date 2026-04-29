const prisma = require("../utils/prisma");

exports.createReservation = async (req, res) => {
  try {
    const { productId, startDate, endDate, quantity } = req.body;

    if (!productId || !startDate || !endDate) {
      return res.status(400).json({
        message: "Ürün, başlangıç tarihi ve bitiş tarihi zorunlu"
      });
    }
    const start = new Date(startDate);
const end = new Date(endDate);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return res.status(400).json({
    message: "Geçerli tarih gir"
  });
}

if (end <= start) {
  return res.status(400).json({
    message: "Bitiş tarihi başlangıçtan sonra olmalı"
  });
}

    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId)
      },
      include: {
        store: true
      }
    });

    if (!product) {
      return res.status(404).json({
        message: "Ürün bulunamadı"
      });
    }

    if (product.store.status !== "active") {
      return res.status(400).json({
        message: "Bu mağaza aktif değil"
      });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId: Number(req.user.id),
        productId: Number(productId),
       startDate: start,
endDate: end,
        quantity: Number(quantity) || 1
      }
    });

    res.json({
      message: "Rezervasyon talebi oluşturuldu",
      reservation
    });

  } catch (error) {
    console.log("REZERVASYON HATASI:", error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};
exports.getMyReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        product: {
          include: {
            store: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};
exports.getStoreReservations = async (req, res) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        product: {
          store: {
            ownerId: req.user.id
          }
        }
      },
      include: {
        user: true,
        product: {
          include: {
            store: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status sadece approved veya rejected olabilir"
      });
    }

    const reservation = await prisma.reservation.findUnique({
      where: { id: Number(id) },
      include: {
        product: {
          include: {
            store: true
          }
        }
      }
    });

    if (!reservation) {
      return res.status(404).json({
        message: "Rezervasyon bulunamadı"
      });
    }

    if (reservation.product.store.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Bu rezervasyonu güncelleme yetkin yok"
      });
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: Number(id) },
      data: { status }
    });

    res.json({
      message: "Rezervasyon durumu güncellendi",
      reservation: updatedReservation
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};