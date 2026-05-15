import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';

const steps = [
  { id: '01', title: 'Discovery', icon: FaSearch, desc: 'We analyze your requirements and brainstorm the best technical approach.' },
  { id: '02', title: 'Design', icon: FaPencilRuler, desc: 'Creating intuitive UI/UX prototypes that align with your brand identity.' },
  { id: '03', title: 'Development', icon: FaCode, desc: 'Our experts build robust, scalable solutions using cutting-edge technology.' },
  { id: '04', title: 'Launch', icon: FaRocket, desc: 'Testing, deployment, and post-launch support to ensure success.' },
];

const HowWeDo = () => {
  return (
    <section className="py-24 ai-gradient-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 relative z-10">
          <span className="text-dveinBlue font-bold tracking-widest uppercase text-xs bg-white/50 px-3 py-1 rounded-full border border-dveinBlue/20">Our Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 font-heading">How We Make It Happen</h2>
        </div>

        <div className="relative">
          
          {/* CONNECTIVITY LINES (The Magic) */}
          {/* Desktop Horizontal Line */}
          <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-dveinBlue/30 to-transparent -z-0"></div>
          
          {/* Mobile Vertical Line */}
          <div className="block lg:hidden absolute top-0 left-8 h-full w-0.5 bg-gradient-to-b from-dveinBlue/10 via-dveinBlue/30 to-dveinBlue/10 -z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative z-10 flex flex-col items-center lg:items-center text-left lg:text-center pl-20 lg:pl-0"
              >
                {/* Icon Circle (Centered on mobile line) */}
                <div className="absolute left-0 lg:static w-16 h-16 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center mb-6 shadow-lg group hover:border-dveinBlue transition-colors z-10">
                  <step.icon className="text-2xl text-gray-400 group-hover:text-dveinBlue transition-colors" />
                </div>
                
                {/* Content */}
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/50 hover:shadow-xl hover:bg-white transition-all w-full">
                  <h3 className="text-4xl font-bold text-gray-100 absolute top-4 right-4 select-none">{step.id}</h3>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeDo;