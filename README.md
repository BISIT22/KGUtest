# Сайт-визитка ИТИ КГУ для абитуриентов

Одностраничный иммерсивный фронтенд (React, Tailwind CSS, Framer Motion) и REST API на Node.js (Express) с SQLite. Предназначен для Института информационных технологий и инженерии Калужского государственного университета им. К. Э. Циолковского.

## Возможности

- **Публичная часть:** главная с нестандартной типографикой и анимациями, новости, материалы (посты), галерея, контакты, карта (OpenStreetMap embed), ссылки на [ВКонтакте](https://vk.com/ksu_iti) и [официальный сайт института](https://tksu.ru/about_the_university/departments/185/).
- **Роли:** `admin` и `user`. JWT в заголовке `Authorization: Bearer <token>`.
- **Админ:** CRUD постов и новостей, загрузка изображений в галерею (папка `uploads/gallery`), просмотр входящих сообщений из формы.
- **Пользователь:** просмотр контента, регистрация/вход, отправка формы обратной связи (Nodemailer на `fti@tksu.ru` при настроенном SMTP).
- **Безопасность:** пароли хранятся как bcrypt-хеши. В продакшене используйте HTTPS.

## Структура проекта

```
├── backend/           # Express API
│   └── src/
│       ├── index.js   # Точка входа, CORS, статика uploads
│       ├── db.js      # SQLite, создание таблиц
│       ├── seed.js    # Первый администратор
│       ├── middleware/
│       └── routes/
├── frontend/          # Vite + React
│   └── src/
├── uploads/gallery/   # Файлы галереи (создаётся при загрузке)
├── database.sqlite    # БД (создаётся при первом запуске бэкенда)
├── .env               # Секреты (см. .env.example)
└── package.json       # concurrently: общий `npm run dev`
```

## Требования

- **Node.js 22.12+** (рекомендуется текущий LTS). Бэкенд использует встроенный модуль [`node:sqlite`](https://nodejs.org/api/sqlite.html) — без нативной сборки SQLite на Windows/macOS/Linux. При первом запуске в консоли может появиться предупреждение `ExperimentalWarning: SQLite is an experimental feature` — это ожидаемо для текущих версий Node.

## Установка зависимостей

Из корня репозитория:

```bash
npm install
```

Скрипт `postinstall` установит зависимости в `backend/` и `frontend/`. При необходимости выполните вручную:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Конфигурация

1. Скопируйте `.env.example` в `.env` в **корне** проекта (бэкенд читает его оттуда).
2. Задайте как минимум:
   - `JWT_SECRET` — длинная случайная строка.
   - `ADMIN_USERNAME` / `ADMIN_PASSWORD` — учётная запись администратора (создаётся один раз, если в БД ещё нет админа).
3. Для отправки почты с формы:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
   - при необходимости `SMTP_USER`, `SMTP_PASS`
   - `MAIL_FROM`, `MAIL_TO` (по умолчанию получатель — `fti@tksu.ru`)

Без SMTP сообщения всё равно сохраняются в таблице `contact_messages` и доступны админу в разделе «Сообщения».

## Запуск в режиме разработки

Требуются два процесса (или один общий):

```bash
npm run dev
```

- API: `http://localhost:4000`
- Фронтенд: `http://localhost:5173` (прокси к `/api` и `/uploads` настроен в `frontend/vite.config.js`)

Отдельно:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

## Сборка фронтенда

```bash
npm run build --prefix frontend
```

Статика в `frontend/dist/`. Для продакшена задайте `VITE_API_URL` (URL API с HTTPS).

## API (кратко)

Базовый префикс: `/api`.

| Метод | Путь | Описание |
|--------|------|----------|
| GET | `/health` | Проверка работы |
| POST | `/auth/register` | Регистрация (`user`) |
| POST | `/auth/login` | Вход, выдача JWT |
| GET | `/auth/me` | Текущий пользователь (Bearer) |
| GET | `/posts` | Список постов |
| GET | `/posts/:id` | Пост |
| POST/PUT/DELETE | `/posts`, `/posts/:id` | Админ |
| GET | `/news` | Новости |
| POST/PUT/DELETE | `/news`, `/news/:id` | Админ |
| GET | `/gallery` | Галерея |
| POST | `/gallery` | Админ, `multipart/form-data`: поле `file`, опционально `caption` |
| PUT/DELETE | `/gallery/:id` | Админ |
| POST | `/contact` | Форма: `{ name, email, body }` |
| GET | `/admin/messages` | Админ — последние сообщения |

### Примеры

**Вход:**

```http
POST /api/auth/login
Content-Type: application/json

{"username":"admin","password":"***"}
```

**Создание поста (админ):**

```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{"title":"Заголовок","body":"Текст поста"}
```

**Загрузка в галерею (админ):**

```http
POST /api/gallery
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>
caption: Подпись
```

## Нестандартные анимации (фронтенд)

| Элемент | Файл / место | Идея |
|---------|----------------|------|
| Экран загрузки | `LoaderScreen.jsx` | Выезд панели с «полосами» и clip-path при исчезновении |
| Фон | `ScrollMeshBg.jsx` | Смещение mesh-градиента и лёгкий поворот слоя при скролле |
| «Залипательная речь» | `ManifestoBurst.jsx` | Побуквенное появление с пружинной анимацией, разные стартовые смещения и масштаб (эффект «взрыва»/нарастания) |
| Блоки контента | `Reveal.jsx` | Разные направления входа: слева, справа, снизу, с наклоном |
| Меню | `SideMenu.jsx` | Выезд панели справа за пределы экрана, spring, затемнение фона |
| Карта | `Home.jsx` | Лёгкий scale при скролле через `useTransform` |
| Кнопки и карточки | разные страницы | Hover: градиенты, тени, `whileHover` / `whileTap` Framer Motion |

Рекомендуется смотреть код компонентов — поведение намеренно различается по секциям, без единого шаблона «fade-in».

## Оптимизация

- Сборка Vite с `esbuild` minify и разделением чанка `framer-motion`.
- У изображений галереи — `loading="lazy"` и `decoding="async"`.
- Перед выкладкой сжимайте изображения (например, TinyPNG) и подписывайте осмысленные имена файлов.

## Примечания

- База данных — один файл `database.sqlite` в корне (не коммитьте в git при реальных данных).
- Для продакшена: HTTPS, сильные секреты, ограничение CORS по домену, резервное копирование БД и папки `uploads/`.
