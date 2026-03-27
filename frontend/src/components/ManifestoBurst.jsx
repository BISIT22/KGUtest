import { motion } from 'framer-motion';

const line1 = 'Ты не просто выбираешь вуз —';
const line2 = 'ты задаёшь вектор будущего.';

function BurstLine({ text, delayBase, className }) {
  const chars = [...text];
  return (
    <span className={`inline-block overflow-visible ${className || ''}`}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${text}-${i}`}
          className="inline-block"
          initial={{
            opacity: 0,
            x: i === 0 ? 0 : (i % 2 === 0 ? -1 : 1) * 80,
            y: (i % 3) * 12,
            rotate: (i % 5) * 4 - 8,
            scale: 0.2,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: delayBase + i * 0.025,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function ManifestoBurst() {
  return (
    <div className="max-w-[min(100vw-2rem,52rem)]">
      <p className="font-display text-3xl font-extrabold leading-tight text-violet-deep sm:text-4xl md:text-5xl lg:text-6xl">
        <BurstLine text={line1} delayBase={0} />
        <br />
        <span className="mt-2 inline-block bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
          <BurstLine text={line2} delayBase={0.35} />
        </span>
      </p>
      <motion.p
        className="mt-8 max-w-xl font-sans text-lg text-zinc-600 md:text-xl"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        Институт информационных технологий и инженерии — место, где инженерная дисциплина встречается с
        цифровым творчеством. Здесь учат строить системы, а не зубрить шаблоны.
      </motion.p>
    </div>
  );
}
