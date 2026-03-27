import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollMeshBg } from './components/ScrollMeshBg.jsx';
import { TopBar } from './components/TopBar.jsx';
import { SideMenu } from './components/SideMenu.jsx';
import { LoaderScreen } from './components/LoaderScreen.jsx';
import { Home } from './pages/Home.jsx';
import { NewsPage } from './pages/NewsPage.jsx';
import { PostsPage } from './pages/PostsPage.jsx';
import { GalleryPage } from './pages/GalleryPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { AdminPage } from './pages/AdminPage.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoaderScreen show={loading} />
      <ScrollMeshBg />
      <TopBar onMenuClick={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="relative min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
    </>
  );
}
