import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Instagram, MapPin } from 'lucide-react';

export default function Contact() {
  const sec = useRef(null);
  const inView = useInView(sec, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);

  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  const infoCard = (Icon, title, text) => (
    <div className="bg-white/70 backdrop-blur-sm border border-warm/25 rounded-2xl shadow-sm p-6 flex items-center gap-4">
      <div className="w-12 h-12 bg-forest/10 text-forest rounded-xl flex items-center justify-center shrink-0"><Icon size={20} /></div>
      <div>
        <h4 className="font-serif text-sm font-bold text-bark">{title}</h4>
        <p className="font-body text-sm text-bark/70">{text}</p>
      </div>
    </div>
  );

  return (
    <section id="contact" ref={sec} className="py-16 sm:py-24 md:py-32 bg-white/70 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 text-[10rem] leading-none opacity-[0.04] pointer-events-none select-none">🌿</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="font-hand text-lg text-moss mb-2">Get in Touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bark mb-5">Write to Us</h2>
          <p className="font-body text-bark/70 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Commissions, questions, or just a friendly hello — we'd love to hear from you. Our owl secretary will respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Info cards */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {infoCard(Mail, 'Email Us', 'hello@politeanimalsociety.com')}
            {infoCard(Instagram, 'Follow Along', '@thepoliteanimalsociety')}
            {infoCard(MapPin, 'Studio', 'The Old Mill, English Countryside')}
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.25 }} className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm border border-warm/25 rounded-2xl shadow-sm p-6 sm:p-8 md:p-10">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                  <span className="text-5xl block mb-4">💌</span>
                  <h3 className="font-serif text-2xl font-bold text-bark mb-2">Thank You!</h3>
                  <p className="font-body text-bark/70">Your message has been sent. Our owl secretary will respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-sm text-bark/80 mb-1.5 block">Your Name</label>
                      <input type="text" required placeholder="e.g. Beatrix Potter"
                        className="w-full bg-cream/50 border border-warm/30 rounded-xl px-4 py-3 font-body text-sm text-bark placeholder:text-bark/40 focus:outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all" />
                    </div>
                    <div>
                      <label className="font-body text-sm text-bark/80 mb-1.5 block">Email</label>
                      <input type="email" required placeholder="beatrix@example.com"
                        className="w-full bg-cream/50 border border-warm/30 rounded-xl px-4 py-3 font-body text-sm text-bark placeholder:text-bark/40 focus:outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="font-body text-sm text-bark/80 mb-1.5 block">Subject</label>
                    <select className="w-full bg-cream/50 border border-warm/30 rounded-xl px-4 py-3 font-body text-sm text-bark focus:outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all">
                      <option>Commission a painting</option>
                      <option>Order enquiry</option>
                      <option>Wholesale / stockists</option>
                      <option>Just saying hello 🐾</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm text-bark/80 mb-1.5 block">Message</label>
                    <textarea required rows={5} placeholder="Tell us about what you're looking for..."
                      className="w-full bg-cream/50 border border-warm/30 rounded-xl px-4 py-3 font-body text-sm text-bark placeholder:text-bark/40 focus:outline-none focus:border-forest/50 focus:ring-2 focus:ring-forest/10 transition-all resize-none" />
                  </div>
                  <button type="submit" className="self-start inline-flex items-center gap-2 bg-forest text-cream px-7 py-3.5 rounded-full font-body font-semibold hover:bg-bark transition-colors shadow-md">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
