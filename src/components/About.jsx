import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Leaf, Brush } from 'lucide-react';

const values = [
  { icon: <Brush size={22} />, title: 'Hand-Painted', desc: 'Every piece is painted by hand — no prints, no shortcuts. Just brush, pigment, and patience.' },
  { icon: <Leaf size={22} />, title: 'Eco-Conscious', desc: 'Sustainably sourced cotton paper, plant-based inks, and recyclable packaging throughout.' },
  { icon: <Heart size={22} />, title: 'Made with Love', desc: 'Each animal character has a name, a story, and far more personality than they probably should.' },
];

export default function About() {
  const sec = useRef(null);
  const inView = useInView(sec, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={sec} className="py-16 sm:py-24 md:py-32 bg-white/80 relative overflow-hidden">
      <div className="absolute top-8 right-8 text-[8rem] leading-none opacity-[0.04] pointer-events-none select-none">🌸</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Image placeholder */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="relative">
            <div className="bg-gradient-to-br from-warm/25 to-sage/15 rounded-3xl aspect-[4/3] lg:aspect-square flex items-center justify-center relative">
              <div className="text-center">
                <span className="text-5xl sm:text-[7rem] block mb-3">🎨</span>
                <p className="font-hand text-xl sm:text-2xl text-bark/70">Our Studio</p>
              </div>
              <div className="absolute inset-5 border-2 border-warm/15 rounded-2xl pointer-events-none" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 flex items-center gap-3">
              <span className="text-3xl">🦊</span>
              <div>
                <p className="font-serif text-sm font-bold text-bark">Est. 2024</p>
                <p className="font-body text-xs text-bark/60">Countryside Studio</p>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
            <p className="font-hand text-lg text-moss mb-2">Our Story</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bark mb-6 sm:mb-8 leading-tight">
              Where Whimsy Meets <span className="text-forest">Watercolour</span>
            </h2>
            <div className="space-y-4 sm:space-y-5 font-body text-bark/80 text-sm sm:text-base md:text-lg leading-relaxed">
              <p>The Polite Animal Society began with a simple sketch of a fox wearing a bow tie — and a feeling that the world could do with a little more gentleness.</p>
              <p>From our sun-dappled countryside studio, we paint, felt, and stitch creatures that remind us to slow down, be kind, and perhaps enjoy a spot of tea. Our animals have impeccable manners and questionable fashion sense, and we wouldn't have it any other way.</p>
              <p>Every piece is made to be cherished — a little window into a kinder, cosier world where animals wear waistcoats and everyone is invited to tea.</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
              {values.map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.12 }}>
                  <div className="w-11 h-11 bg-forest/10 text-forest rounded-xl flex items-center justify-center mb-3">{v.icon}</div>
                  <h4 className="font-serif text-sm font-bold text-bark mb-1">{v.title}</h4>
                  <p className="font-body text-xs text-bark/65 leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
