const express = require("express");
const router = express.Router();
const {
  getUsersForChat,
  getMessages,
  sendMessage,
} = require("../controllers/messageController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/users", authMiddleware, getUsersForChat);
router.get("/:id", authMiddleware, getMessages);

router.post("/send/:id", authMiddleware, sendMessage);

module.exports = router;
