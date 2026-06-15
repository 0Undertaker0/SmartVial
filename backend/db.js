require('dotenv').config();

// MySQL (XAMPP) only implementation
const mysql = require('mysql2/promise');

// DATABASE_URL can be: mysql://user:pass@host:3306/dbname
const url = process.env.DATABASE_URL;
let config = {};
if (url && url.startsWith('mysql')) {
  const u = new URL(url);
  config = {
    host: u.hostname,
    port: u.port || 3306,
    user: u.username,
    password: u.password,
    database: u.pathname.replace('/', '')
  };
} else {
  config = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'smartvial'
  };
}

const pool = mysql.createPool(Object.assign({ waitForConnections: true, connectionLimit: 10, queueLimit: 0 }, config));

module.exports = {
  query: async (text, params) => {
    const [rows] = await pool.execute(text, params);
    return { rows };
  },
  pool
};
