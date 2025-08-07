// server/controllers/userController.js

const db = require('../config/db'); // Make sure db.js exists and exports MySQL connection

exports.getAllUsers = async (req, res) => {
  try {
    const query = 'SELECT * FROM users'; // Adjust table name if needed
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error while fetching users' });
      }
      res.json(results);
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ message: 'Unexpected server error' });
  }
};
