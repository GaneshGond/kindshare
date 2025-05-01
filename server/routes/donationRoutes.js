// // routes/donationRoutes.js
// const express = require("express");
// const router = express.Router();
// const Donation = require("../models/donations");

// // Submit a new donation (from DonorDashboard)
// router.post("/api/donations", async (req, res) => {
//   try {
//     const newDonation = new Donation(req.body);
//     await newDonation.save();
//     res.status(201).json({ message: "Donation submitted successfully" });
//   } catch (error) {
//     console.error("Donation save error:", error);
//     res.status(500).json({ error: "Failed to submit donation" });
//   }
// });

// // Get donations filtered by volunteer's location
// router.get("/api/donations", async (req, res) => {
//   const location = req.query.location;

//   try {
//     const donations = await Donation.find(location ? { location } : {});
//     res.json(donations);
//   } catch (error) {
//     console.error("Donation fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch donations" });
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const { location } = req.query;
//     let donations;

//     if (location) {
//       donations = await Donation.find({ location });
//     } else {
//       donations = await Donation.find();
//     }

//     res.json(donations);
//   } catch (err) {
//     console.error("Error fetching donations:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;



// routes/donationRoutes.js
const express = require("express");
const router = express.Router();
const Donation = require("../models/donations");

// Submit a new donation (from DonorDashboard)
router.post("/api/donations", async (req, res) => {
  try {
    // Make sure donorName is always present, fallback to username if needed
    if (!req.body.donorName) {
      req.body.donorName = req.body.donorUsername;
    }
    
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