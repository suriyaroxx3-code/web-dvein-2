import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';

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

const STATIC_DATA = {
  domains: [
    { _id: 1, title: "Full Stack Mafia",   iconName: "FaLayerGroup", color: "text-blue-600",   desc: "Dominate the web. MERN Stack, Next.js, and System Design.",           skills: ["React", "Node.js", "MongoDB", "AWS"] },
    { _id: 2, title: "AI Architects",       iconName: "FaBrain",      color: "text-blue-600", desc: "Build the brain. Python, TensorFlow, LLMs, and Neural Networks.",     skills: ["Python", "PyTorch", "OpenAI API", "HuggingFace"] },
    { _id: 3, title: "Cloud Commanders",    iconName: "FaCloud",      color: "text-blue-600", desc: "Scale to infinity. Docker, Kubernetes, Terraform, and CI/CD.",        skills: ["AWS", "Docker", "K8s", "Linux"] },
  ],
  curriculum: {
    web: [
      { _id: 1, week: "Week 1-2", title: "The Foundation",        desc: "Javascript V8 Engine internals, Async architecture, and DOM manipulation." },
      { _id: 2, week: "Week 3-5", title: "Backend Engineering",   desc: "Building scalable APIs with Node.js, Express, and Database Design patterns." },
      { _id: 3, week: "Week 6-8", title: "Frontend & Deployment", desc: "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2." },
    ],
    ai: [
      { _id: 1, week: "Week 1-2", title: "Python & Maths",        desc: "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML." },
      { _id: 2, week: "Week 3-5", title: "Machine Learning Ops",  desc: "Supervised Learning, Scikit-learn, and model evaluation metrics." },
      { _id: 3, week: "Week 6-8", title: "Deep Learning & LLMs",  desc: "Neural Networks, Transformers, and building RAG applications." },
    ],
  },
  projects: [
    { _id: 1, title: "AI-Powered SaaS",  tag: "Full Stack", desc: "Build a subscription-based SaaS platform integrated with OpenAI API." },
    { _id: 2, title: "Crypto Exchange",   tag: "Web3",       desc: "Real-time trading engine with WebSockets and high-frequency data handling." },
    { _id: 3, title: "Autonomous Agents", tag: "AI/ML",      desc: "Create AI agents that can browse the web and perform tasks automatically." },
  ],
  faqs: [
    { _id: 1, question: "Is this beginner friendly?",        answer: "Yes, but be ready to work hard. We start from zero but move fast." },
    { _id: 2, question: "Do you provide placement support?", answer: "We have 50+ hiring partners. If you clear our assessments, we refer you directly." },
    { _id: 3, question: "What is the duration?",             answer: "The internship cohort runs for 8 weeks intense training + 4 weeks live project." },
  ],
};

const Training = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [data, setData] = useState(STATIC_DATA);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026'
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const WA_NUMBER = '918667363893';

  useEffect(() => {
    fetch('http://localhost:5000/api/public/training-page')
      .then(res => res.json())
      .then(apiData => { setData(apiData); })
      .catch(error => {
        console.warn('Could not load training page from backend.', error);
      });
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const waText = [
      `*New Internship Application — DVein Innovations*`,
      ``,
      `*Name:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      `*Applying For:* ${formData.jobTitle}`,
      `*Portfolio:* ${formData.portfolio || 'Not provided'}`,
      ``,
      `_Sent from DVein Website_`,
    ].join('\n');

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
      if (resume) dataToSend.append('resume', resume);
      await fetch('http://localhost:5000/api/public/apply', {
        method: 'POST',
        body: dataToSend,
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.warn('Could not save internship application to backend before opening WhatsApp.', error);
    }

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');

    setSubmitStatus('success');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026' });
    setResume(null);
    e.target.reset();
    setSubmitting(false);
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen pt-24 overflow-x-hidden selection:bg-blue-500 selection:text-white relative">
      <style>{marqueeStyle}</style>

      {/* HERO */}
      <div className="relative min-h-[70vh] flex flex-col justify-center pb-12 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-bold tracking-wider mb-4 shadow-sm uppercase">Engineering Excellence</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-gray-900">
              Stop Learning Syntax. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600">Start Building Products.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Join an elite program designed by Senior Engineers. Master industry-standard tech through intense execution and real-world deployment.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
              >Apply Now</button>
              <button
                onClick={() => document.getElementById('domains').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all"
              >Explore Tracks</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="bg-white/50 backdrop-blur-sm py-8 border-y border-white rotate-[-1deg] scale-[1.01] z-20 relative">
        <div className="animate-marquee inline-block whitespace-nowrap">
          {[1,2,3].map(i => (
            <span key={i} className="mx-10 text-gray-900 font-black text-xl uppercase tracking-tighter">
              500+ Graduates &bull; 100+ Projects &bull; 50+ Partners &bull;
            </span>
          ))}
        </div>
      </div>

      {/* DOMAINS */}
      <div id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Choose Your Battlefield</h2>
            <p className="text-gray-500 font-medium">Focused tracks built for high-performance careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.domains?.map((domain, index) => (
              <motion.div key={domain._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[2rem] p-8 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl ${domain.color} mb-6 group-hover:scale-110 transition-transform`}>{getIcon(domain.iconName)}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{domain.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {domain.skills?.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{s}</span>)}
                </div>
                <button
                  onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest"
                >Apply Now <FaIcons.FaArrowRight /></button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CURRICULUM */}
      <div className="py-24 bg-[#0f172a] text-white rounded-[3rem] mx-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">What will you master?</h2>
              <p className="text-gray-400 mb-10 leading-relaxed font-medium">Our curriculum is engineered backward from industry hiring requirements.</p>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('web')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'web' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Web Track</button>
                <button onClick={() => setActiveTab('ai')}  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ai'  ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>AI Track</button>
              </div>
            </div>
            <div className="space-y-8">
              {data.curriculum && data.curriculum[activeTab]?.map((item, index) => (
                <div key={item._id} className="flex gap-6 group">
                  <div className="text-white/10 font-black text-3xl group-hover:text-blue-50 transition-colors">0{index + 1}</div>
                  <div>
                    <span className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-1 block">{item.week}</span>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-xs font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION FORM */}
      <div id="apply-section" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-500 rounded-t-[2.5rem]" />

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3">Apply Now</h2>
            <p className="text-gray-400 text-sm font-medium">
              Fill the form — WhatsApp will open with your details ready to send.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-4xl">
                <FaIcons.FaWhatsapp />
              </div>
              <h3 className="text-2xl font-black text-gray-900">WhatsApp Opened! ✅</h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Your application details are pre-filled in WhatsApp.<br />
                <strong className="text-gray-700">Just tap Send</strong> to complete your application.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition shadow"
              >
                <FaIcons.FaWhatsapp className="text-lg" /> Open WhatsApp Again
              </a>
              <button onClick={() => setSubmitStatus(null)} className="mt-1 text-xs text-gray-400 underline">
                Submit another application
              </button>
            </div>
          )}

          {!submitStatus && (
            <form onSubmit={handleApply} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name *</label>
                  <input
                    type="text" required
                    value={formData.firstName}
                    onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="Arjun"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name *</label>
                  <input
                    type="text" required
                    value={formData.lastName}
                    onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="Kumar"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="arjun@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel" required
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Applying For *</label>
                <select
                  required
                  value={formData.jobTitle}
                  onChange={e => setFormData(p => ({ ...p, jobTitle: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-700"
                >
                  <option value="Internship Cohort 2026">Internship Cohort 2026</option>
                  <option value="Full Stack Mafia Track">Full Stack Mafia Track</option>
                  <option value="AI Architects Track">AI Architects Track</option>
                  <option value="Cloud Commanders Track">Cloud Commanders Track</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Portfolio / LinkedIn / GitHub <span className="text-gray-300 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={e => setFormData(p => ({ ...p, portfolio: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  placeholder="https://github.com/yourname"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Resume <span className="text-gray-300 font-normal">(optional, PDF/DOC)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setResume(e.target.files[0])}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Opening WhatsApp...
                  </>
                ) : (
                  <><FaIcons.FaWhatsapp className="text-lg" /> Submit via WhatsApp</>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                WhatsApp will open with your details pre-filled. Just tap Send to complete.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-14 tracking-tight">Industry Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.projects?.map((project) => (
            <div key={project._id} className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-widest">Enterprise</span>
                <h3 className="text-lg font-black mt-4 mb-2">{project.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 max-w-3xl mx-auto px-6">
        <div className="space-y-3">
          {data.faqs?.map((faq, index) => (
            <div key={faq._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-gray-800">
                {faq.question}
                {activeAccordion === index ? <FaIcons.FaChevronUp className="text-blue-600" /> : <FaIcons.FaChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-5 pb-5 text-gray-500 text-xs leading-relaxed overflow-hidden font-medium">
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;
