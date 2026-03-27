import { Router } from 'express';
import { db, rowId } from '../db.js';
import { authRequired, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Не найдено' });
  res.json(row);
});

router.post('/', authRequired, adminOnly, (req, res) => {
  const { title, body, image_url } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'Нужны title и body' });
  }
  const info = db
    .prepare(
      'INSERT INTO news (title, body, image_url) VALUES (?, ?, ?)'
    )
    .run(title, body, image_url || null);
  const row = db.prepare('SELECT * FROM news WHERE id = ?').get(rowId(info));
  res.status(201).json(row);
});

router.put('/:id', authRequired, adminOnly, (req, res) => {
  const { title, body, image_url } = req.body || {};
  const id = req.params.id;
  const cur = db.prepare('SELECT * FROM news WHERE id = ?').get(id);
  if (!cur) return res.status(404).json({ error: 'Не найдено' });
  db.prepare(
    `UPDATE news SET title = ?, body = ?, image_url = ?, updated_at = datetime('now') WHERE id = ?`
  ).run(
    title ?? cur.title,
    body ?? cur.body,
    image_url !== undefined ? image_url : cur.image_url,
    id
  );
  res.json(db.prepare('SELECT * FROM news WHERE id = ?').get(id));
});

router.delete('/:id', authRequired, adminOnly, (req, res) => {
  const r = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Не найдено' });
  res.json({ ok: true });
});

export default router;
