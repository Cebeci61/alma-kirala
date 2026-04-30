const express = require("express");
const router = express.Router();

const storeController = require("../controllers/store.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/my", protect, storeController.getMyStores);

router.post("/", protect, storeController.createStore);
router.get("/", storeController.getStores);

router.get("/:id", storeController.getStoreById);
router.put("/:id", protect, storeController.updateStore);
router.delete("/:id", protect, storeController.deleteStore);

module.exports = router;