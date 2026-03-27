import { motion } from 'framer-motion';

const variants = {
  fromLeft: { hidden: { x: -120, opacity: 0 }, show: { x: 0, opacity: 1 } },
  fromRight: { hidden: { x: 120, opacity: 0 }, show: { x: 0, opacity: 1 } },
  fromBottom: { hidden: { y: 100, opacity: 0 }, show: { y: 0, opacity: 1 } },
  fromTop: { hidden: { y: -80, opacity: 0 }, show: { y: 0, opacity: 1 } },
  tilt: {
    hidden: { rotate: -6, y: 40, opacity: 0 },
    show: { rotate: 0, y: 0, opacity: 1 },
  },
};

export function Reveal({ children, variant = 'fromBottom', delay = 0, className = '' }) {
  const v = variants[variant] || variants.fromBottom;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-8%' }}
      variants={v}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
