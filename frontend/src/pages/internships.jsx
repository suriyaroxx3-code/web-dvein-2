import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const getIcon = (iconName) => {
  const IconComponent = FaIcons[iconName];
  return IconComponent ? <IconComponent /> : <FaIcons.FaCode />;
};

const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee { animation: marquee 30s linear infinite; }
`;

const Internships = () => {
  const { content } = useContent();
  const d = content.internships;

  const [trainings, setTrainings]         = useState([]);
  const [openDomain, setOpenDomain]       = useState(null);
  const [openCurr, setOpenCurr]           = useState(null);
  const [openFaq, setOpenFaq]             = useState(null);
  const [activeTab, setActiveTab]         = useState('web');
  const [formData, setFormData]           = useState({ name: '', email: '', phone: '', track: '', message: '' });
  const [formStatus, setFormStatus]       = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/public/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(() => setTrainings([]));
  }, []);

  const handleFormChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/public/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) { setFormStatus('success'); setFormData({ name: '', email: '', phone: '', track: '', message: '' }); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  // Build headline lines
  const heroLines = d.hero.headline.split('\\n');

  return (
    <div className="min-h-screen bg-white font-sans">
      <style>{marqueeStyle}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0B1120] pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#0056D2_0%,_transparent_60%)] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#10B981_0%,_transparent_60%)] opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block py-2 px-6 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-8">
              {d.hero.badge}
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-8 font-heading">
              {heroLines.map((line, i) => (
                <React.Fragment key={i}>
                  {i === 1 ? <span className="text-dveinGreen">{line}</span> : line}
                  {i < heroLines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-white/70 mb-12 leading-relaxed">
              {d.hero.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#apply"
                className="px-10 py-4 bg-dveinBlue hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl transition-all hover:-translate-y-1 text-sm uppercase tracking-widest">
                {d.hero.applyBtn}
              </a>
              <a href="#domains"
                className="px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-xl transition-all hover:-translate-y-1 text-sm uppercase tracking-widest backdrop-blur">
                {d.hero.exploreBtn}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-dveinBlue py-3 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-white font-bold text-sm mx-8 shrink-0">{d.marquee}</span>
          ))}
        </div>
      </div>

      {/* ── DOMAINS ── */}
      <section id="domains" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 font-heading">{d.domainsHeading}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{d.domainsSubheading}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {d.domains.map((domain) => (
              <motion.div
                key={domain._id}
                whileHover={{ y: -4 }}
                onClick={() => setOpenDomain(openDomain === domain._id ? null : domain._id)}
                className="bg-white border border-gray-100 rounded-2xl p-6 cursor-pointer hover:shadow-xl transition-all group"
              >
                <div className={`text-2xl mb-3 ${domain.color}`}>{getIcon(domain.iconName)}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{domain.title}</h3>
                <AnimatePresence>
                  {openDomain === domain._id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{domain.desc}</p>
                      <div className="flex flex-wrap gap-1">
                        {domain.skills?.map((s, i) => (
                          <span key={i} className="bg-gray-50 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium border">{s}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-heading">{d.curriculum.heading}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{d.curriculum.subheading}</p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center gap-2 mb-10">
            {['web', 'ai'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-dveinBlue text-white shadow-lg' : 'bg-white text-gray-500 border hover:border-dveinBlue'}`}>
                {tab === 'web' ? 'Web Development' : 'AI & Data Science'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {d.curriculum[activeTab].map((item, idx) => (
              <motion.div key={item._id || idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <button onClick={() => setOpenCurr(openCurr === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left">
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-dveinBlue/10 text-dveinBlue rounded-xl flex items-center justify-center text-xs font-black">{idx + 1}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{item.week}</p>
                      <p className="font-bold text-gray-900">{item.title}</p>
                    </div>
                  </div>
                  <FaIcons.FaChevronDown className={`text-gray-400 transition-transform ${openCurr === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openCurr === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">{item.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 font-heading">{d.projects.heading}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {d.projects.items.map((proj, idx) => (
              <motion.div key={proj._id || idx} whileHover={{ y: -6 }}
                className="bg-gradient-to-br from-[#0056D2] to-[#0041a8] p-8 rounded-2xl text-white shadow-xl">
                <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-4 inline-block">{proj.tag}</span>
                <h3 className="text-xl font-extrabold mb-3">{proj.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{proj.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center font-heading">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {d.faqs.map((faq, idx) => (
              <div key={faq._id || idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900">
                  {faq.question}
                  <FaIcons.FaChevronDown className={`text-gray-400 shrink-0 ml-4 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLY FORM ── */}
      <section id="apply" className="py-24 bg-[#0B1120]">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3 font-heading">Apply Now</h2>
            <p className="text-white/60">Fill in your details and we'll get back to you within 24 hours.</p>
          </div>
          <form onSubmit={handleFormSubmit} className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 space-y-5">
            {[
              { name: 'name',  placeholder: 'Your Full Name',    type: 'text'  },
              { name: 'email', placeholder: 'Email Address',     type: 'email' },
              { name: 'phone', placeholder: 'Phone Number',      type: 'tel'   },
            ].map(field => (
              <input key={field.name} type={field.type} name={field.name} value={formData[field.name]}
                onChange={handleFormChange} placeholder={field.placeholder} required
                className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-3.5 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-dveinBlue focus:border-dveinBlue transition-all" />
            ))}
            <select name="track" value={formData.track} onChange={handleFormChange} required
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-dveinBlue transition-all">
              <option value="" disabled className="text-gray-900">Select Your Track</option>
              {d.domains.map((dom) => (
                <option key={dom._id} value={dom.title} className="text-gray-900">{dom.title}</option>
              ))}
            </select>
            <textarea name="message" value={formData.message} onChange={handleFormChange}
              placeholder="Tell us about yourself..." rows={4}
              className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-5 py-3.5 text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-dveinBlue transition-all resize-none" />
            <button type="submit" disabled={formStatus === 'sending'}
              className="w-full bg-dveinBlue hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all text-sm uppercase tracking-widest shadow-xl disabled:opacity-60">
              {formStatus === 'sending' ? 'Sending...' : 'Submit Application'}
            </button>
            {formStatus === 'success' && <p className="text-dveinGreen text-center text-sm font-bold">✓ Application submitted successfully!</p>}
            {formStatus === 'error'   && <p className="text-red-400 text-center text-sm font-bold">Something went wrong. Please try again.</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default Internships;
