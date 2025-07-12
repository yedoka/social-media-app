const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/check", authMiddleware, checkAuth);

module.exports = router;
