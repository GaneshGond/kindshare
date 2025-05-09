// // models/donations.js
// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//   donorUsername: { type: String, required: true },
//   donorName: { type: String, required: true },
//   foodType: { type: String, required: true },
//   quantity: { type: String, required: true },
//   location: { type: String, required: true },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'completed'],
//     default: 'pending'
//   },
//   acceptedBy: { type: String, default: null },
//   acceptedByName: { type: String, default: null },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Donation", donationSchema);



// models/donations.js
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorUsername: { type: String, required: true },
  donorName: { type: String, required: true },
  donorPhone: { type: String, required: true }, // Added donor's phone number
  foodType: { type: String, required: true },
  quantity: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending'
  },
  acceptedBy: { type: String, default: null },
  acceptedByName: { type: String, default: null },
  acceptedByPhone: { type: String, default: null }, // Added volunteer's phone number
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donation", donationSchema);