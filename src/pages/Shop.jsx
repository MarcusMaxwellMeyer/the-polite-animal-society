import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
import paintings, { animalTypes } from '../data/paintings';

const sortOptions = [
  { label: 'Default',        value: 'default' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Name: A → Z',       value: 'name-asc' },
];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let items = activeFilter === 'All'
      ? [...paintings]
      : paintings.filter((p) => p.animal === activeFilter);

    switch (sortBy) {
      case 'price-asc':  items.sort((a, b) => a.price - b.price); break;
      case 'price-desc': items.sort((a, b) => b.price - a.price); break;
      case 'name-asc':   items.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }
    return items;
  }, [activeFilter, sortBy]);

  const countFor = (type) =>
    type === 'All' ? paintings.length : paintings.filter((p) => p.animal === type).length;

  return (
    <section className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body text-bark/60 hover:text-forest transition-colors mb-4">
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <p className="font-hand text-lg text-moss mb-1">Browse &amp; Filter</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-bark">The Shop</h1>
            <p className="font-body text-bark/60 mt-2 max-w-md">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} available
              {activeFilter !== 'All' && <> in <span className="text-forest font-semibold">{activeFilter}</span></>}
            </p>
          </div>

          {/* Sort + mobile filter toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden inline-flex items-center gap-1.5 text-sm font-body text-bark/70 border border-warm/30 rounded-full px-4 py-2 hover:border-forest transition-colors"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-body text-sm text-bark/70 bg-white/80 border border-warm/30 rounded-full px-4 py-2 focus:outline-none focus:border-forest transition-colors cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop sidebar filters */}
          <aside className="hidden md:block w-52 flex-none">
            <div className="sticky top-28">
              <h3 className="font-serif text-sm font-bold text-bark uppercase tracking-wider mb-4">Animal Type</h3>
              <div className="flex flex-col gap-1.5">
                {animalTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`text-left font-body text-sm px-3.5 py-2 rounded-xl transition-all duration-200 ${
                      activeFilter === type
                        ? 'bg-forest text-cream shadow-sm font-semibold'
                        : 'text-bark/70 hover:bg-bark/5 hover:text-bark'
                    }`}
                  >
                    {type}
                    <span className={`ml-1.5 text-xs ${activeFilter === type ? 'text-cream/70' : 'text-bark/40'}`}>
                      ({countFor(type)})
                    </span>
                  </button>
                ))}
              </div>

              {activeFilter !== 'All' && (
                <button
                  onClick={() => setActiveFilter('All')}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-body text-bark/50 hover:text-forest transition-colors"
                >
                  <X size={12} /> Clear filter
                </button>
              )}
            </div>
          </aside>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/30 z-40 md:hidden"
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-xl p-8 md:hidden overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-lg font-bold text-bark">Filters</h3>
                    <button onClick={() => setMobileFiltersOpen(false)} className="text-bark/50 hover:text-bark">
                      <X size={20} />
                    </button>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-bark uppercase tracking-wider mb-3">Animal Type</h4>
                  <div className="flex flex-col gap-1.5">
                    {animalTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => { setActiveFilter(type); setMobileFiltersOpen(false); }}
                        className={`text-left font-body text-sm px-3.5 py-2.5 rounded-xl transition-all ${
                          activeFilter === type
                            ? 'bg-forest text-cream shadow-sm font-semibold'
                            : 'text-bark/70 hover:bg-bark/5'
                        }`}
                      >
                        {type} <span className="text-xs opacity-60">({countFor(type)})</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center font-body text-bark/50 py-20 text-lg"
                >
                  No pieces found for this filter.
                </motion.p>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                  {filtered.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to={`/product/${p.id}`} className="bg-white/80 border border-warm/25 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer h-full flex flex-col">
                        <div className="aspect-[3/4] relative overflow-hidden bg-linen">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {/* Badge */}
                          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-bark font-body text-xs px-3 py-1 rounded-full shadow-sm">
                            {p.animal}
                          </span>
                          <div className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-white/90 backdrop-blur-sm text-bark font-body text-sm px-4 py-2 rounded-full shadow">View Details</span>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h4 className="font-serif text-lg font-semibold text-bark">{p.title}</h4>
                          <p className="font-body text-xs text-bark/60 mt-1">{p.sub}</p>
                          <p className="font-body text-sm text-bark/50 mt-2 leading-relaxed line-clamp-2">{p.description}</p>
                          <div className="flex items-center justify-between mt-auto pt-4">
                            <span className="font-serif text-xl font-bold text-forest">${p.price}</span>
                            <button className="text-xs font-body text-bark/70 hover:text-forest border border-warm/40 hover:border-forest px-3 py-1.5 rounded-full transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
