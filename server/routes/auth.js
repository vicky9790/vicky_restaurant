// server/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Signup route
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, email, password], (err) => {
      if (err) return res.status(500).json({ message: "Signup failed" });

      res.status(201).json({ message: "Signup successful" });
    });
  });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "Email not found" });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

router.get("/allusers", async (req, res) => {
  try {
    const [users] = await db.query("SELECT id, username, email FROM users");
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
