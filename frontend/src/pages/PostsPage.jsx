import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch } from '../api.js';
import { Reveal } from '../components/Reveal.jsx';

export function PostsPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiFetch('/api/posts')
      .then(setItems)
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <div className="min-h-screen px-4 pb-14 pt-20 md:px-12">
      <Reveal variant="fromTop">
        <h1 className="font-display text-4xl font-black text-zinc-900 md:text-6xl">Материалы</h1>
      </Reveal>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">
        Статьи и заметки для абитуриентов: программы, олимпиады, жизнь института.
      </p>
      {err && <p className="mt-6 text-red-600">{err}</p>}
      <div className="mt-10 space-y-4">
        {items.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            className="rounded-3xl border border-zinc-200 bg-gradient-to-r from-white to-violet-50/40 p-8 md:p-10"
          >
            <h2 className="font-display text-2xl font-bold text-zinc-900">{p.title}</h2>
            <p className="mt-4 whitespace-pre-wrap text-zinc-700">{p.body}</p>
            <p className="mt-4 text-xs text-zinc-400">{p.slug}</p>
          </motion.div>
        ))}
      </div>
      {items.length === 0 && !err && (
        <p className="mt-12 text-zinc-500">Материалы появятся после публикации администратором.</p>
      )}
    </div>
  );
}
