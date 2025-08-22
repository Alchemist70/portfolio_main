const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const auth = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");
const { blogValidation } = require("../middleware/validator");
const {
  getPagination,
  getPagingData,
  createSearchQuery,
} = require("../utils/queryHelpers");

// Get all blog posts with pagination and search
router.get("/", apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10, search, featured } = req.query;
    const { limit, skip } = getPagination(page, size);
    const searchQuery = createSearchQuery(search, [
      "title",
      "excerpt",
      "content",
      "tags",
    ]);
    if (featured !== undefined) {
      searchQuery.featured = featured === "true";
    }
    const [posts, total] = await Promise.all([
      Blog.find(searchQuery).sort({ createdAt: -1 }).limit(limit).skip(skip),
      Blog.countDocuments(searchQuery),
    ]);
    res.json(getPagingData({ count: total, rows: posts }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get featured blog posts
router.get("/featured", apiLimiter, async (req, res) => {
  try {
    const posts = await Blog.find({ featured: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get blog posts by category
router.get("/category/:category", apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const { limit, skip } = getPagination(page, size);

    const [posts, total] = await Promise.all([
      Blog.find({
        category: { $regex: req.params.category, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip),
      Blog.countDocuments({
        category: { $regex: req.params.category, $options: "i" },
      }),
    ]);

    res.json(getPagingData({ count: total, rows: posts }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get blog posts by tag
router.get("/tag/:tag", apiLimiter, async (req, res) => {
  try {
    const { page = 1, size = 10 } = req.query;
    const { limit, skip } = getPagination(page, size);

    const [posts, total] = await Promise.all([
      Blog.find({
        tags: { $regex: req.params.tag, $options: "i" },
      })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip),
      Blog.countDocuments({
        tags: { $regex: req.params.tag, $options: "i" },
      }),
    ]);

    res.json(getPagingData({ count: total, rows: posts }, page, limit));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get blog post by slug (must come before /:id)
router.get("/:slug", apiLimiter, async (req, res, next) => {
  // If it's a valid ObjectId, skip to the next route
  if (/^[0-9a-fA-F]{24}$/.test(req.params.slug)) return next();
  try {
    const post = await Blog.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single blog post
router.get("/:id", apiLimiter, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create blog post (protected route)
router.post("/", [auth, apiLimiter, blogValidation], async (req, res) => {
  const post = new Blog({
    title: req.body.title,
    slug: req.body.slug,
    content: req.body.content,
    excerpt: req.body.excerpt,
    imageUrl: req.body.imageUrl,
    date: req.body.date,
    readTime: req.body.readTime,
    category: req.body.category,
    link: req.body.link,
    tags: req.body.tags || [],
    featured: req.body.featured || false,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update blog post (protected route)
router.patch("/:id", [auth, apiLimiter, blogValidation], async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    Object.keys(req.body).forEach((key) => {
      post[key] = req.body[key];
    });
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete blog post (protected route)
router.delete("/:id", [auth, apiLimiter], async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({ message: "Blog post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Like/unlike a blog post
router.post("/:id/like", apiLimiter, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    const userId = req.body.userId || req.ip;
    const index = post.likedBy.indexOf(userId);
    if (index === -1) {
      post.likedBy.push(userId);
      post.likes += 1;
    } else {
      post.likedBy.splice(index, 1);
      post.likes -= 1;
    }
    await post.save();
    res.json({ likes: post.likes, liked: index === -1 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a comment to a blog post
router.post("/:id/comment", apiLimiter, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    const { name, text } = req.body;
    if (!name || !text)
      return res
        .status(400)
        .json({ message: "Name and comment text are required" });
    post.comments.push({ name, text });
    await post.save();
    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments for a blog post
router.get("/:id/comments", apiLimiter, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a comment from a blog post (admin only)
router.delete("/:id/comment/:commentId", auth, apiLimiter, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === req.params.commentId
    );
    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });
    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Record a unique reader for a blog post
router.post("/:id/read", apiLimiter, async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    const userId = req.body.userId || req.ip;
    if (!post.readBy.includes(userId)) {
      post.readBy.push(userId);
      await post.save();
    }
    res.json({ readBy: post.readBy.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
