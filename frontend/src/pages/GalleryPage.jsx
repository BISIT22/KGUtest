import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, galleryImageUrl } from '../api.js';
import { Reveal } from '../components/Reveal.jsx';

export function GalleryPage() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    apiFetch('/api/gallery')
      .then(setItems)
      .catch((e) => setErr(e.message));
  }, []);

  return (
    <div className="min-h-screen px-4 pb-14 pt-20 md:px-12">
      <Reveal variant="fromTop">
        <h1 className="font-display text-4xl font-black text-zinc-900 md:text-6xl">Галерея</h1>
      </Reveal>
      <p className="mt-4 max-w-2xl text-lg text-zinc-600">Кадры с мероприятий, лабораторий и учёбы.</p>
      {err && <p className="mt-6 text-red-600">{err}</p>}
      <div className="mt-8 columns-1 gap-3 sm:columns-2 lg:columns-3">
        {items.map((g, i) => (
          <motion.figure
            key={g.id}
            className="mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={galleryImageUrl(g.filename)}
              alt={g.caption || 'Фото'}
              className="h-auto w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {g.caption && (
              <figcaption className="p-3 text-sm text-zinc-600">{g.caption}</figcaption>
            )}
          </motion.figure>
        ))}
      </div>
      {items.length === 0 && !err && (
        <p className="mt-12 text-zinc-500">Пока нет изображений.</p>
      )}
    </div>
  );
}
