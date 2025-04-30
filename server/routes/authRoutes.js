// const express = require("express");
// const multer = require("multer");
// const User = require("../models/User");
// const router = express.Router();

// // File upload config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// router.post("/register", upload.single("profilePhoto"), async (req, res) => {
//   const { role, username, password, location } = req.body;
//   const profilePhoto = req.file ? req.file.filename : "";

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) return res.status(400).json({ error: "Username already exists" });

//     const newUser = new User({
//       role,
//       username,
//       password, // Consider hashing with bcrypt
//       location,
//       profilePhoto
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error. Try again later." });
//   }
// });

// router.get("/user/:username", async (req, res) => {
//     try {
//       const user = await User.findOne({ username: req.params.username });
//       if (!user) return res.status(404).json({ error: "User not found" });
  
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ error: "Server error" });
//     }
//   });

//   router.post("/login", async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }
  
//       // If you hash passwords, use bcrypt.compare here
//       if (user.password !== password) {
//         return res.status(401).json({ error: "Invalid username or password" });
//       }
  
//       res.status(200).json({ role: user.role }); // role: 'donor' or 'volunteer'
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   });

// module.exports = router;


// routes/authRoutes.js
const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/register", upload.single("profilePhoto"), async (req, res) => {
  const { role, username, password, location, fullName } = req.body;
  const profilePhoto = req.file ? req.file.filename : "";

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({
      role,
      username,
      password,
      location,
      fullName,
      profilePhoto: `http://localhost:5000/uploads/${profilePhoto}`,
    });

    await newUser.save();
    res.status(201).json(newUser);  // Return full user object
  } catch (err) {
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

router.get("/user/:username", async (req, res) => {
        try {
          const user = await User.findOne({ username: req.params.username });
          if (!user) return res.status(404).json({ error: "User not found" });
      
          res.json(user);
        } catch (err) {
          res.status(500).json({ error: "Server error" });
        }
      });
    

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json(user);  // Send full user object
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
