import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket, FaShieldAlt, FaSync, FaBolt, FaDatabase,
  FaNetworkWired, FaCogs, FaArrowRight,
  FaLock, FaChevronDown, FaChevronUp,
  FaQuoteLeft, FaStar, FaGoogle, FaLayerGroup, FaGlobe
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import '../styles/products.css';
import { useContent } from '../context/ContentContext';

const WA_PROD = '919500181230';
const openWA_Prod = (msg) =>
  window.open(`https://wa.me/${WA_PROD}?text=${encodeURIComponent(msg)}`, '_blank');

// Visual constants for roadmap icons/colors
const ROADMAP_ICONS  = [<FaRocket />, <FaCogs />, <FaShieldAlt />, <FaGlobe />];
const ROADMAP_COLORS = ['bg-blue-600', 'bg-violet-600', 'bg-indigo-600', 'bg-cyan-600'];

const ProductsPage = () => {
  const { content } = useContent();
  const p = content.products;

  const [products, setProducts]             = useState([]);
  const [loading, setLoading]               = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, []);

  // Build hero headline lines
  const heroLines = p.hero.headline.split('\\n');

  return (
    <div className="products-page min-h-screen bg-[#020817] text-white font-sans">

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0056D2_0%,_transparent_70%)] opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1.5 px-5 rounded-full border border-white/20 bg-white/5 text-white/70 text-xs font-bold tracking-widest uppercase mb-8">
              {p.hero.badge}
            </span>
            <h1 className="text-5xl md:text-8xl font-extrabold leading-none mb-8 tracking-tighter">
              {heroLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}{i < heroLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="max-w-2xl mx-auto text-white/50 text-lg mb-12 leading-relaxed">
              {p.hero.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => openWA_Prod('Hello DVein, I want to explore your products.')}
                className="px-10 py-4 bg-white text-[#020817] font-extrabold rounded-xl hover:-translate-y-1 transition-all text-sm uppercase tracking-widest shadow-2xl">
                {p.hero.exploreBtn}
              </button>
              <button onClick={() => openWA_Prod('Hello DVein, I need Technical Documentation for your products.')}
                className="px-10 py-4 border border-white/20 text-white font-extrabold rounded-xl hover:bg-white/5 hover:-translate-y-1 transition-all text-sm uppercase tracking-widest">
                {p.hero.docsBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DNA / CORE ARCHITECTURE ── */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-12">{p.dna.heading}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.dna.items.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -8 }}
                className="border border-white/10 rounded-2xl p-8 bg-white/2 hover:bg-white/5 transition-all group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 mb-6 group-hover:bg-dveinBlue group-hover:text-white transition-all">
                  {i === 0 ? <FaBolt /> : i === 1 ? <FaLock /> : <FaDatabase />}
                </div>
                <h3 className="font-extrabold text-white mb-3 uppercase tracking-wider text-sm">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DYNAMIC PRODUCTS FROM BACKEND ── */}
      {!loading && products.length > 0 && (
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-16">Product Inventory</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod, i) => (
                <motion.div key={prod._id} whileHover={{ y: -6 }}
                  className="border border-white/10 rounded-2xl overflow-hidden bg-white/2 hover:bg-white/5 transition-all group">
                  {prod.image && (
                    <div className="h-48 overflow-hidden">
                      <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-extrabold text-white uppercase tracking-wider text-sm mb-2">{prod.name}</h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-4">{prod.description}</p>
                    <button onClick={() => openWA_Prod(`Hello DVein, I'm interested in: ${prod.name}`)}
                      className="text-xs font-bold text-dveinBlue hover:text-white transition-colors flex items-center gap-1">
                      Learn More <FaArrowRight size={10} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ROADMAP ── */}
      <AnimatedRoadmap
        title={p.roadmap.title}
        subtitle={p.roadmap.subtitle}
        accent="bg-blue-500"
        steps={p.roadmap.steps.map((step, i) => ({
          icon:  ROADMAP_ICONS[i % ROADMAP_ICONS.length],
          label: step.label,
          desc:  step.desc,
          color: ROADMAP_COLORS[i % ROADMAP_COLORS.length],
        }))}
      />

      {/* ── REVIEWS ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full text-xs font-bold text-white/40 mb-6">
              <FaGoogle className="text-red-400" /> {p.reviews.googleBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">{p.reviews.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.reviews.items.map((review, i) => (
              <div key={review.id || i} className="border border-white/10 rounded-2xl p-8 bg-white/2">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} size={12} className={j < review.rating ? 'text-yellow-400' : 'text-white/10'} />
                  ))}
                </div>
                <FaQuoteLeft className="text-white/10 text-2xl mb-4" />
                <p className="text-white/50 text-sm leading-relaxed italic mb-6">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-dveinBlue/20 flex items-center justify-center text-dveinBlue font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-white/30 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-center mb-12">{p.faq.heading}</h2>
          <div className="space-y-3">
            {p.faq.items.map((item, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-white text-sm">
                  {item.q}
                  {activeAccordion === i ? <FaChevronUp size={12} className="text-white/40 shrink-0" /> : <FaChevronDown size={12} className="text-white/40 shrink-0" />}
                </button>
                <AnimatePresence>
                  {activeAccordion === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProductsPage;
