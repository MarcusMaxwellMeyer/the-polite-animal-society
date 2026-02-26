import { motion } from 'framer-motion';
import { ChevronDown, Palette, Leaf, Package } from 'lucide-react';
import AnimalQuiz from './AnimalQuiz';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-32 -right-32 w-64 md:w-[500px] h-64 md:h-[500px] rounded-full bg-honey/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 md:w-[500px] h-64 md:h-[500px] rounded-full bg-berry/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="backdrop-blur-md rounded-2xl sm:rounded-[2rem] overflow-hidden border border-bark/8 shadow-2xl"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.88)' }}
        >
          <div className="grid lg:grid-cols-5">
            {/* Left column — 3/5 */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="lg:col-span-3 text-center lg:text-left px-6 py-8 sm:p-10 md:p-14 flex flex-col justify-center"
            >
              <p className="font-hand text-lg sm:text-xl md:text-2xl text-moss mb-2">Welcome to</p>
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-bark leading-[1.05] mb-4 sm:mb-6">
                The Polite<br />
                <span className="text-forest">Animal Society</span>
              </h1>
              <p className="font-body text-bark/80 text-base sm:text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-10 leading-relaxed">
                Hand-painted watercolour art celebrating the quiet charm of animals dressed in their Sunday best. 
                Every piece tells a cozy story.
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-10">
                <a href="#gallery" className="inline-flex items-center gap-2 bg-forest text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-body font-semibold text-sm sm:text-base hover:bg-bark transition-colors shadow-md">
                  View Gallery <ChevronDown size={18} />
                </a>
                <a href="#shop" className="inline-flex items-center gap-2 border-2 border-forest text-forest px-5 sm:px-7 py-3 sm:py-3.5 rounded-full font-body font-semibold text-sm sm:text-base hover:bg-forest hover:text-white transition-colors">
                  Browse Shop
                </a>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-5 justify-center lg:justify-start text-xs sm:text-sm text-bark/70 font-body">
                <span className="flex items-center gap-1.5"><Palette size={14} className="text-forest/60" /> Hand-painted</span>
                <span className="flex items-center gap-1.5"><Leaf size={14} className="text-forest/60" /> Eco-friendly inks</span>
                <span className="flex items-center gap-1.5"><Package size={14} className="text-forest/60" /> Worldwide shipping</span>
              </div>
            </motion.div>

            {/* Right column — Quiz — 2/5 with elegant divider */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-2 relative flex items-center justify-center px-6 py-8 sm:p-8 md:p-10"
            >
              {/* Organic vertical divider (desktop) */}
              <div className="hidden lg:block absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-bark/15 to-transparent" />
              {/* Horizontal divider (mobile) */}
              <div className="block lg:hidden absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-bark/15 to-transparent" />

              {/* Subtle radial glow behind quiz */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-honey/8 blur-3xl" />
              </div>

              <div className="relative z-10 w-full">
                <AnimalQuiz />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs text-bark/40 drop-shadow-sm">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={18} className="text-bark/40 drop-shadow-sm" />
        </motion.div>
      </motion.div>
    </section>
  );
}
