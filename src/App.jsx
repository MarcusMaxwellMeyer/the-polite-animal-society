import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';

function App() {
  const bgUrl = `${import.meta.env.BASE_URL}bg-meadow.png`;
  const [scrollFade, setScrollFade] = useState(0);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      // Fade from 0 (top) to 1 (fully covered) over the first 1200px of scroll
      const t = Math.min(window.scrollY / 1200, 1);
      setScrollFade(t);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Background opacity: 1.0 at top → 0 as you scroll down
  const bgOpacity = 1 - scrollFade;

  return (
    <>
      {/* Faded background image — more visible at top, fades as you scroll */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center calc(50% + 80px)',
          opacity: bgOpacity * 0.45,
          transition: 'opacity 0.15s ease-out',
        }}
      />
      {/* Light overlay so text stays readable */}
      <div className="fixed inset-0 -z-10 pointer-events-none bg-linen/80" />

      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
