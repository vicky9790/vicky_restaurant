const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9790665121',
  database: 'vicky_restuarant'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = db;
