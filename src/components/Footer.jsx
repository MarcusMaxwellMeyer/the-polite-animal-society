import { Heart } from 'lucide-react';

const links = {
  Shop: ['Animals in Attire', 'Natural Portraits', 'Felted Friends', 'Fabric Banners'],
  Company: ['About Us', 'Our Story', 'Stockists', 'Press'],
  Support: ['Contact', 'Shipping Info', 'Returns', 'FAQ'],
};

export default function Footer() {
  return (
    <footer className="bg-bark text-cream/80">
      {/* Newsletter */}
      <div className="bg-forest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-xl font-bold text-cream mb-1">Join The Society 🦊</h3>
              <p className="font-body text-cream/50 text-sm">Get early access to new collections, behind-the-scenes peeks, and the occasional fox joke.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input type="email" placeholder="your@email.com"
                className="bg-white/10 border border-cream/20 rounded-l-full px-5 py-3 font-body text-sm text-cream placeholder:text-cream/30 focus:outline-none focus:border-cream/40 w-full md:w-64 transition-all" />
              <button className="bg-cream text-forest font-body font-semibold text-sm px-6 py-3 rounded-r-full hover:bg-honey hover:text-bark transition-colors whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">🦊</span>
              <div>
                <span className="font-serif text-xl font-bold text-cream block leading-tight">The Polite Animal</span>
                <span className="font-hand text-sm text-cream/40">Society</span>
              </div>
            </div>
            <p className="font-body text-sm text-cream/40 leading-relaxed max-w-sm mb-6">
              Hand-painted watercolour art, needle-felted creatures, and fabric banners — all celebrating the quiet charm of animals with impeccable manners.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Pinterest', 'Etsy'].map((s) => (
                <a key={s} href="#" className="font-body text-xs text-cream/30 border border-cream/10 px-3 py-1.5 rounded-full hover:text-honey hover:border-honey/30 transition-colors">{s}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="font-serif font-bold text-cream text-sm mb-5">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}><a href="#" className="font-body text-sm text-cream/35 hover:text-honey transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-cream/10 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream/25">© 2024 The Polite Animal Society. All rights reserved.</p>
          <p className="font-body text-xs text-cream/25 flex items-center gap-1">Made with <Heart size={11} className="text-berry" /> and a cup of tea</p>
        </div>
      </div>
    </footer>
  );
}
