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
      <section className="relative flex min-h-[78vh] flex-col justify-start pb-8 pl-4 pt-16 md:min-h-[84vh] md:pb-10 md:pt-16 md:pl-12 lg:pl-20">
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
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-400">Набор</p>
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
          <motion.p
            className="mt-4 max-w-2xl text-lg text-zinc-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Добро пожаловать в Институт информационных технологий и инженерии КГУ — место, где рождаются инновации, где теория встречается с практикой, а будущее создаётся здесь и сейчас.
          </motion.p>
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

      <section className="relative min-h-[60vh] border-t border-violet-100">
        <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="relative flex min-h-[60vh] flex-col justify-center px-4 py-8 md:px-12 lg:pl-24 lg:pr-32">
          <Reveal variant="fromLeft">
            <ManifestoBurst />
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[65vh] border-t border-violet-100 bg-gradient-to-br from-white via-violet-50/30 to-emerald-50/40">
        <div className="grid min-h-[65vh] grid-cols-1 items-stretch lg:grid-cols-2">
          <Reveal variant="tilt" className="flex flex-col justify-center p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold text-zinc-900 md:text-4xl">
              Почему выбирают ИТИ КГУ
            </h2>
            <ul className="mt-8 space-y-4 font-sans text-zinc-600">
              {[
                'Актуальные программы обучения, соответствующие мировым стандартам',
                'Опытные преподаватели и практикующие специалисты из IT-индустрии',
                'Лаборатории с современным оборудованием и технологиями',
                'Реальные проекты с компаниями-партнёрами',
                'Возможность стажировок и трудоустройства',
              ].map((t, i) => (
                <motion.li
                  key={t}
                  className="relative pl-8"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <span className="absolute left-0 top-1.5 h-2 w-2 rotate-45 bg-neon-lime shadow-[0_0_12px_#39ff14]" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="fromRight" className="relative overflow-hidden rounded-3xl">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-emerald-500/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <div className="flex h-full min-h-[44vh] flex-col justify-end p-6 md:p-12 relative z-10">
              <motion.div
                className="relative rounded-2xl border border-violet-300 bg-white/95 p-8 shadow-xl shadow-violet-500/20 backdrop-blur"
                whileHover={{ y: -8, rotate: -1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22, duration: 0.3 }}
              >
                <p className="font-display text-2xl font-bold text-violet-800">Будущее начинается здесь</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  Присоединитесь к сообществу инженеров и разработчиков, которые формируют технологический облик России.
                </p>
                <Link
                  to="/news"
                  className="mt-6 inline-flex items-center font-display text-sm font-bold uppercase tracking-widest text-emerald-600 transition hover:translate-x-1"
                >
                  Новости и события →
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative min-h-[65vh] border-t border-violet-100 bg-white">
        <div className="grid min-h-[65vh] grid-cols-1 lg:grid-cols-2">
          <Reveal variant="fromBottom" className="flex flex-col justify-center p-6 md:p-12">
            <h2 className="font-display text-3xl font-bold text-zinc-900">Местоположение</h2>
            <p className="mt-4 max-w-md text-zinc-600 leading-relaxed">
              <strong>Калужский государственный университет</strong>
              <br />
              Институт информационных технологий и инженерии
              <br />
              <br />
              📍 г. Калуга, ул. Степана Разина, 22/48
              <br />
              📧 <a href="mailto:fti@tksu.ru" className="text-violet-600 hover:underline">fti@tksu.ru</a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={vk}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-violet-700 px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-violet-900 hover:shadow-lg hover:shadow-violet-500/30 duration-300"
              >
                ВКонтакте
              </a>
              <a
                href={site}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border-2 border-violet-600 px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-violet-800 transition-all hover:bg-violet-50 duration-300"
              >
                Узнать больше
              </a>
            </div>
          </Reveal>
          <motion.div
            className="relative min-h-[44vh] w-full overflow-hidden border-t border-violet-100 lg:border-l lg:border-t-0 rounded-none lg:rounded-tl-3xl"
            style={{ scale: mapScale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="Карта — Калужский государственный университет"
              className="h-full min-h-[44vh] w-full border-0"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.8484573206707!2d36.25899!3d54.516389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414b1c6d5c9a5555%3A0x1234567890ab!2z0a3Qv9GA0LDRgdC70LDRh9C10YHQv9C-INC_0L7QvtC90Y_RgiDQk9C-0LrQuNC3INCn0LjQvdCz0L4tINCf0LDQvNGB0L7Qs9C80Y8g0YfQtdCx0LjQvdC-0YHQuNGPINC-0LnQvNC-0Ygm!5e0!3m2!1sru!2sru!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      <section className="relative min-h-[50vh] border-t border-violet-100 bg-gradient-to-b from-white to-violet-50/40 px-4 py-8 md:px-12 md:py-10">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-zinc-900 md:text-4xl">
              Присоединяйтесь к нам
            </h2>
            <p className="mt-4 text-lg text-zinc-600 leading-relaxed">
              Институт информационных технологий и инженерии КГУ приглашает талантливых и мотивированных абитуриентов. 
              Здесь вы получите не только качественное образование, но и опыт, навыки и связи, необходимые для успешной карьеры в IT-индустрии.
            </p>
            <Link 
              to="/contact" 
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg hover:shadow-violet-500/30 duration-300"
            >
              Начать путь в будущее
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}