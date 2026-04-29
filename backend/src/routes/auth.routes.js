const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const register = authController.register;
const login = authController.login;
const me = authController.me;
const protect = authMiddleware.protect;

router.post("/register", register);
router.post("/login", login);

router.get("/me", protect, me);

module.exports = router;