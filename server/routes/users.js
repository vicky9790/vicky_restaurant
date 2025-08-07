const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/all', (req, res) => {
  const query = 'SELECT id, name, email, password, created_at FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Server error while fetching users' });
    }

    res.json(results);
  });
});

module.exports = router;
