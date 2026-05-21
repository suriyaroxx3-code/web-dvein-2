import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMicrochip, FaCode, FaTools, FaCloudDownloadAlt,
  FaLightbulb, FaCheckCircle, FaProjectDiagram, FaGlobe,
  FaSatellite, FaBolt, FaMemory, FaRocket
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import { useContent } from '../context/ContentContext';

// Visual constants — icons & colors stay fixed
const STAT_ICONS    = [<FaMicrochip />, <FaCode />, <FaSatellite />, <FaLightbulb />];
const ROADMAP_ICONS  = [<FaLightbulb />, <FaProjectDiagram />, <FaTools />, <FaGlobe />];
const ROADMAP_COLORS = ['bg-indigo-500', 'bg-violet-600', 'bg-blue-600', 'bg-cyan-600'];

const StudentProjects = () => {
  const { content } = useContent();
  const sp = content.studentProjects;

  const heroLines = sp.hero.headline.split('\\n');
  const ctaLines  = sp.cta.heading.split('\\n');
  const hwLines   = sp.hardware.heading.split('\\n');
  const waLink    = `https://wa.me/${sp.cta.whatsappNumber}?text=${encodeURIComponent(sp.cta.whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-16 overflow-x-hidden selection:bg-indigo-600 selection:text-white">

      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-8 border border-indigo-100">
            {sp.hero.badge}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight uppercase">
            {heroLines.map((line, i) => (
              <React.Fragment key={i}>{line}{i < heroLines.length - 1 && <br />}</React.Fragment>
            ))}
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-12">
            {sp.hero.description}
          </p>
          <div className="flex justify-center gap-4">
            <a href={sp.hero.pdfLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 btn-brand px-10 py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-xl transform hover:-translate-y-1">
              <FaCloudDownloadAlt className="text-xl" /> {sp.hero.pdfBtn}
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-32 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {sp.stats.map((stat, i) => (
          <motion.div key={stat._id} whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all group">
            <div className="text-2xl text-indigo-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
              {STAT_ICONS[i % STAT_ICONS.length]}
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.count}</h3>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* 3. WHY CHOOSE DVEIN */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">
              {sp.whyHeading}
            </h2>
            <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sp.whyFeatures.map((f) => (
              <div key={f._id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <FaCheckCircle />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-tight">{f.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-bold">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HARDWARE INVENTORY */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-8 tracking-tight leading-tight">
              {hwLines.map((line, i) => (
                <React.Fragment key={i}>{line}{i < hwLines.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {sp.hardware.nodes.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 font-bold text-[9px] uppercase tracking-widest text-indigo-300 group hover:bg-indigo-600 hover:text-white transition-all">
                  <FaBolt className="group-hover:animate-pulse" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={sp.hardware.image} className="rounded-[3rem] border-2 border-slate-700 shadow-2xl h-80 w-full object-cover" alt="Hardware Lab" />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                <FaMemory />
              </div>
              <div className="text-left text-slate-900">
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Architecture</p>
                <p className="font-extrabold text-[11px] uppercase">{sp.hardware.badgeText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT REPOSITORY */}
      <section id="repository" className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">{sp.repository.heading}</h2>
          <p className="text-slate-400 font-extrabold uppercase text-[10px] tracking-[0.4em]">{sp.repository.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sp.repository.projects.map((project) => (
            <motion.div key={project._id}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col group h-full">
              <div className="h-56 overflow-hidden relative">
                <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/95 px-3 py-1.5 rounded-lg text-[9px] font-extrabold text-indigo-600 uppercase shadow-sm border border-indigo-50">
                    {project.category} node
                  </span>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">{project.title}</h3>
                <p className="text-[13px] text-slate-500 font-bold mb-6 leading-relaxed border-l-2 border-indigo-100 pl-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t, idx) => (
                    <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-tight">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. ROADMAP */}
      <AnimatedRoadmap
        title={sp.roadmap.title}
        subtitle={sp.roadmap.subtitle}
        accent="bg-indigo-400"
        steps={sp.roadmap.steps.map((step, i) => ({
          icon:  ROADMAP_ICONS[i % ROADMAP_ICONS.length],
          label: step.label,
          desc:  step.desc,
          color: ROADMAP_COLORS[i % ROADMAP_COLORS.length],
        }))}
      />

      {/* 7. CTA */}
      <section className="py-40 text-center bg-white relative overflow-hidden">
        <motion.div whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
          className="max-w-4xl mx-auto bg-slate-900 p-20 rounded-[4rem] shadow-4xl relative overflow-hidden text-white">
          <FaRocket className="text-[15rem] text-indigo-600/10 absolute -top-20 -right-20 -rotate-45" />
          <h2 className="text-4xl md:text-5xl font-extrabold mb-10 uppercase tracking-tighter">
            {ctaLines.map((line, i) => (
              <React.Fragment key={i}>
                {i === 0 ? line : <span className="text-white">{line}</span>}
                {i < ctaLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 font-bold uppercase text-xs mb-12 tracking-widest">
            {sp.cta.description}
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-block bg-indigo-600 text-white px-16 py-6 rounded-2xl font-extrabold text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-2">
            {sp.cta.buttonText}
          </a>
        </motion.div>
      </section>

    </div>
  );
};

export default StudentProjects;
