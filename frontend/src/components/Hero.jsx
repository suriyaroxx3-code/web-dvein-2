import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const Hero = () => {
  const { content } = useContent();
  const slides = content.hero.slides;
  const [current, setCurrent] = useState(0);

  // Reset index if slides count changes
  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[85vh] md:h-[700px] overflow-hidden flex items-center pb-12 md:pb-24 font-sans bg-gray-900">

      {/* Background Image Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img
            src={slides[current].image}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          key={current + "-text"}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl md:pl-4"
        >
          {/* Tag */}
          <span className="inline-block text-white font-extrabold tracking-widest uppercase text-xs mb-6 bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] px-4 py-2 rounded-full border border-white/30">
            {slides[current].smallTag}
          </span>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 font-heading drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
            style={{ color: '#ffffff' }}
          >
            {slides[current].title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white mb-10 leading-relaxed font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {slides[current].description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to={slides[current].primaryLink}
              className="btn-brand px-8 py-3 rounded-lg font-semibold text-base shadow-lg transition-all hover:-translate-y-1"
            >
              {slides[current].primaryBtn}
            </Link>
            <Link
              to={slides[current].secondaryLink}
              className="px-8 py-3 rounded-lg font-semibold text-base border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all hover:-translate-y-1"
            >
              {slides[current].secondaryBtn}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
