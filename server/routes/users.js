// server/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your mysql2/promise pool

// GET /api/users/all
router.get('/all', async (req, res) => {
  try {
    // Avoid returning password hashes unless you intentionally need them
    const query = 'SELECT id, name, email, created_at FROM users';
    const [results] = await db.query(query); // promise-based query

    res.json(results);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
});

module.exports = router;
