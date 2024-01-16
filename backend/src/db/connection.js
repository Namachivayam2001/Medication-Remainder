const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Newton@2001',
  database: 'madicationremainder',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0
});

module.exports = pool.promise(); // Use promise() to enable async/await syntax
