// models/donations.js
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorUsername: { type: String, required: true },
  donorName: { type: String, required: true },
  foodType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);
