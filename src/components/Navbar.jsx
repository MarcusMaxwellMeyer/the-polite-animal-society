import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Shop', href: '#shop' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-3"
    >
      <div className={`max-w-6xl mx-auto flex items-center justify-between h-16 px-6 md:px-10 rounded-full transition-all duration-500 backdrop-blur-xl ${
        scrolled ? 'bg-cream/80 shadow-lg border border-warm/20' : 'bg-cream/50 border border-transparent'
      }`}>
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="text-3xl group-hover:scale-110 transition-transform">🦊</span>
          <div>
            <span className="font-serif text-lg font-bold text-bark block leading-tight">The Polite Animal</span>
            <span className="font-hand text-sm text-moss -mt-0.5 block">Society</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.name} href={l.href} className="font-body text-sm text-bark/70 hover:text-forest transition-colors">
              {l.name}
            </a>
          ))}
          <a href="#shop" className="inline-flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-full font-body text-sm font-semibold hover:bg-bark transition-colors shadow-md">
            <ShoppingBag size={15} /> Shop
          </a>
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
            className="md:hidden bg-cream/95 backdrop-blur-xl mx-4 md:mx-8 mt-2 rounded-2xl border border-warm/20 shadow-lg"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="font-body text-bark text-lg hover:text-forest transition-colors">
                  {l.name}
                </a>
              ))}
              <a href="#shop" onClick={() => setOpen(false)} className="inline-flex items-center justify-center gap-2 bg-forest text-cream px-5 py-3 rounded-full font-body font-semibold hover:bg-bark transition-colors mt-2">
                <ShoppingBag size={16} /> Shop Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
