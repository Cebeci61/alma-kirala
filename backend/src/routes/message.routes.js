const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMyMessages,
  getConversation,
  markMessageAsRead
} = require("../controllers/message.controller");

const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, sendMessage);
router.get("/", protect, getMyMessages);
router.get("/:userId", protect, getConversation);
router.put("/:id/read", protect, markMessageAsRead);

module.exports = router;