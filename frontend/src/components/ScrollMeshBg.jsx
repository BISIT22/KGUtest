import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollMeshBg() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [1, 0.85, 0.55]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[120vh] w-[150vw] bg-mesh-gradient"
        style={{ rotate }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-100/40 via-transparent to-emerald-100/30" />
    </motion.div>
  );
}
