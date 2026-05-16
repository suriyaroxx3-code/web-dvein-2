import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaRocket, FaShieldAlt, FaSync, FaBolt, FaDatabase, 
  FaNetworkWired, FaCogs, FaArrowRight, FaPlayCircle, 
  FaLock, FaChevronDown, FaChevronUp, FaMicrochip,
  FaQuoteLeft, FaStar, FaGoogle
} from 'react-icons/fa';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const architecturalDNA = [
    { icon: <FaBolt />, title: "Quantum Sync", desc: "Low-latency data kernels for high-speed enterprise nodes synchronized globally." },
    { icon: <FaShieldAlt />, title: "Zero-Trust Mesh", desc: "Multi-layered identity validation nodes ensure secure cluster environments." },
    { icon: <FaSync />, title: "Immutable Sync", desc: "System logs mirrored on private ledgers for audit accuracy." }
  ];

  const RoadmapSteps = [
    { id: "01", t: "Technical Discovery", d: "Identifying scaling bottlenecks in current tech stacks." },
    { id: "02", t: "Architecture Build", d: "Designing customized clusters for production load." },
    { id: "03", t: "Mesh Integration", d: "Securing nodes and performing vulnerability scans." },
    { id: "04", t: "Global Activation", d: "Zero-downtime deployment across global nodes." }
  ];

  const reviews = [
    { id: 1, name: "Sriram K.", role: "Intern Node", text: "The internship gave me practical exposure to real datasets.", rating: 5 },
    { id: 2, name: "Divya R.", role: "Enterprise Client", text: "DVein delivered our mobile node ahead of schedule.", rating: 5 },
    { id: 3, name: "Arun Vijay", role: "Full Stack Student", text: "Mentors teach real industry standards.", rating: 5 }
  ];

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-indigo-600 font-semibold tracking-wide text-xs mb-6 border border-indigo-100 shadow-sm">
            Product Hub Node Activated
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            Future-Proof <br/>
            <span className="text-indigo-600">Product Disruptors</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
            We build high-performance software nodes designed for enterprise stability. Deploy disruptive kernels globally with zero-latency sync.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' })} 
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-sm transition-all shadow-xl hover:bg-slate-900 hover:-translate-y-1"
            >
              Explore Inventory
            </button>

            <button 
              className="bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-10 py-4 rounded-xl font-semibold text-sm transition-all hover:border-indigo-400"
            >
              Technical Docs
            </button>
          </div>
        </motion.div>
      </div>

      {/* CORE DNA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {architecturalDNA.map((node, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-white transition-all group hover:shadow-2xl text-center">
              <div className="text-2xl text-indigo-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {node.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3 tracking-tight">
                {node.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {node.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROCESS */}
      <div className="bg-white/40 backdrop-blur-sm border-y border-white py-24 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Deployment Lifecycle
            </h2>
            <p className="text-indigo-600 mt-4 font-medium tracking-wide text-sm">
              Agile Activation Sync Nodes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {RoadmapSteps.map((step, index) => (
              <div key={index}>
                <div className="w-20 h-20 bg-white mx-auto rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-sm mb-6">
                  <span className="text-lg font-semibold text-indigo-600">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-wide mb-2">
                  {step.t}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium px-4">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INVENTORY */}
      <div id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-20 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Active Inventory
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-indigo-600 font-medium animate-pulse text-sm">
            Syncing Ledger...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <motion.div key={item._id} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group">
                <div className="h-56 bg-slate-50 rounded-3xl overflow-hidden mb-8 relative shadow-inner">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt="" 
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 border-l-4 border-indigo-100 pl-4">
                  {item.description}
                </p>

                <div className="bg-indigo-50 p-5 rounded-2xl mb-8 flex justify-between items-center border border-indigo-100">
                  <span className="text-xs font-medium text-indigo-400">
                    Monthly sync
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    {item.price || "$299"}/mo
                  </span>
                </div>

                <div className="grid gap-3 mt-auto">
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                    <FaPlayCircle className="text-base" /> Launch Trial
                  </button>
                  <button className="w-full py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:border-indigo-400 transition-all">
                    <FaLock className="text-indigo-600" /> Member Access
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-16 rounded-[3rem] border border-slate-100 text-center shadow-xl">
            <FaRocket className="text-4xl text-indigo-600 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Launch Node Initializing
            </h2>
            <p className="text-slate-500 text-sm mb-10 max-w-xl mx-auto font-medium leading-relaxed">
              Our core product nodes are undergoing final technical scans. Activation soon.
            </p>
          </div>
        )}
      </div>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white/40 border-y border-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-indigo-50">
              <FaGoogle className="text-red-500 text-lg" />
              <span className="font-medium text-slate-700 text-sm">
                Rated 5.0 Google Reviews
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Loved by Global Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -5 }} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all relative flex flex-col hover:shadow-2xl">
                <FaQuoteLeft className="text-indigo-400/10 text-6xl absolute top-8 right-10" />
                <div className="flex gap-1 text-yellow-400 mb-8">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-600 mb-10 text-sm leading-relaxed font-medium">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {review.name}
                    </h4>
                    <p className="text-xs text-indigo-400 font-medium tracking-wide">
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 tracking-tight">
          Product Logs
        </h2>
        <div className="space-y-4">
          {[
            {q: "Is Cluster Redundancy Standard?", a: "Every enterprise node comes with automated backups by default." },
            {q: "Custom AI Cluster Sync?", a: "Nodes support seamless third-party AI/ML integration." },
            {q: "Activation Cycle Window?", a: "Full activation usually takes less than 48 hours." }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} 
                className="w-full flex justify-between items-center p-6 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-all"
              >
                <span className="text-sm">{faq.q}</span>
                {activeAccordion === index 
                  ? <FaChevronUp className="text-indigo-600"/> 
                  : <FaChevronDown className="text-slate-300"/>}
              </button>

              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="bg-slate-50 px-8 pb-8 text-sm text-slate-600 font-medium leading-relaxed border-l-4 border-indigo-600 ml-6"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <Link to="/contact">
          <button className="bg-slate-900 text-white px-10 py-5 rounded-xl font-semibold text-sm transition-all shadow-2xl hover:bg-indigo-600 hover:-translate-y-1">
            Request Custom Node Activation <FaArrowRight className="inline ml-3" />
          </button>
        </Link>
        <p className="mt-12 text-xs font-medium text-slate-300 tracking-wide">
          © 2026 DVEIN • PRODUCT INFRASTRUCTURE
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;
