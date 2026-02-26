import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import paintings from '../data/paintings';

export default function Gallery() {
  const rail = useRef(null);
  const sec = useRef(null);
  const inView = useInView(sec, { once: true, margin: '-80px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!rail.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rail.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    if (!rail.current) return;
    rail.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  // The section bg is white/60 on linen (#F7F6F3) — blended ≈ #FAFAF8
  const fadeBg = '#FAFAF8';

  return (
    <section id="gallery" ref={sec} className="py-16 sm:py-24 md:py-32 relative" style={{ backgroundColor: fadeBg }}>
      <div className="absolute top-0 right-0 text-[10rem] leading-none opacity-[0.04] pointer-events-none select-none">🌿</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12 sm:mb-16">
          <p className="font-hand text-lg text-moss mb-2">Our Collection</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bark mb-5">The Gallery</h2>
          <p className="font-body text-bark/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Each piece is lovingly hand-painted in our countryside studio. Scroll through to meet our distinguished animal characters.
          </p>
        </motion.div>
      </div>

      {/* Scroll gallery */}
      <div className="relative max-w-[90rem] mx-auto">
        {/* Scroll buttons — positioned outside the mask layer */}
        <button onClick={() => scroll('left')} aria-label="Scroll left"
          className={`absolute left-2 md:left-4 top-[calc(50%-2rem)] z-20 hidden md:flex items-center justify-center w-11 h-11 bg-white shadow-lg rounded-full text-bark hover:text-forest hover:scale-105 transition-all ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => scroll('right')} aria-label="Scroll right"
          className={`absolute right-2 md:right-4 top-[calc(50%-2rem)] z-20 hidden md:flex items-center justify-center w-11 h-11 bg-white shadow-lg rounded-full text-bark hover:text-forest hover:scale-105 transition-all ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <ChevronRight size={20} />
        </button>

        {/* Scrollable rail with CSS mask for smooth edge fading */}
        <div
          ref={rail}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 px-4 sm:px-6 md:px-16"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `#B8B3A6 ${fadeBg}`,
            WebkitMaskImage: `linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)`,
            maskImage: `linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)`,
          }}
        >
          {paintings.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex-none w-64 sm:w-72 md:w-80 snap-center"
            >
              <Link to={`/product/${p.id}`} className="block bg-white border border-warm/20 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
                <div className="aspect-[3/4] relative overflow-hidden bg-linen">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-bark font-body text-sm px-4 py-2 rounded-full shadow">View Details</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold text-bark">{p.title}</h4>
                  <p className="font-body text-xs text-bark/60 mt-1">{p.sub}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-serif text-xl font-bold text-forest">${p.price}</span>
                    <button className="text-xs font-body text-bark/70 hover:text-forest border border-warm/40 hover:border-forest px-3 py-1.5 rounded-full transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-bark/50 text-xs font-body mt-3 md:hidden">← Swipe to see more →</p>
      </div>

      <div className="text-center mt-10">
        <Link to="/shop" className="inline-flex items-center gap-2 bg-forest text-white px-7 py-3.5 rounded-full font-body font-semibold hover:bg-bark transition-colors shadow-md">
          View All in Shop →
        </Link>
      </div>
    </section>
  );
}
