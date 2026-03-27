import { motion, AnimatePresence } from 'framer-motion';

export function LoaderScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-end bg-white pr-8 md:pr-24"
          initial={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-end gap-2">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-neon-lime"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 120 - i * 18, opacity: 1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.45,
                  ease: 'easeOut',
                }}
              />
            ))}
            <motion.span
              className="font-display text-xs uppercase tracking-[0.4em] text-violet-700"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              загрузка
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
