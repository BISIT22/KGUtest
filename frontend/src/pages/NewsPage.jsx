import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api.js';
import { Reveal } from '../components/Reveal.jsx';

export function NewsPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiFetch('/api/news')
      .then(setItems)
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <div className="min-h-screen px-4 pb-14 pt-20 md:px-12">
      <Reveal variant="fromTop">
        <h1 className="font-display text-4xl font-black text-zinc-900 md:text-6xl">Новости</h1>
      </Reveal>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Актуальные события института и университета.
      </p>
      {err && <p className="mt-6 text-red-600">{err}</p>}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((n, i) => (
          <motion.article
            key={n.id}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-violet-100 bg-white/90 p-8 shadow-lg shadow-violet-500/5"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-violet-100 to-emerald-100 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <h2 className="font-display text-2xl font-bold text-violet-900">{n.title}</h2>
            {n.image_url && (
              <img
                src={n.image_url}
                alt=""
                className="mt-4 max-h-64 w-full rounded-2xl object-cover"
                loading="lazy"
              />
            )}
            <p className="mt-4 whitespace-pre-wrap text-zinc-600">{n.body}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-zinc-400">{n.created_at}</p>
          </motion.article>
        ))}
      </div>
      {items.length === 0 && !err && (
        <p className="mt-12 text-zinc-500">Пока нет новостей — загляните позже.</p>
      )}
    </div>
  );
}
