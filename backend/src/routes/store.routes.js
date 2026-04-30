const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller");
const { protect } = require("../middlewares/auth.middleware");

const notImplemented = (req, res) => {
  return res.status(501).json({
    message: "Bu mağaza işlemi henüz aktif değil"
  });
};

const handler = (fn) => {
  return typeof fn === "function" ? fn : notImplemented;
};

/*
  ÖNEMLİ:
  /my route'u her zaman /:id route'undan önce olmalı.
  Yoksa Express "my" kelimesini id gibi algılar.
*/

// Satıcının kendi mağazaları
router.get("/my", protect, handler(storeController.getMyStores));

// Mağaza oluştur
router.post("/", protect, handler(storeController.createStore));

// Tüm mağazalar
router.get("/", handler(storeController.getStores));

// Tek mağaza detayı
router.get("/:id", handler(storeController.getStoreById));

// Mağaza güncelle
router.put("/:id", protect, handler(storeController.updateStore));

// Mağaza sil / kapat
router.delete("/:id", protect, handler(storeController.deleteStore));

module.exports = router;