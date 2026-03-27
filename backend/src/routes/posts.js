import { Router } from 'express';
import { db, rowId } from '../db.js';
import { authRequired, adminOnly } from '../middleware/auth.js';

const router = Router();

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'post';
}

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Не найдено' });
  res.json(row);
});

router.post('/', authRequired, adminOnly, (req, res) => {
  const { title, body } = req.body || {};
  if (!title || !body) {
    return res.status(400).json({ error: 'Нужны title и body' });
  }
  let slug = slugify(title);
  const exists = db.prepare('SELECT id FROM posts WHERE slug = ?').get(slug);
  if (exists) slug = `${slug}-${Date.now()}`;
  const info = db
    .prepare(
      'INSERT INTO posts (title, body, slug) VALUES (?, ?, ?)'
    )
    .run(title, body, slug);
  const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(rowId(info));
  res.status(201).json(row);
});

router.put('/:id', authRequired, adminOnly, (req, res) => {
  const { title, body } = req.body || {};
  const id = req.params.id;
  const cur = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  if (!cur) return res.status(404).json({ error: 'Не найдено' });
  const t = title ?? cur.title;
  const b = body ?? cur.body;
  db.prepare(
    'UPDATE posts SET title = ?, body = ?, updated_at = datetime(\'now\') WHERE id = ?'
  ).run(t, b, id);
  res.json(db.prepare('SELECT * FROM posts WHERE id = ?').get(id));
});

router.delete('/:id', authRequired, adminOnly, (req, res) => {
  const r = db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  if (r.changes === 0) return res.status(404).json({ error: 'Не найдено' });
  res.json({ ok: true });
});

export default router;
