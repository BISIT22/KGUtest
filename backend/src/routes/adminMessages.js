import { Router } from 'express';
import { db } from '../db.js';
import { authRequired, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', authRequired, adminOnly, (req, res) => {
  const rows = db
    .prepare('SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 200')
    .all();
  res.json(rows);
});

export default router;
