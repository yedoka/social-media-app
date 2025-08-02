const User = require("../models/User");
const Post = require("../models/Post");

// @desc    Get user profile by ID
// @route   GET /api/users/profile/:id
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name })
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "name avatar" },
          {
            path: "comments.user",
            select: "name avatar",
          },
        ],
      })
      .populate("followers")
      .populate("following")
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get current user's profile
// @route   GET /api/users/me
exports.getCurrentUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("followers")
      .populate("following")
      .populate({
        path: "posts",
        populate: [
          {
            path: "user",
            select: "name avatar",
          },
          {
            path: "comments.user",
            select: "name avatar",
          },
          {
            path: "likes",
            select: "name avatar",
          },
        ],
        options: { sort: { createdAt: -1 } },
      })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error in getCurrentUserProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    const updatedUser = await User.findById(req.user.id)
      .populate({
        path: "posts",
        populate: [
          { path: "user", select: "name avatar" },
          {
            path: "comments.user",
            select: "name avatar",
          },
        ],
      })
      .select("-password");
    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updateUserProfile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Follow a user
// @route   PUT /api/users/follow/:id
exports.followUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    if (currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    currentUser.following.push(req.params.id);
    userToFollow.followers.push(req.user.id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: "User followed successfully" });
  } catch (error) {
    console.error("Error in followUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Unfollow a user
// @route   PUT /api/users/unfollow/:id
exports.unfollowUser = async (req, res) => {
  try {
    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.params.id === req.user.id) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    if (!currentUser.following.includes(req.params.id)) {
      return res.status(400).json({ message: "Not following this user" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== req.params.id
    );
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user.id
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.error("Error in unfollowUser:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Search users
// @route   GET /api/users/search?q=searchTerm
exports.searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(10);

    res.json(users);
  } catch (error) {
    console.error("Error in searchUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    Get suggested users (users not followed by current user)
// @route   GET /api/users/suggestions
exports.getSuggestedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const suggestedUsers = await User.find({
      _id: {
        $nin: [...currentUser.following, req.user.id],
      },
    })
      .select("-password")
      .limit(5);

    res.json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedUsers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
