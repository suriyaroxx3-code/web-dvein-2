import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa'; 
import { SiReact, SiPython } from 'react-icons/si';

// Helper to render icon from string name
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

const Training = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026'
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/training-page') 
        .then(res => res.json())
        .then(apiData => {
            setData(apiData);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching training data", err);
            setLoading(false);
        });
  }, []);

  // --- FORM REFRESH LOGIC ---
  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    if (resume) dataToSend.append('resume', resume);

    try {
        const response = await fetch('http://localhost:5000/api/public/apply', {
            method: 'POST',
            body: dataToSend
        });
        const result = await response.json();
        
        if (result.success) {
            alert("Application Sent Successfully!"); 
            
            // ✅ பார்மை ரீசெட் செய்கிறோம் (Refresh)
            setFormData({
                firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026'
            });
            setResume(null);
            e.target.reset(); 
        }
    } catch (err) {
        alert("Server Error. Please try again.");
    } finally {
        setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Loading Experience</div>
    </div>
  );

  if (!data) return <div className="h-screen flex items-center justify-center font-bold text-red-500">Data Error. Check Console.</div>;

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 overflow-x-hidden selection:bg-purple-500 selection:text-white relative">
      <style>{marqueeStyle}</style>
      
      {/* 1. HERO SECTION - Reduced Text Size from 8xl to 6xl */}
      <div className="relative min-h-[70vh] flex flex-col justify-center pb-12 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-purple-100 text-purple-600 text-xs font-bold tracking-wider mb-4 shadow-sm uppercase">Engineering Excellence</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-gray-900">
              Stop Learning Syntax. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Start Building Products.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">Join an elite program designed by Senior Engineers. Master industry-standard tech through intense execution and real-world deployment.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all">Apply Now</button>
              <button onClick={() => document.getElementById('domains').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">Explore Tracks</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. STATS MARQUEE - Balanced Text Size */}
      <div className="bg-white/50 backdrop-blur-sm py-8 border-y border-white rotate-[-1deg] scale-[1.01] z-20 relative">
         <div className="animate-marquee inline-block whitespace-nowrap">
               {[1,2,3].map(i => (
                  <span key={i} className="mx-10 text-gray-900 font-black text-xl uppercase tracking-tighter">
                      🚀 500+ Graduates • 💻 100+ Projects • 🤝 50+ Partners •
                  </span>
               ))}
         </div>
      </div>

      {/* 3. DOMAINS GRID - Balanced Spacing */}
      <div id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Choose Your Battlefield</h2>
              <p className="text-gray-500 font-medium">Focused tracks built for high-performance careers.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.domains?.map((domain, index) => (
                 <motion.div key={domain._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[2rem] p-8 hover:shadow-xl transition-all group">
                    <div className={`w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl ${domain.color} mb-6 group-hover:scale-110 transition-transform`}>{getIcon(domain.iconName)}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{domain.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                        {domain.skills?.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{s}</span>)}
                    </div>
                    <button onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest">Apply Now <FaIcons.FaArrowRight /></button>
                 </motion.div>
              ))}
           </div>
        </div>
      </div>

      {/* 4. SYLLABUS SECTION - Professional Layout */}
      <div className="py-24 bg-[#0f172a] text-white rounded-[3rem] mx-4 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">What will you master?</h2>
                  <p className="text-gray-400 mb-10 leading-relaxed font-medium">Our curriculum is engineered backward from industry hiring requirements.</p>
                  <div className="flex gap-4">
                     <button onClick={() => setActiveTab('web')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'web' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Web Track</button>
                     <button onClick={() => setActiveTab('ai')} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ai' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>AI Track</button>
                  </div>
               </div>
               <div className="space-y-8">
                  {data.curriculum && data.curriculum[activeTab]?.map((item, index) => (
                     <div key={item._id} className="flex gap-6 group">
                        <div className="text-white/10 font-black text-3xl group-hover:text-purple-50 transition-colors">0{index + 1}</div>
                        <div>
                            <span className="text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1 block">{item.week}</span>
                            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                            <p className="text-gray-400 leading-relaxed text-xs font-medium">{item.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* ✨ 5. APPLICATION FORM SECTION - Balanced Text ✨ */}
      <div id="apply-section" className="py-24 max-w-4xl mx-auto px-6">
          <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-purple-50">
              <div className="text-center mb-10">
                  <h2 className="text-3xl font-black mb-3">Internship Application</h2>
                  <p className="text-gray-400 text-sm font-medium">WhatsApp details will follow application review.</p>
              </div>
              <form onSubmit={handleApply} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-1 focus:ring-purple-400 text-sm" placeholder="First Name" />
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-1 focus:ring-purple-400 text-sm" placeholder="Last Name" />
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-1 focus:ring-purple-400 text-sm" placeholder="Email Address" />
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-gray-50 p-3.5 rounded-xl outline-none focus:ring-1 focus:ring-purple-400 text-sm" placeholder="WhatsApp Number" />
                  <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Resume (PDF Only)</label>
                      <input required type="file" accept=".pdf" onChange={e => setResume(e.target.files[0])} className="w-full bg-purple-50 p-3.5 rounded-xl border border-dashed border-purple-200 text-xs" />
                  </div>
                  <button type="submit" disabled={submitting} className="md:col-span-2 py-4 bg-gray-900 text-white rounded-xl font-bold text-base hover:bg-black transition-all shadow-xl disabled:opacity-50">
                      {submitting ? "Processing..." : "Submit Application"}
                  </button>
              </form>
          </div>
      </div>

      {/* 6. PROJECTS - Final Content Keep */}
      <div className="py-20 max-w-7xl mx-auto px-6">
         <h2 className="text-3xl font-black text-center mb-14 tracking-tight">Industry Portfolio</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.projects?.map((project) => (
               <div key={project._id} className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black bg-purple-50 text-purple-600 px-3 py-1 rounded-full uppercase tracking-widest">Enterprise</span>
                    <h3 className="text-lg font-black mt-4 mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{project.desc}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* 7. FAQ */}
      <div className="py-20 max-w-3xl mx-auto px-6">
         <div className="space-y-3">
            {data.faqs?.map((faq, index) => (
               <div key={faq._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-gray-800">
                     {faq.question}
                     {activeAccordion === index ? <FaIcons.FaChevronUp className="text-purple-600" /> : <FaIcons.FaChevronDown className="text-gray-400" />}
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