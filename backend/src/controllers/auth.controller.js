const prisma = require("../utils/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
if (!name || !email || !password) {
  return res.status(400).json({
    message: "İsim, email ve şifre zorunlu"
  });
}

if (password.length < 6) {
  return res.status(400).json({
    message: "Şifre en az 6 karakter olmalı"
  });
}
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Bu email zaten kayıtlı"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    res.json({
      message: "Kayıt başarılı",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
if (!email || !password) {
  return res.status(400).json({
    message: "Email ve şifre zorunlu"
  });
}
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "Email veya şifre hatalı"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Email veya şifre hatalı"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    res.json({
      message: "Giriş başarılı",
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Sunucu hatası"
    });
  }
};
exports.me = async (req, res) => {
  res.json({
    user: req.user
  });
};