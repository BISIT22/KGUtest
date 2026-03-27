import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function TopBar({ onMenuClick }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex items-start justify-between gap-4 px-4 pt-4 md:px-8">
      <Link to="/" className="group relative">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative overflow-hidden rounded-2xl border border-violet-200/80 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-md"
        >
          <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-violet-800">
            ИТИ КГУ
          </span>
          <span className="mt-0.5 block max-w-[14rem] text-[10px] leading-tight text-zinc-500">
            Институт информационных технологий и инженерии
          </span>
          <motion.span
            className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-neon-lime/20 blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </Link>
      <motion.button
        type="button"
        aria-label="Открыть меню"
        onClick={onMenuClick}
        className="relative flex h-14 w-14 flex-col items-center justify-center gap-1.5 rounded-2xl border border-zinc-200 bg-white/90 shadow-md backdrop-blur-md transition-colors hover:border-neon-lime hover:shadow-neon-lime/20"
        whileHover={{ rotate: [0, -2, 2, 0] }}
        transition={{ duration: 0.4 }}
      >
        <span className="h-0.5 w-7 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500" />
        <span className="h-0.5 w-5 self-end rounded-full bg-zinc-800" />
        <span className="h-0.5 w-6 rounded-full bg-gradient-to-r from-emerald-500 to-violet-600" />
      </motion.button>
    </header>
  );
}
