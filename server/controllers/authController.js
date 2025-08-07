const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// User Registration
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  userModel.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ success: false, msg: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ success: false, msg: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { name, email, password: hashedPassword };

    userModel.createUser(newUser, (err) => {
      if (err) return res.status(500).json({ success: false, msg: "Error creating user" });

      return res.status(201).json({ success: true, msg: "User registered successfully" });
    });
  });
};

// ✅ User Login
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, msg: "Email and password are required" });
  }

  userModel.findUserByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ success: false, msg: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    // ✅ Create token safely
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      msg: "Login successful",
      token, // ✅ Send token to frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};
