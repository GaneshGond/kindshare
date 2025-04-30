const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: String,
  username: String,
  password: String,
  location: String,
  profilePhoto: String,
});

module.exports = mongoose.model("User", userSchema);
