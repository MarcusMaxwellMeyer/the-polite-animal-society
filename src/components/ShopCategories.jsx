import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Trees, Scissors, Flag } from 'lucide-react';

const shopBg = `${import.meta.env.BASE_URL}bg-shop.png`;

const cats = [
  { id: 'dressed', icon: <Palette size={28} />, emoji: '🦊', title: 'Animals in Attire', desc: 'Watercolour paintings of woodland creatures dressed in their finest human clothes — velvet waistcoats, linen aprons, and tiny spectacles.', count: 6 },
  { id: 'natural', icon: <Trees size={28} />, emoji: '🦌', title: 'Natural Portraits', desc: 'Delicate watercolour studies of animals in their natural habitat. Soft washes and fine detail capture the gentle spirit of each creature.', count: 8 },
  { id: 'felted', icon: <Scissors size={28} />, emoji: '🐑', title: 'Felted Friends', desc: 'Real-life needle-felted animals crafted from wool, each with a unique personality. Perfect companions for your shelf or mantelpiece.', count: 4 },
  { id: 'banners', icon: <Flag size={28} />, emoji: '🏔️', title: 'Fabric Banners', desc: 'Massive hand-sewn fabric banners featuring charming animal designs. Statement pieces for nurseries, studios, and cozy living rooms.', count: 3 },
];

export default function ShopCategories() {
  const sec = useRef(null);
  const inView = useInView(sec, { once: true, margin: '-80px' });

  return (
    <section id="shop" ref={sec} className="relative overflow-hidden">
      {/* Pixel-art background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url('${shopBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 -z-10 bg-bark/70" />

      <div className="py-16 sm:py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
            <p className="font-hand text-lg text-sage mb-2">Browse Our Collections</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5">The Shop</h2>
            <p className="font-body text-white/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
              Four lovingly curated collections, each celebrating animals in a different medium. Every piece is made with care in our countryside studio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {cats.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.12 }}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 sm:p-10 md:p-12 flex flex-col h-full group cursor-pointer hover:bg-white/[0.18] hover:shadow-2xl hover:shadow-black/20 transition-all duration-300">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{c.emoji}</span>
                      <div className="text-white/50 group-hover:text-white/80 transition-colors">{c.icon}</div>
                    </div>
                    <span className="bg-white/15 text-white/70 text-xs font-body px-3 py-1 rounded-full">{c.count} pieces</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-sage transition-colors">{c.title}</h3>
                  <p className="font-body text-white/65 text-sm leading-relaxed mb-8 flex-1">{c.desc}</p>
                  <div className="flex items-center gap-2 text-sage font-body font-semibold text-sm group-hover:gap-3 transition-all">
                    Browse Collection <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
            className="text-center mt-14 font-body text-white/50 text-sm italic"
          >
            🛒 Online shop with payments coming soon. <a href="#contact" className="text-sage hover:underline">Contact us</a> to place an order now.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
