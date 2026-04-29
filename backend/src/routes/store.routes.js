const express = require("express");
const router = express.Router();

const {
  createStore,
  getPendingStores,
  approveStore,
  getStores,
  getStoreById
} = require("../controllers/store.controller");

const { protect } = require("../middlewares/auth.middleware");
const { allowRoles } = require("../middlewares/role.middleware");

router.post("/", protect, createStore);

router.get("/", getStores);
router.get("/pending", protect, allowRoles("admin"), getPendingStores);
router.put("/approve/:id", protect, allowRoles("admin"), approveStore);
router.get("/:id", getStoreById);

module.exports = router;