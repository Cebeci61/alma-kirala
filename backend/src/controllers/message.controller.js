const prisma = require("../utils/prisma");

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, productId, content } = req.body;

    if (!receiverId || !content) {
      return res.status(400).json({
        message: "Alıcı ve mesaj içeriği zorunlu"
      });
    }

    if (Number(receiverId) === req.user.id) {
      return res.status(400).json({
        message: "Kendine mesaj gönderemezsin"
      });
    }

    const receiver = await prisma.user.findUnique({
      where: {
        id: Number(receiverId)
      }
    });

    if (!receiver) {
      return res.status(404).json({
        message: "Alıcı bulunamadı"
      });
    }

    const message = await prisma.message.create({
      data: {
        senderId: req.user.id,
        receiverId: Number(receiverId),
        productId: productId ? Number(productId) : null,
        content
      }
    });

    await prisma.notification.create({
      data: {
        userId: Number(receiverId),
        title: "Yeni mesaj",
        message: "Yeni bir mesajın var"
      }
    });

    res.json({
      message: "Mesaj gönderildi",
      data: message
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getMyMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id },
          { receiverId: req.user.id }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const otherUserId = Number(req.params.userId);

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: req.user.id,
            receiverId: otherUserId
          },
          {
            senderId: otherUserId,
            receiverId: req.user.id
          }
        ]
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        product: true
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

exports.markMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!message) {
      return res.status(404).json({
        message: "Mesaj bulunamadı"
      });
    }

    if (message.receiverId !== req.user.id) {
      return res.status(403).json({
        message: "Bu mesajı okundu yapamazsın"
      });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: Number(id)
      },
      data: {
        isRead: true
      }
    });

    res.json({
      message: "Mesaj okundu olarak işaretlendi",
      data: updatedMessage
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};