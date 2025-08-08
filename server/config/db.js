const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'mysql.railway.internal',
  user: 'root',
  password: 'CCKAfWZgZSlCOYtZTxxBGmlWPFEqAxSb',
  database: 'railway'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = db;
