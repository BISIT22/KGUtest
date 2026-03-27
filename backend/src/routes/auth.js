import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db, rowId } from '../db.js';
import { authRequired, JWT_SECRET } from '../middleware/auth.js';

const router = Router();

router.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Укажите логин и пароль' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль не короче 6 символов' });
  }
  const hash = bcrypt.hashSync(password, 10);
  try {
    const info = db
      .prepare(
        'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)'
      )
      .run(username.trim(), hash, 'user');
    const id = rowId(info);
    const token = jwt.sign(
      { id, username: username.trim(), role: 'user' },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    return res.json({
      token,
      user: { id, username: username.trim(), role: 'user' },
    });
  } catch (e) {
    const msg = String(e?.message || e);
    if (msg.includes('UNIQUE') || e?.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Пользователь уже существует' });
    }
    throw e;
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Укажите логин и пароль' });
  }
  const row = db
    .prepare('SELECT id, username, password_hash, role FROM users WHERE username = ?')
    .get(username.trim());
  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }
  const token = jwt.sign(
    { id: row.id, username: row.username, role: row.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({
    token,
    user: { id: row.id, username: row.username, role: row.role },
  });
});

router.get('/me', authRequired, (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username, role: req.user.role } });
});

export default router;
