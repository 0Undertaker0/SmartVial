const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

router.use(authMiddleware);

// List incidents
router.get('/', async (req, res) => {
  const { limit=50, offset=0 } = req.query;
  try {
    const q = await db.query('SELECT id, incident_code, type, severity, occurred_at, latitude, longitude, status FROM incidents ORDER BY occurred_at DESC LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)]);
    res.json({ data: q.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Create incident
router.post('/', async (req, res) => {
  const { incident_code, type, severity, occurred_at, description, latitude, longitude, address } = req.body;
  try {
    const insert = await db.query('INSERT INTO incidents (incident_code, reported_by, type, severity, occurred_at, description, latitude, longitude, address, status, created_at) VALUES (?,?,?,?,?,?,?,?,?, now())', [incident_code, req.user.userId, type, severity, occurred_at, description, latitude, longitude, address, 'submitted']);
    // insert.rows may contain insertId
    const createdId = insert.rows && insert.rows.insertId ? insert.rows.insertId : null;
    if (createdId) {
      const q = await db.query('SELECT * FROM incidents WHERE id = ?', [createdId]);
      return res.status(201).json({ data: q.rows[0] });
    }
    res.status(201).json({ data: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

// Get incident by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const q = await db.query('SELECT * FROM incidents WHERE id = ?', [id]);
    if (!q.rows || q.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ data: q.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
});

module.exports = router;
