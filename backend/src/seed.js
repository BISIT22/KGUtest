import bcrypt from 'bcryptjs';
import { db } from './db.js';

export function seedAdmin() {
  const count = db.prepare('SELECT COUNT(*) as c FROM users WHERE role = ?').get('admin');
  if (count.c > 0) return;

  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const hash = bcrypt.hashSync(password, 10);
  db.prepare(
    'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)'
  ).run(username, hash, 'admin');
  console.log(`[seed] Создан администратор: ${username} (смените пароль в .env)`);
}
