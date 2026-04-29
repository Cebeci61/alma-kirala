const express = require("express");
const router = express.Router();

const {
  getMyNotifications,
  markNotificationAsRead
} = require("../controllers/notification.controller");

const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, getMyNotifications);
router.put("/:id/read", protect, markNotificationAsRead);

module.exports = router;