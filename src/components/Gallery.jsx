import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const base = import.meta.env.BASE_URL;

const paintings = [
  { id: 1, title: 'Sir Reginald Fox', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-1.jpeg`, price: '$85' },
  { id: 2, title: 'Miss Beatrice Bunny', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-2.jpeg`, price: '$75' },
  { id: 3, title: 'Professor Hoots', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-3.jpeg`, price: '$90' },
  { id: 4, title: 'Captain Barnaby Bear', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-4.jpeg`, price: '$95' },
  { id: 5, title: 'Lady Rosalind Deer', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-5.jpeg`, price: '$80' },
  { id: 6, title: 'Dr Whiskers', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-6.jpeg`, price: '$85' },
  { id: 7, title: 'Mr Puddles the Otter', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-7.jpeg`, price: '$70' },
  { id: 8, title: 'Duchess Penelope Badger', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-8.jpeg`, price: '$88' },
  { id: 9, title: 'Morning Light Study', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-9.jpeg`, price: '$82' },
  { id: 10, title: 'Woodland Reverie', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-10.jpeg`, price: '$78' },
  { id: 11, title: 'Countryside Charm', sub: 'Watercolour · Cotton paper', image: `${base}artwork/painting-11.jpeg`, price: '$92' },
];

export default function Gallery() {
  const rail = useRef(null);
  const sec = useRef(null);
  const inView = useInView(sec, { once: true, margin: '-80px' });

  const scroll = (dir) => {
    if (!rail.current) return;
    rail.current.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section id="gallery" ref={sec} className="py-24 md:py-32 bg-linen/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 text-[10rem] leading-none opacity-[0.04] pointer-events-none select-none">🌿</div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="font-hand text-lg text-moss mb-2">Our Collection</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-bark mb-5">The Gallery</h2>
          <p className="font-body text-bark/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Each piece is lovingly hand-painted in our countryside studio. Scroll through to meet our distinguished animal characters.
          </p>
        </motion.div>
      </div>

      {/* Scroll controls + rail */}
      <div className="relative max-w-[90rem] mx-auto">
        {/* Left/right fade masks */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 z-[5] pointer-events-none" style={{ background: 'linear-gradient(to right, rgba(250,240,230,0.95), transparent)' }} />
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 z-[5] pointer-events-none" style={{ background: 'linear-gradient(to left, rgba(250,240,230,0.95), transparent)' }} />

        <button onClick={() => scroll('left')}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 shadow-lg rounded-full text-bark hover:text-forest hover:scale-105 transition-all">
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => scroll('right')}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 bg-white/90 shadow-lg rounded-full text-bark hover:text-forest hover:scale-105 transition-all">
          <ChevronRight size={22} />
        </button>

        <div ref={rail} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-6 md:px-16 scrollbar-thin"
          style={{ scrollbarColor: '#C4A882 #FAF0E6' }}
        >
          {paintings.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex-none w-72 md:w-80 snap-center"
            >
              <div className="bg-white/80 border border-warm/25 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
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
                  <p className="font-body text-xs text-bark/40 mt-1">{p.sub}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-serif text-xl font-bold text-forest">{p.price}</span>
                    <button className="text-xs font-body text-bark/50 hover:text-forest border border-warm/40 hover:border-forest px-3 py-1.5 rounded-full transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-bark/30 text-xs font-body mt-3 md:hidden">← Swipe to see more →</p>
      </div>
    </section>
  );
}
