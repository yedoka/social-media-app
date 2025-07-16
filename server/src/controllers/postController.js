const Post = require("../models/Post");
const User = require("../models/User");

// @desc    Create a new post
// @route   POST /api/posts
exports.createPost = async (req, res) => {
  const { text, image } = req.body;

  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new Post({
      user: req.user.id,
      text,
      image,
    });

    const post = await newPost.save();

    user.posts.push(post._id);
    await user.save();

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name avatar")
      .populate("likes", "name avatar")
      .populate("comments.user", "name avatar");

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all posts (from followed users or public)
// @route   GET /api/posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user")
      .populate("comments.user")
      .populate("likes")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "name avatar"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { posts: post._id },
    });

    await Post.findByIdAndDelete(post._id);

    res.json({ message: "Post removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Like a post
// @route   PUT /api/posts/like/:id
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.some((like) => like.toString() === req.user.id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes.unshift(req.user.id);
    await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("user", "name avatar")
      .populate("likes", "name avatar")
      .populate("comments.user", "name avatar");

    res.json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Unlike a post
// @route   PUT /api/posts/unlike/:id
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.some((like) => like.toString() === req.user.id)) {
      return res.status(400).json({ message: "Not liked yet" });
    }

    post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
    await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("user", "name avatar")
      .populate("likes", "name avatar")
      .populate("comments.user", "name avatar");

    res.json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add a comment
// @route   POST /api/posts/comment/:id
exports.addComment = async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: req.user.id,
      text,
    };

    post.comments.unshift(newComment);
    await post.save();

    const populatedPost = await Post.findById(req.params.id).populate(
      "comments.user",
      "name avatar"
    );

    res.json(populatedPost.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a comment
// @route   DELETE /api/posts/comment/:id/:comment_id
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.find(
      (c) => c._id.toString() === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ _id }) => _id.toString() !== req.params.comment_id
    );

    await post.save();

    const populatedPost = await Post.findById(req.params.id).populate(
      "comments.user",
      "name avatar"
    );

    res.json(populatedPost.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
