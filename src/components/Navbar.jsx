import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isShopPage = location.pathname === '/shop';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 md:px-8 lg:px-10 pt-2.5 sm:pt-3"
    >
      <div className={`max-w-5xl mx-auto flex items-center justify-between h-13 sm:h-14 md:h-[3.6rem] px-4 sm:px-6 md:px-8 rounded-full transition-all duration-500 backdrop-blur-2xl backdrop-saturate-150 border ${
        scrolled
          ? 'bg-white/90 shadow-lg shadow-bark/5 border-bark/10'
          : 'bg-white/75 shadow-md shadow-bark/4 border-white/50'
      }`}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">🦊</span>
          <div>
            <span className="font-serif text-base sm:text-lg font-bold text-bark block leading-tight">The Polite Animal</span>
            <span className="font-hand text-xs sm:text-sm text-moss -mt-0.5 block">Society</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {isShopPage ? (
            <Link to="/" className="font-body text-sm font-medium text-bark/80 hover:text-forest transition-colors">Home</Link>
          ) : (
            navLinks.map((l) => (
              <a key={l.name} href={l.href} className="font-body text-sm font-medium text-bark/80 hover:text-forest transition-colors">
                {l.name}
              </a>
            ))
          )}
          <Link to="/shop" className="inline-flex items-center gap-2 bg-forest text-white px-5 py-2 rounded-full font-body text-sm font-semibold hover:bg-bark transition-colors shadow-md">
            <ShoppingBag size={15} /> Shop
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-bark p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-2xl backdrop-saturate-150 mx-2 sm:mx-4 mt-2 rounded-2xl border border-bark/10 shadow-xl shadow-bark/8"
          >
            <div className="px-6 py-5 flex flex-col gap-3.5">
              {isShopPage ? (
                <Link to="/" onClick={() => setOpen(false)} className="font-body font-medium text-bark text-base hover:text-forest transition-colors">Home</Link>
              ) : (
                navLinks.map((l) => (
                  <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="font-body font-medium text-bark text-base hover:text-forest transition-colors">
                    {l.name}
                  </a>
                ))
              )}
              <Link to="/shop" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 bg-forest text-white px-5 py-3 rounded-full font-body font-semibold hover:bg-bark transition-colors mt-1 shadow-md">
                <ShoppingBag size={16} /> Shop Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
