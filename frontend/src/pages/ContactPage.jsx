import { useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api.js';
import { Reveal } from '../components/Reveal.jsx';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const r = await apiFetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name, email, body }),
      });
      setStatus(
        r.mailed
          ? 'Сообщение отправлено. Проверьте почту института — мы ответим при возможности.'
          : 'Сообщение сохранено. Для отправки на почту настройте SMTP в .env на сервере.'
      );
      setName('');
      setEmail('');
      setBody('');
    } catch (err) {
      setStatus(err.message || 'Ошибка отправки');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen px-4 pb-14 pt-20 md:px-12">
      <div className="grid min-h-[62vh] gap-6 lg:grid-cols-2 lg:items-start">
        <Reveal variant="fromLeft">
          <h1 className="font-display text-4xl font-black text-zinc-900 md:text-6xl">Связь</h1>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            Форма обращения к институту. Сообщения направляются на{' '}
            <a href="mailto:fti@tksu.ru" className="text-violet-700 underline">
              fti@tksu.ru
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-zinc-500">
            Вопросы по поступлению, программам и сотрудничеству — кратко опишите суть в письме.
          </p>
        </Reveal>
        <motion.form
          onSubmit={onSubmit}
          className="relative rounded-3xl border border-violet-200 bg-white/95 p-8 shadow-2xl shadow-violet-500/10 md:p-10"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <div className="absolute -left-1 top-8 h-24 w-1 rounded-full bg-gradient-to-b from-violet-600 to-neon-lime" />
          <label className="block text-sm font-semibold text-zinc-700">
            Имя
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>
          <label className="mt-6 block text-sm font-semibold text-zinc-700">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>
          <label className="mt-6 block text-sm font-semibold text-zinc-700">
            Сообщение
            <textarea
              required
              rows={5}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </label>
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-emerald-500 py-4 font-display text-sm font-bold uppercase tracking-widest text-white disabled:opacity-60"
          >
            {loading ? 'Отправка…' : 'Отправить'}
          </motion.button>
          {status && <p className="mt-4 text-sm text-zinc-600">{status}</p>}
        </motion.form>
      </div>
    </div>
  );
}
