import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { initDb, db } from './db.js';
import { seedAdmin } from './seed.js';
import authRoutes from './routes/auth.js';
import postsRoutes from './routes/posts.js';
import newsRoutes from './routes/news.js';
import galleryRoutes from './routes/gallery.js';
import contactRoutes from './routes/contact.js';
import adminMessagesRoutes from './routes/adminMessages.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..', '..');
dotenv.config({ path: path.join(rootDir, '.env') });
const galleryUpload = path.join(rootDir, 'uploads', 'gallery');

if (!fs.existsSync(galleryUpload)) {
  fs.mkdirSync(galleryUpload, { recursive: true });
}

initDb();
seedAdmin();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));

app.use('/uploads/gallery', express.static(galleryUpload));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, db: Boolean(db) });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin/messages', adminMessagesRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`);
});
