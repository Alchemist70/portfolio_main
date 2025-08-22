const express = require("express");
const router = express.Router();
const About = require("../models/About");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = require("../middleware/upload");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads/about");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uploadMulter = multer({ storage });

// GET about info (public)
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne().sort({ updatedAt: -1 });
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST/PUT about info (admin only)
router.post("/", auth, async (req, res) => {
  try {
    let about = await About.findOne();
    if (about) {
      Object.assign(about, req.body);
      await about.save();
    } else {
      about = new About(req.body);
      await about.save();
    }
    res.json(about);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Image upload (admin only)
router.post("/upload", auth, uploadMulter.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const url = `/uploads/about/${req.file.filename}`;
  res.json({ url });
});

// Upload admin profile photo
router.post("/photo", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // Construct the URL for the uploaded file
  const url = `/uploads/about/${req.file.filename}`;
  res.json({ url });
});

module.exports = router;
