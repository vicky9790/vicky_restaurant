// server/config/db.js
const mysql = require('mysql2/promise'); // Promise-based API for async/await
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

// Create a connection pool so multiple queries can run simultaneously
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Railway assigns a custom port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,   // Adjust based on your needs
  queueLimit: 0
});

// Optional: test connection immediately
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release(); // Release back to pool
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
  }
})();

module.exports = db;
