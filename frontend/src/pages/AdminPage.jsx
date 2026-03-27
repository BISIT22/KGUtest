import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { apiFetch, apiUrl, galleryImageUrl } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export function AdminPage() {
  const { user, login, logout, isAdmin } = useAuth();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('posts');
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);
    try {
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      login(data.token, data.user);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-start justify-start px-6 pt-20 md:px-20">
        <motion.form
          onSubmit={mode === 'login' ? handleLogin : handleRegister}
          className="w-full max-w-md rounded-3xl border border-violet-200 bg-white p-8 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-zinc-900">
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            {mode === 'login' ? 'Администратор или пользователь' : 'Роль «пользователь» — просмотр и форма связи'}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase ${
                mode === 'login' ? 'bg-violet-700 text-white' : 'bg-zinc-100 text-zinc-600'
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase ${
                mode === 'register' ? 'bg-violet-700 text-white' : 'bg-zinc-100 text-zinc-600'
              }`}
            >
              Регистрация
            </button>
          </div>
          <label className="mt-6 block text-sm font-semibold">
            Логин
            <input
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="mt-4 block text-sm font-semibold">
            Пароль
            <input
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-violet-700 py-3 font-display text-sm font-bold uppercase tracking-widest text-white"
          >
            {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </motion.form>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="px-6 pt-20 md:px-20">
        <p className="font-display text-xl text-zinc-800">Вы вошли как пользователь.</p>
        <p className="mt-2 text-zinc-600">Панель управления доступна только администратору.</p>
        <button type="button" onClick={logout} className="mt-6 text-violet-700 underline">
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-14 pt-20 md:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-black text-zinc-900 md:text-5xl">Админ</h1>
          <p className="text-sm text-zinc-500">{user.username}</p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-semibold"
        >
          Выйти
        </button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {['posts', 'news', 'gallery', 'messages'].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 font-display text-xs font-bold uppercase tracking-widest ${
              tab === t
                ? 'bg-violet-700 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-violet-50'
            }`}
          >
            {t === 'posts' && 'Посты'}
            {t === 'news' && 'Новости'}
            {t === 'gallery' && 'Галерея'}
            {t === 'messages' && 'Сообщения'}
          </button>
        ))}
      </div>
      <div className="mt-10">
        {tab === 'posts' && <AdminPosts />}
        {tab === 'news' && <AdminNews />}
        {tab === 'gallery' && <AdminGallery />}
        {tab === 'messages' && <AdminMessages />}
      </div>
    </div>
  );
}

function AdminPosts() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const load = () =>
    apiFetch('/api/posts').then(setItems).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();
    await apiFetch('/api/posts', { method: 'POST', body: JSON.stringify({ title, body }) });
    setTitle('');
    setBody('');
    load();
  }

  async function remove(id) {
    if (!confirm('Удалить пост?')) return;
    await apiFetch(`/api/posts/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="rounded-2xl border border-violet-100 p-6">
        <h2 className="font-display font-bold">Новый пост</h2>
        <input
          className="mt-3 w-full rounded-xl border px-3 py-2"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="mt-3 w-full rounded-xl border px-3 py-2"
          rows={4}
          placeholder="Текст"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-white">
          Добавить
        </button>
      </form>
      <ul className="space-y-4">
        {items.map((p) => (
          <li key={p.id} className="rounded-xl border p-4">
            <strong>{p.title}</strong>
            <button
              type="button"
              onClick={() => remove(p.id)}
              className="ml-4 text-sm text-red-600"
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminNews() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image_url, setImageUrl] = useState('');

  const load = () => apiFetch('/api/news').then(setItems).catch(console.error);
  useEffect(() => {
    load();
  }, []);

  async function add(e) {
    e.preventDefault();
    await apiFetch('/api/news', {
      method: 'POST',
      body: JSON.stringify({ title, body, image_url: image_url || null }),
    });
    setTitle('');
    setBody('');
    setImageUrl('');
    load();
  }

  async function remove(id) {
    if (!confirm('Удалить новость?')) return;
    await apiFetch(`/api/news/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={add} className="rounded-2xl border border-violet-100 p-6">
        <h2 className="font-display font-bold">Новая новость</h2>
        <input
          className="mt-3 w-full rounded-xl border px-3 py-2"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="mt-3 w-full rounded-xl border px-3 py-2"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          className="mt-3 w-full rounded-xl border px-3 py-2"
          placeholder="URL изображения (необязательно)"
          value={image_url}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit" className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-white">
          Добавить
        </button>
      </form>
      <ul className="space-y-4">
        {items.map((n) => (
          <li key={n.id} className="rounded-xl border p-4">
            <strong>{n.title}</strong>
            <button type="button" onClick={() => remove(n.id)} className="ml-4 text-sm text-red-600">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AdminGallery() {
  const [items, setItems] = useState([]);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const load = () => apiFetch('/api/gallery').then(setItems).catch(console.error);
  useEffect(() => {
    load();
  }, []);

  async function upload(e) {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('caption', caption);
    const token = localStorage.getItem('token');
    const res = await fetch(apiUrl('/api/gallery'), {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: fd,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || 'Ошибка загрузки');
      return;
    }
    setCaption('');
    setFile(null);
    load();
  }

  async function remove(id) {
    if (!confirm('Удалить изображение?')) return;
    await apiFetch(`/api/gallery/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-8">
      <form onSubmit={upload} className="rounded-2xl border border-violet-100 p-6">
        <h2 className="font-display font-bold">Загрузка в галерею</h2>
        <p className="text-sm text-zinc-500">Файлы сохраняются в папку uploads/gallery</p>
        <input
          type="file"
          accept="image/*"
          className="mt-3 block"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input
          className="mt-3 w-full rounded-xl border px-3 py-2"
          placeholder="Подпись"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button type="submit" className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-white">
          Загрузить
        </button>
      </form>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((g) => (
          <div key={g.id} className="overflow-hidden rounded-xl border">
            <img
              src={galleryImageUrl(g.filename)}
              alt=""
              className="h-40 w-full object-cover"
              loading="lazy"
            />
            <div className="flex items-center justify-between p-2 text-sm">
              <span>{g.caption || g.filename}</span>
              <button type="button" className="text-red-600" onClick={() => remove(g.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminMessages() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    apiFetch('/api/admin/messages').then(setItems).catch(console.error);
  }, []);

  return (
    <ul className="space-y-4">
      {items.map((m) => (
        <li key={m.id} className="rounded-xl border p-4">
          <p className="text-sm text-zinc-500">
            {m.name} &lt;{m.email}&gt; · {m.created_at}
          </p>
          <p className="mt-2 whitespace-pre-wrap">{m.body}</p>
        </li>
      ))}
      {items.length === 0 && <p className="text-zinc-500">Нет сообщений</p>}
    </ul>
  );
}
