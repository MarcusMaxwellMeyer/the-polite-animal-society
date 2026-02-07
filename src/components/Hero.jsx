import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import AnimalQuiz from './AnimalQuiz';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-24 left-8 text-6xl opacity-[0.07] animate-float">🌿</div>
        <div className="absolute top-48 right-16 text-5xl opacity-[0.07] animate-float" style={{ animationDelay: '2s' }}>🍂</div>
        <div className="absolute bottom-36 left-16 text-5xl opacity-[0.07] animate-float" style={{ animationDelay: '4s' }}>🌸</div>
        <div className="absolute bottom-24 right-8 text-6xl opacity-[0.07] animate-float" style={{ animationDelay: '1s' }}>🍄</div>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-honey/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-berry/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left column */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="text-center lg:text-left">
            <p className="font-hand text-xl md:text-2xl text-moss mb-3">Welcome to</p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-bark leading-[1.1] mb-6">
              The Polite<br />
              <span className="text-forest">Animal Society</span>
            </h1>
            <p className="font-body text-bark/60 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Hand-painted watercolour art celebrating the quiet charm of animals dressed in their Sunday best. 
              From dapper foxes to scholarly owls — every piece tells a cozy story.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <a href="#gallery" className="inline-flex items-center gap-2 bg-forest text-cream px-7 py-3.5 rounded-full font-body font-semibold hover:bg-bark transition-colors shadow-md">
                View Gallery <ChevronDown size={18} />
              </a>
              <a href="#shop" className="inline-flex items-center gap-2 border-2 border-forest text-forest px-7 py-3.5 rounded-full font-body font-semibold hover:bg-forest hover:text-cream transition-colors">
                Browse Shop
              </a>
            </div>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-bark/40 font-body">
              <span>🎨 Hand-painted</span>
              <span>🌿 Eco-friendly inks</span>
              <span>📦 Worldwide shipping</span>
            </div>
          </motion.div>

          {/* Right column — Quiz */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white/70 backdrop-blur-sm border border-warm/30 rounded-3xl shadow-lg p-8 md:p-10"
          >
            <AnimalQuiz />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-body text-xs text-bark/30">Scroll to explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={18} className="text-bark/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
