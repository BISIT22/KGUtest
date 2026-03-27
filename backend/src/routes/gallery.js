import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { db, rowId } from '../db.js';
import { authRequired, adminOnly } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const galleryDir = path.join(__dirname, '..', '..', '..', 'uploads', 'gallery');

if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, galleryDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const base = path.basename(file.originalname, ext).replace(/[^\w.-]/g, '_').slice(0, 40);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /^image\/(jpeg|png|gif|webp|svg\+xml)$/.test(file.mimetype);
    cb(ok ? null : new Error('Только изображения'), ok);
  },
});

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM gallery_images ORDER BY created_at DESC').all();
  res.json(rows);
});

router.post('/', authRequired, adminOnly, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message || 'Ошибка загрузки' });
    next();
  });
}, (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не получен' });
  }
  const caption = req.body?.caption || null;
  const info = db
    .prepare('INSERT INTO gallery_images (filename, caption) VALUES (?, ?)')
    .run(req.file.filename, caption);
  const row = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(rowId(info));
  res.status(201).json(row);
});

router.put('/:id', authRequired, adminOnly, (req, res) => {
  const { caption } = req.body || {};
  const id = req.params.id;
  const cur = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(id);
  if (!cur) return res.status(404).json({ error: 'Не найдено' });
  db.prepare('UPDATE gallery_images SET caption = ? WHERE id = ?').run(
    caption !== undefined ? caption : cur.caption,
    id
  );
  res.json(db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(id));
});

router.delete('/:id', authRequired, adminOnly, (req, res) => {
  const row = db.prepare('SELECT * FROM gallery_images WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Не найдено' });
  const fp = path.join(galleryDir, row.filename);
  try {
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  } catch {
    /* ignore */
  }
  db.prepare('DELETE FROM gallery_images WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
