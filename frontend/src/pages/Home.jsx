import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ManifestoBurst } from '../components/ManifestoBurst.jsx';
import { Reveal } from '../components/Reveal.jsx';

const vk = 'https://vk.com/ksu_iti';
const site = 'https://tksu.ru/about_the_university/departments/185/';

export function Home() {
  const { scrollYProgress } = useScroll();
  const mapScale = useTransform(scrollYProgress, [0.6, 0.85], [0.92, 1]);

  return (
    <div className="relative">
      <section className="relative flex min-h-[78vh] flex-col justify-start pb-10 pl-4 pt-16 md:min-h-[84vh] md:pb-12 md:pt-16 md:pl-12 lg:pl-20">
        <div className="absolute right-4 top-16 max-w-[40vw] text-right md:right-12">
          <motion.p
            className="font-display text-[10vw] font-black leading-none text-violet-100 md:text-[7vw]"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            20
          </motion.p>
          <motion.p
            className="-mt-2 font-display text-[10vw] font-black leading-none text-transparent md:text-[7vw]"
            style={{ WebkitTextStroke: '1px #a78bfa' }}
            initial={{ opacity: 0, x: 120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            26
          </motion.p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-400">набор</p>
        </div>
        <div className="relative z-10 mt-2 md:mt-1">
          <motion.h1
            className="font-display text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-zinc-900 sm:text-5xl md:max-w-4xl md:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Код. Инженерия.
            <br />
            <span className="inline-block pb-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-500 bg-clip-text text-transparent">
              Человек.
            </span>
          </motion.h1>
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/contact" className="group relative inline-flex overflow-hidden rounded-full">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-emerald-500 transition-transform duration-500 group-hover:scale-105" />
              <span className="relative px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white">
                Подать заявку
              </span>
            </Link>
            <a
              href={site}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border-2 border-violet-300 bg-white px-6 py-3 font-display text-sm font-semibold text-violet-800 transition-all hover:border-neon-lime hover:shadow-[0_0_0_4px_rgba(57,255,20,0.25)]"
            >
              Официальный сайт
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative min-h-[75vh] border-t border-violet-100">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative flex min-h-[75vh] flex-col justify-center px-4 py-12 md:px-12 lg:pl-24 lg:pr-32">
          <Reveal variant="fromLeft">
            <ManifestoBurst />
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[75vh] border-t border-violet-100 bg-gradient-to-br from-white via-violet-50/30 to-emerald-50/40">
        <div className="grid min-h-[75vh] grid-cols-1 items-stretch lg:grid-cols-2">
          <Reveal variant="tilt" className="flex flex-col justify-center p-8 md:p-16">
            <h2 className="font-display text-3xl font-bold text-zinc-900 md:text-4xl">
              Почему ИТИ — не «ещё один факультет»
            </h2>
            <ul className="mt-8 space-y-4 font-sans text-zinc-600">
              {[
                'Программы, где теория сразу превращается в прототипы.',
                'Лаборатории и проекты, а не только «лекции у доски».',
                'Среда, в которой хочется экспериментировать.',
              ].map((t, i) => (
                <motion.li
                  key={t}
                  className="relative pl-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                >
                  <span className="absolute left-0 top-1.5 h-2 w-2 rotate-45 bg-neon-lime shadow-[0_0_12px_#39ff14]" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="fromRight" className="relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%237c3aed\\' fill-opacity=\\'0.06\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            <div className="flex h-full min-h-[44vh] flex-col justify-end p-6 md:p-12">
              <motion.div
                className="relative ml-auto max-w-md rounded-3xl border border-violet-200 bg-white/90 p-8 shadow-xl shadow-violet-500/10 backdrop-blur"
                whileHover={{ y: -6, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <p className="font-display text-2xl font-bold text-violet-800">Сделай шаг в сторону</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  Асимметрия — это не хаос. Это смелость выбрать траекторию, которая совпадает с твоими
                  амбициями.
                </p>
                <Link
                  to="/news"
                  className="mt-6 inline-block font-display text-sm font-bold uppercase tracking-widest text-emerald-600 underline-offset-4 hover:underline"
                >
                  Новости института →
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[70vh] border-t border-violet-100">
        <div className="grid min-h-[70vh] grid-cols-1 lg:grid-cols-2">
          <Reveal variant="fromBottom" className="flex flex-col justify-center p-6 md:p-12">
            <h2 className="font-display text-3xl font-bold text-zinc-900">Мы на карте</h2>
            <p className="mt-4 max-w-md text-zinc-600">
              Калужский государственный университет им. К. Э. Циолковского — г. Калуга, ул. Степана Разина,
              22/48.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={vk}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-violet-700 px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-white transition hover:bg-violet-900"
              >
                ВКонтакте
              </a>
              <a
                href={site}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-zinc-300 px-5 py-2 font-display text-xs font-bold uppercase tracking-widest text-zinc-800 transition hover:border-neon-lime"
              >
                Официальный сайт
              </a>
            </div>
          </Reveal>
          <motion.div
            className="relative min-h-[44vh] w-full overflow-hidden border-t border-violet-100 lg:border-l lg:border-t-0"
            style={{ scale: mapScale }}
          >
            <iframe
              title="Карта — Калужский государственный университет"
              className="h-full min-h-[44vh] w-full border-0 grayscale contrast-[1.05] filter"
              loading="lazy"
              src="https://maps.google.com/maps?q=%D1%83%D0%BB.%20%D0%A1%D1%82%D0%B5%D0%BF%D0%B0%D0%BD%D0%B0%20%D0%A0%D0%B0%D0%B7%D0%B8%D0%BD%D0%B0%2022/48%2C%20%D0%9A%D0%B0%D0%BB%D1%83%D0%B3%D0%B0&z=17&output=embed"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
