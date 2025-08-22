const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const contactRoute = require("./routes/contact");
const User = require("./models/User");
require("dotenv").config();

//##############################################

const app = express();
app.use(cors());
app.use(express.json());

async function ensureAdminUser() {
  const adminExists = await User.findOne({ role: "admin" });
  if (!adminExists) {
    const admin = new User({
      username: "admin",
      email: "abdulhadiakanni@gmail.com",
      password: "Abassakanni@1",
      role: "admin",
    });
    await admin.save();
    console.log("Default admin user created.");
  }
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");
    await ensureAdminUser();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("New Contact Form Submission:", { name, email, message });
  // Here, you'd typically send an email or save to DB
  res.status(200).json({ success: true });
});

//#############################################

app.use("/api/contact", contactRoute);
app.use("/api/projects", require("./routes/projects"));
app.use("/api/certificates", require("./routes/certificates"));
app.use("/api/publications", require("./routes/publications"));
app.use("/api/blog", require("./routes/blog"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/about", require("./routes/about"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
