// routes/donationRoutes.js
const express = require("express");
const router = express.Router();
const Donation = require("../models/donations");

// Submit a new donation (from DonorDashboard)
router.post("/api/donations", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: "Donation submitted successfully" });
  } catch (error) {
    console.error("Donation save error:", error);
    res.status(500).json({ error: "Failed to submit donation" });
  }
});

// Get donations filtered by volunteer's location
router.get("/api/donations", async (req, res) => {
  const location = req.query.location;

  try {
    const donations = await Donation.find(location ? { location } : {});
    res.json(donations);
  } catch (error) {
    console.error("Donation fetch error:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

module.exports = router;
