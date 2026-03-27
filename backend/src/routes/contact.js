import { Router } from 'express';
import nodemailer from 'nodemailer';
import { db } from '../db.js';

const router = Router();

function getTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
  });
}

router.post('/', async (req, res) => {
  const { name, email, body } = req.body || {};
  if (!name || !email || !body) {
    return res.status(400).json({ error: 'Заполните имя, email и сообщение' });
  }
  db.prepare(
    'INSERT INTO contact_messages (name, email, body) VALUES (?, ?, ?)'
  ).run(String(name).trim(), String(email).trim(), String(body).trim());

  const to = process.env.MAIL_TO || 'fti@tksu.ru';
  const from = process.env.MAIL_FROM || 'noreply@localhost';
  const transport = getTransport();

  let mailed = false;
  if (transport) {
    try {
      await transport.sendMail({
        from,
        to,
        replyTo: email,
        subject: `[ИТИ КГУ — сайт абитуриента] Сообщение от ${name}`,
        text: `От: ${name} <${email}>\n\n${body}`,
      });
      mailed = true;
    } catch (e) {
      console.error('Mail error:', e);
    }
  }

  res.status(201).json({ ok: true, mailed });
});

export default router;
