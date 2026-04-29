const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById
} = require("../controllers/product.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;