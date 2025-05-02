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




