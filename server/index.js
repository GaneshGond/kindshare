// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/kindshare", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Multer config for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// // User model
// const User = require("./models/User");

// // Register route
// app.post("/api/register", upload.single("profilePhoto"), async (req, res) => {
//   const { role, username, password, location } = req.body;
//   const profilePhoto = req.file?.filename;

//   try {
//     const newUser = new User({
//       role,
//       username,
//       password,
//       location,
//       profilePhoto,
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Failed to register user" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads")); // serve uploaded images

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const donationRoutes = require("./routes/donationRoutes");
app.use(donationRoutes);
app.use("/api/donations", donationRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




