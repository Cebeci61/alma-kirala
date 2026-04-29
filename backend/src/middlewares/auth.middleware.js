const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");

const JWT_SECRET = process.env.JWT_SECRET || "123456";

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Yetkisiz erişim"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(401).json({
        message: "Kullanıcı bulunamadı"
      });
    }

    const { password, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Geçersiz token"
    });
  }
};