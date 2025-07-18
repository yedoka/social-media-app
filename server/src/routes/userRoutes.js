const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  getCurrentUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  searchUsers,
  getSuggestedUsers,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/profile/:name", getUserProfile);
router.get("/search", searchUsers);

router.get("/me", authMiddleware, getCurrentUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser);
router.get("/suggestions", authMiddleware, getSuggestedUsers);

module.exports = router;
