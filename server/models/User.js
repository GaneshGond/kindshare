// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   role: String,
// //   username: String,
// //   password: String,
// //   location: String,
// //   profilePhoto: String,
// // });

// // module.exports = mongoose.model("User", userSchema);


// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema({
// //   role: { type: String, enum: ["donor", "volunteer"], required: true },
// //   username: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   location: { type: String, required: true },
// //   profilePhoto: { type: String }, // store filename or URL
// // }, { timestamps: true });

// // module.exports = mongoose.model("User", userSchema);



// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   role: { type: String, enum: ["donor", "volunteer"], required: true },
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   location: { type: String, required: true },
//   fullName: { type: String }, // Adding fullName field back but making it optional
//   profilePhoto: { type: String }, // store filename or URL
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["donor", "volunteer"], required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  fullName: { type: String }, // Optional full name
  phoneNumber: { type: String, required: true }, // Added phone number field as required
  profilePhoto: { type: String }, // store filename or URL
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);