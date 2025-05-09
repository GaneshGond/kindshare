// // routes/donationRoutes.js
// const express = require("express");
// const router = express.Router();
// const Donation = require("../models/donations");

// // Submit a new donation (from DonorDashboard)
// router.post("/api/donations", async (req, res) => {
//   try {
//     // Make sure donorName is always present, fallback to username if needed
//     if (!req.body.donorName) {
//       req.body.donorName = req.body.donorUsername;
//     }
    
//     const newDonation = new Donation(req.body);
//     await newDonation.save();
//     res.status(201).json({ message: "Donation submitted successfully" });
//   } catch (error) {
//     console.error("Donation save error:", error);
//     res.status(500).json({ error: "Failed to submit donation" });
//   }
// });

// // Get donations filtered by volunteer's location and status
// router.get("/api/donations", async (req, res) => {
//   const { location, status, acceptedBy } = req.query;
//   const query = {};
  
//   if (location) query.location = location;
//   if (status) query.status = status;
//   if (acceptedBy) query.acceptedBy = acceptedBy;

//   try {
//     const donations = await Donation.find(query).sort({ createdAt: -1 });
//     res.json(donations);
//   } catch (error) {
//     console.error("Donation fetch error:", error);
//     res.status(500).json({ error: "Failed to fetch donations" });
//   }
// });

// // Get donations by specific user
// router.get("/api/donations/user/:username", async (req, res) => {
//   try {
//     const { username } = req.params;
//     const donations = await Donation.find({ donorUsername: username })
//       .sort({ createdAt: -1 }) // Sort by newest first
//       .lean();
//     res.json(donations);
//   } catch (error) {
//     console.error("Error fetching user donations:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Accept a donation
// router.put("/api/donations/:id/accept", async (req, res) => {
//   try {
//     const { acceptedBy, acceptedByName, status } = req.body;
    
//     // Find the donation
//     const donation = await Donation.findById(req.params.id);
    
//     if (!donation) {
//       return res.status(404).json({ message: "Donation not found" });
//     }
    
//     // Check if donation is already accepted
//     if (donation.status === "accepted") {
//       return res.status(400).json({ 
//         message: "This donation has already been accepted by another volunteer" 
//       });
//     }
    
//     // Update the donation
//     donation.status = status;
//     donation.acceptedBy = acceptedBy;
//     donation.acceptedByName = acceptedByName;
    
//     await donation.save();
    
//     res.json(donation);
//   } catch (error) {
//     console.error("Donation acceptance error:", error);
//     res.status(500).json({ message: "Failed to accept donation" });
//   }
// });

// module.exports = router;


// routes/donationRoutes.js
const express = require("express");
const router = express.Router();
const Donation = require("../models/donations");
const User = require("../models/User"); // Import User model to get phone numbers

// Submit a new donation (from DonorDashboard)
router.post("/api/donations", async (req, res) => {
  try {
    // Make sure donorName is always present, fallback to username if needed
    if (!req.body.donorName) {
      req.body.donorName = req.body.donorUsername;
    }
    
    // Get donor's phone number
    const donor = await User.findOne({ username: req.body.donorUsername });
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }
    
    const newDonation = new Donation({
      ...req.body,
      donorPhone: donor.phoneNumber // Add donor's phone number
    });
    
    await newDonation.save();
    res.status(201).json({ message: "Donation submitted successfully" });
  } catch (error) {
    console.error("Donation save error:", error);
    res.status(500).json({ error: "Failed to submit donation" });
  }
});

// Get donations filtered by volunteer's location and status
router.get("/api/donations", async (req, res) => {
  const { location, status, acceptedBy } = req.query;
  const query = {};
  
  if (location) query.location = location;
  if (status) query.status = status;
  if (acceptedBy) query.acceptedBy = acceptedBy;

  try {
    const donations = await Donation.find(query).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error("Donation fetch error:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

// Get donations by specific user
router.get("/api/donations/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const donations = await Donation.find({ donorUsername: username })
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();
    res.json(donations);
  } catch (error) {
    console.error("Error fetching user donations:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept a donation
router.put("/api/donations/:id/accept", async (req, res) => {
  try {
    const { acceptedBy, acceptedByName } = req.body;
    
    // Find the donation
    const donation = await Donation.findById(req.params.id);
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    
    // Check if donation is already accepted
    if (donation.status === "accepted") {
      return res.status(400).json({ 
        message: "This donation has already been accepted by another volunteer" 
      });
    }
    
    // Get volunteer's phone number
    const volunteer = await User.findOne({ username: acceptedBy });
    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer not found" });
    }
    
    // Update the donation
    donation.status = "accepted";
    donation.acceptedBy = acceptedBy;
    donation.acceptedByName = acceptedByName;
    donation.acceptedByPhone = volunteer.phoneNumber; // Add volunteer's phone number
    
    await donation.save();
    
    res.json(donation);
  } catch (error) {
    console.error("Donation acceptance error:", error);
    res.status(500).json({ message: "Failed to accept donation" });
  }
});

module.exports = router;