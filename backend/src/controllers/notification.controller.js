const prisma = require("../utils/prisma");

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!notification) {
      return res.status(404).json({ message: "Bildirim bulunamadı" });
    }

    if (notification.userId !== req.user.id) {
      return res.status(403).json({ message: "Bu bildirime erişemezsin" });
    }

    const updatedNotification = await prisma.notification.update({
      where: {
        id: Number(id)
      },
      data: {
        isRead: true
      }
    });

    res.json({
      message: "Bildirim okundu olarak işaretlendi",
      notification: updatedNotification
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};