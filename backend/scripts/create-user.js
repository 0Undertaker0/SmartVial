require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

async function create() {
  const username = process.argv[2];
  const password = process.argv[3];
  const role = process.argv[4] || 3; // agent
  if (!username || !password){ console.error('Usage: node create-user.js USERNAME PASSWORD [ROLE_ID]'); process.exit(1); }
  const hash = await bcrypt.hash(password, 10);
  // MySQL compatible insert (no RETURNING)
  const res = await db.query('INSERT INTO users (username, password_hash, role_id, created_at) VALUES (?,?,?, now())', [username, hash, role]);
  // mysql2 returns an OkPacket with insertId, postgres would return rows[0].id
  const createdId = (res.rows && res.rows.insertId) ? res.rows.insertId : (res.rows && res.rows[0] && res.rows[0].id);
  console.log('Created user id', createdId);
  process.exit(0);
}
create().catch(e=>{ console.error(e); process.exit(1); });
