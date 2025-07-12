const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require("../controllers/postController");

router
  .route("/")
  .post(authMiddleware, createPost)
  .get(authMiddleware, getPosts);

router
  .route("/:id")
  .get(authMiddleware, getPostById)
  .delete(authMiddleware, deletePost);

router.put("/like/:id", authMiddleware, likePost);
router.put("/unlike/:id", authMiddleware, unlikePost);
router.post("/comment/:id", authMiddleware, addComment);
router.delete("/comment/:id/:comment_id", authMiddleware, deleteComment);

module.exports = router;
