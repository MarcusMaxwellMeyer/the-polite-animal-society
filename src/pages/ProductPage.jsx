import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Truck, Shield, Leaf } from 'lucide-react';
import paintings from '../data/paintings';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const painting = paintings.find((p) => p.id === Number(id));

  if (!painting) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4">
        <p className="font-hand text-2xl text-moss mb-4">Oh dear...</p>
        <h1 className="font-serif text-3xl font-bold text-bark mb-4">Painting not found</h1>
        <p className="font-body text-bark/60 mb-8">This creature seems to have wandered off.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 bg-forest text-white px-6 py-3 rounded-full font-body font-semibold hover:bg-bark transition-colors"
        >
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </section>
    );
  }

  // Pick a few related paintings (same animal, or random if not enough)
  const related = paintings
    .filter((p) => p.id !== painting.id && p.animal === painting.animal)
    .slice(0, 3);
  if (related.length < 3) {
    const extras = paintings
      .filter((p) => p.id !== painting.id && !related.some((r) => r.id === p.id))
      .slice(0, 3 - related.length);
    related.push(...extras);
  }

  return (
    <section className="min-h-screen pt-24 sm:pt-28 pb-20 bg-white/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 font-body text-sm text-bark/50">
            <Link to="/" className="hover:text-forest transition-colors">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-forest transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-bark/80">{painting.title}</span>
          </nav>
        </motion.div>

        {/* Main product section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white border border-warm/20 rounded-3xl shadow-lg overflow-hidden">
              <div className="aspect-[3/4] relative overflow-hidden bg-linen">
                <img
                  src={painting.image}
                  alt={painting.title}
                  className="w-full h-full object-cover"
                />
                {/* Animal type badge */}
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-bark font-body text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                  {painting.animal}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Details panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <p className="font-hand text-lg text-moss mb-2">Original Artwork</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-bark mb-3">
              {painting.title}
            </h1>
            <p className="font-body text-bark/60 text-sm mb-6">{painting.sub}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="font-serif text-4xl font-bold text-forest">${painting.price}</span>
              <span className="font-body text-sm text-bark/40">AUD · Free shipping</span>
            </div>

            {/* Short description */}
            <p className="font-body text-bark/70 text-base leading-relaxed mb-8">
              {painting.description}
            </p>

            {/* Product details */}
            <div className="bg-cream/50 border border-warm/20 rounded-2xl p-6 mb-8">
              <h3 className="font-serif text-sm font-bold text-bark uppercase tracking-wider mb-4">Details</h3>
              <div className="space-y-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-bark/60">Size</span>
                  <span className="text-bark font-medium">{painting.size}</span>
                </div>
                <div className="border-t border-warm/15" />
                <div className="flex justify-between">
                  <span className="text-bark/60">Medium</span>
                  <span className="text-bark font-medium text-right max-w-[60%]">{painting.medium}</span>
                </div>
                <div className="border-t border-warm/15" />
                <div className="flex justify-between">
                  <span className="text-bark/60">Framing</span>
                  <span className="text-bark font-medium">Unframed (ships flat)</span>
                </div>
                <div className="border-t border-warm/15" />
                <div className="flex justify-between">
                  <span className="text-bark/60">Edition</span>
                  <span className="text-bark font-medium">Original · One of a kind</span>
                </div>
              </div>
            </div>

            {/* Add to Cart + Wishlist */}
            <div className="flex gap-3 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2.5 bg-forest text-white px-6 py-4 rounded-full font-body font-semibold text-base hover:bg-bark transition-colors shadow-md hover:shadow-lg">
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button className="flex items-center justify-center w-14 h-14 border-2 border-warm/30 rounded-full text-bark/50 hover:text-berry hover:border-berry transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center gap-1.5 py-3">
                <Truck size={18} className="text-moss" />
                <span className="font-body text-xs text-bark/60">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 py-3">
                <Shield size={18} className="text-moss" />
                <span className="font-body text-xs text-bark/60">Secure Packaging</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 py-3">
                <Leaf size={18} className="text-moss" />
                <span className="font-body text-xs text-bark/60">Eco-Friendly</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Story section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="bg-white/80 border border-warm/20 rounded-3xl shadow-md p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative corner flourish */}
            <div className="absolute top-4 right-6 text-6xl opacity-[0.06] pointer-events-none select-none">
              {painting.animal === 'Landscape' ? '🌿' : '🍂'}
            </div>

            <p className="font-hand text-lg text-moss mb-3">
              {painting.animal === 'Landscape' ? 'The Story Behind the Scene' : `The Tale of ${painting.title}`}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bark mb-6">
              {painting.animal === 'Landscape' ? 'A Moment Captured' : 'Meet the Character'}
            </h2>

            <div className="font-body text-bark/70 text-base sm:text-lg leading-relaxed space-y-4">
              <p>{painting.story}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-warm/20">
              <p className="font-body text-sm text-bark/50 italic">
                "Every painting in our collection is hand-crafted with love in our countryside studio. Each character has a story waiting to be told — and a wall waiting to call home."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related paintings */}
        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center mb-10">
              <p className="font-hand text-lg text-moss mb-2">You might also love</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-bark">More From the Society</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group">
                  <div className="bg-white/80 border border-warm/25 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-[3/4] relative overflow-hidden bg-linen">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-bark font-body text-xs px-3 py-1 rounded-full shadow-sm">
                        {p.animal}
                      </span>
                    </div>
                    <div className="p-5">
                      <h4 className="font-serif text-lg font-semibold text-bark">{p.title}</h4>
                      <p className="font-body text-xs text-bark/60 mt-1">{p.sub}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-serif text-xl font-bold text-forest">${p.price}</span>
                        <span className="text-xs font-body text-bark/50 group-hover:text-forest transition-colors">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
