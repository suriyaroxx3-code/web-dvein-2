import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaBolt,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaMicrochip,
  FaNetworkWired,
  FaShieldAlt,
  FaTimes,
  FaUsers,
} from 'react-icons/fa';
import logo from '../assets/logo.png';
import clientImg from '../assets/client-img.jpg';

const WA_CAREER = '918667363893';

const RECRUITMENT_CARDS = [
  {
    id: 'client-companies',
    title: 'client companies recruitment',
    description: 'Explore openings from partner companies hiring through DVein.',
    image: clientImg,
  },
  {
    id: 'dvein-innovations',
    title: 'DVein innovations recruitment',
    description: 'Apply for roles inside the DVein Innovations team.',
    image: logo,
  },
];

const CareerHub = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    portfolio: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const resetApplicationForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      portfolio: '',
      resume: null,
    });
  };

  const openRecruitment = (card) => {
    setSelectedJob({
      title: card.title,
      description: card.description,
      department: 'Recruitment',
      location: 'DVein Career Hub',
    });
    setActiveTab('details');
    setSubmitStatus(null);
    resetApplicationForm();
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    setIsSubmitting(true);

    const waText = [
      '*Job Application - DVein Innovations*',
      '',
      `*Role:* ${selectedJob.title}`,
      `*Name:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      `*Portfolio:* ${formData.portfolio || 'Not provided'}`,
      '',
      '_Sent from DVein Career Hub_',
    ].join('\n');

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'resume') data.append(key, formData[key]);
      });
      data.append('jobTitle', selectedJob.title);
      if (formData.resume) data.append('resume', formData.resume);
      await fetch('http://localhost:5000/api/public/apply', {
        method: 'POST',
        body: data,
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.warn('Could not save application to backend before opening WhatsApp.', error);
    }

    window.open(`https://wa.me/${WA_CAREER}?text=${encodeURIComponent(waText)}`, '_blank');
    setSubmitStatus('success');
    setTimeout(() => {
      setSubmitStatus(null);
      setSelectedJob(null);
    }, 4000);
    setIsSubmitting(false);
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen pt-24 selection:bg-black selection:text-white overflow-x-hidden flex flex-col items-center">
      <section className="w-full max-w-6xl px-6 py-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900 uppercase">
            Build the <span className="text-black">Future.</span>
          </h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            {RECRUITMENT_CARDS.map(card => (
                <div key={card.id} className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow min-h-[420px] flex flex-col">
                  <div className="h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center mb-6">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="text-slate-900 text-xl">{card.title}</div>
                    <p className="text-slate-500 text-sm mt-4 leading-relaxed">{card.description}</p>
                    <div className="mt-auto pt-8">
                      <button type="button" onClick={() => openRecruitment(card)} className="w-full rounded-xl bg-black px-4 py-3 text-sm text-white">Apply</button>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="w-full py-20 px-6 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-black/10 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=100&w=1200&auto=format&fit=crop" alt="Rich Content" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" />
          </div>
          <div className="text-left space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
              Engineering <br /><span className="text-black">Excellence.</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-sm md:text-base font-medium leading-relaxed">
              <p>Our engineering culture is built on the principles of speed and radical ownership. We do not just write code; we architect digital systems that solve real-world complexities at scale.</p>
              <p>At DVein, you are empowered to lead your own feature sets. From initial design patterns to global deployment, you own the entire lifecycle of the code you ship.</p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                {[
                  { i: <FaMicrochip />, t: 'R&D Focus', d: 'We dedicate time to future frameworks and AI research labs.' },
                  { i: <FaNetworkWired />, t: 'Scalable Nodes', d: 'Systems designed for growth with zero performance leaks.' },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-black text-xl">{item.i}</div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">{item.t}</h4>
                      <p className="text-[11px] text-slate-400">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 px-6 bg-[#f8fafc] flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-12 text-center">OUR DNA</h2>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {[
            { i: <FaBolt />, t: 'DREAM', d: 'Chase the biggest dreams.' },
            { i: <FaShieldAlt />, t: 'DESIGN', d: 'Design for the future.' },
            { i: <FaUsers />, t: 'DELIVER', d: 'Deliver exceptional value.' },
          ].map((item, index) => (
            <div key={index} className="w-full max-w-[280px] p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg text-black mb-6">{item.i}</div>
              <h4 className="font-bold text-xs uppercase mb-2 tracking-widest">{item.t}</h4>
              <p className="text-[11px] text-slate-400 font-medium">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="bg-white w-full max-w-5xl h-auto max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-20 flex flex-col md:flex-row overflow-hidden border border-slate-100">
              <div className="md:hidden flex items-center justify-between p-4 border-b">
                <button onClick={() => setSelectedJob(null)} className="text-slate-400 p-1"><FaTimes size={18} /></button>
                <div className="flex bg-slate-100 p-1 rounded-full scale-90">
                  <button onClick={() => setActiveTab('details')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'details' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}>Mission</button>
                  <button onClick={() => setActiveTab('form')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'form' ? 'bg-white text-black shadow-sm' : 'text-slate-400'}`}>Board</button>
                </div>
              </div>
              <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                <div className={`${activeTab === 'details' ? 'flex' : 'hidden md:flex'} w-full md:w-1/2 flex-col bg-slate-50 overflow-y-auto p-10 md:p-14 border-r border-slate-100 text-left`}>
                  <span className="text-black text-[10px] font-bold uppercase mb-4 block">Briefing</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase underline decoration-black decoration-4 underline-offset-8 leading-tight">{selectedJob.title}</h2>
                  <p className="text-slate-500 text-xs leading-relaxed font-bold border-l-4 border-black pl-6 uppercase tracking-tight">{selectedJob.description}</p>
                </div>
                <div className={`${activeTab === 'form' ? 'flex' : 'hidden md:flex'} w-full md:w-1/2 flex-col bg-white overflow-y-auto p-10 md:p-14`}>
                  {submitStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                      <FaCheckCircle className="text-green-500 text-7xl mb-6 animate-bounce" />
                      <h3 className="text-2xl font-black tracking-tight text-slate-900 uppercase">WhatsApp Opened!</h3>
                      <p className="text-slate-500 text-xs mt-3 font-bold uppercase">Tap Send in WhatsApp to complete</p>
                    </div>
                  ) : (
                    <form onSubmit={handleApplySubmit} className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8 border-b pb-4 uppercase text-slate-900">Boarding Pass</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="FIRST" onChange={event => setFormData({ ...formData, firstName: event.target.value })} />
                        <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="LAST" onChange={event => setFormData({ ...formData, lastName: event.target.value })} />
                      </div>
                      <input required type="email" className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="WORK EMAIL" onChange={event => setFormData({ ...formData, email: event.target.value })} />
                      <input required className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="WHATSAPP" onChange={event => setFormData({ ...formData, phone: event.target.value })} />
                      <input className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="PORTFOLIO" value={formData.portfolio} onChange={event => setFormData({ ...formData, portfolio: event.target.value })} />
                      <label className="flex flex-col items-center justify-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-slate-100 transition-all group">
                        <FaCloudUploadAlt className="text-black text-4xl mb-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-black text-black uppercase text-center">{formData.resume ? formData.resume.name : 'DROP FILE'}</span>
                        <input type="file" onChange={event => setFormData({ ...formData, resume: event.target.files[0] })} className="hidden" />
                      </label>
                      <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-black transition-all disabled:opacity-50">
                        {isSubmitting ? 'Opening WhatsApp...' : 'Apply via WhatsApp'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full py-10 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">(c) 2026 DVein Innovations - Career Hub</p>
      </footer>
    </div>
  );
};

export default CareerHub;
