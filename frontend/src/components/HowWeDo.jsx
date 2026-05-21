import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

// Visual constants — icons & colors stay fixed
const STEP_ICONS  = [<FaSearch />, <FaPencilRuler />, <FaCode />, <FaRocket />];
const STEP_COLORS = ['bg-indigo-600', 'bg-violet-600', 'bg-blue-600', 'bg-cyan-500'];

const HowWeDo = () => {
  const { content } = useContent();
  const hw = content.howWeDo;
  const steps = hw.steps;

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 overflow-hidden"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">
            {hw.tagline}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {hw.heading}
          </h2>
        </motion.div>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="max-w-5xl mx-auto px-6 hidden md:block">
        <div className="relative flex items-start justify-between gap-0">

          {/* Animated connecting line */}
          <div className="absolute top-8 left-[calc(100%/10)] right-[calc(100%/10)] h-0.5 bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              style={{ originX: 0 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id || i}
              className="flex flex-col items-center text-center flex-1 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.15 }}
            >
              <motion.div
                className="relative mb-4"
                whileHover={{ scale: 1.12, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`w-16 h-16 rounded-2xl ${STEP_COLORS[i % STEP_COLORS.length]} flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white/10`}>
                  {STEP_ICONS[i % STEP_ICONS.length]}
                </div>
                <div className="absolute -top-2 left-[60%] w-5 h-5 rounded-full bg-white text-slate-900 text-[10px] font-black flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </motion.div>

              <h3 className="text-white font-bold text-sm mb-2 leading-snug px-2">
                {step.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed px-3 max-w-[160px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="max-w-md mx-auto px-6 md:hidden">
        <div className="relative ml-8">

          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 overflow-hidden">
            <motion.div
              className="w-full bg-blue-500"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              style={{ originY: 0 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id || i}
              className="relative pl-8 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}
            >
              {/* Dot */}
              <div className={`absolute left-[-6px] top-1 w-3 h-3 rounded-full ${STEP_COLORS[i % STEP_COLORS.length]} ring-2 ring-slate-900`} />

              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${STEP_COLORS[i % STEP_COLORS.length]} text-white text-lg mb-2 shadow`}>
                {STEP_ICONS[i % STEP_ICONS.length]}
              </div>
              <h3 className="text-white font-bold text-sm mb-1">{step.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeDo;
