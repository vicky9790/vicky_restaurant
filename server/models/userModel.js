const db = require("../config/db");

// Find user by email
exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Create a new user
exports.createUser = (user, callback) => {
  const sql = "INSERT INTO users SET ?";
  db.query(sql, user, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// (Optional) Find user by ID — useful for JWT middleware
exports.findUserById = (id, callback) => {
  const sql = "SELECT id, name, email FROM users WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results[0]);
  });
};
