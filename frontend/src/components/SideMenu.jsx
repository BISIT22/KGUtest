import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Главная' },
  { to: '/news', label: 'Новости' },
  { to: '/posts', label: 'Материалы' },
  { to: '/gallery', label: 'Галерея' },
  { to: '/contact', label: 'Контакты' },
  { to: '/admin', label: 'Админ' },
];

const item = {
  hidden: { x: 48, opacity: 0 },
  show: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.04 * i, type: 'spring', stiffness: 300, damping: 28 },
  }),
};

export function SideMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть меню"
            className="fixed inset-0 z-40 bg-zinc-900/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(100vw,22rem)] flex-col border-l border-violet-200/80 bg-white/95 shadow-2xl shadow-violet-500/10 backdrop-blur-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-violet-100 px-6 py-5">
              <span className="font-display text-sm font-bold uppercase tracking-widest text-violet-700">
                Навигация
              </span>
              <button
                type="button"
                onClick={onClose}
                className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition-colors hover:border-neon-lime hover:text-violet-700"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-gradient-to-br from-violet-100 to-emerald-100 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
                <span className="relative text-xl leading-none">×</span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {links.map((l, i) => (
                <motion.div key={l.to} custom={i} variants={item} initial="hidden" animate="show">
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      [
                        'block rounded-2xl px-4 py-3 font-display text-lg transition-all',
                        isActive
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25'
                          : 'text-zinc-700 hover:bg-violet-50 hover:text-violet-800',
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="border-t border-violet-100 px-6 py-4 text-xs text-zinc-500">
              ИТИ · Калужский государственный университет
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
