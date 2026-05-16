import React from 'react';
import TopBar from '../components/common/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import WelcomeSection from '../components/WelcomeSection';
import HowWeDo from '../components/HowWeDo';
import WhyChooseUs from '../components/WhyChooseUs';
import ServiceHighlights from '../components/ServiceHighlights';
import Stats from '../components/Stats';
import TrainingHighlights from '../components/TrainingHighlights';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import WhatsAppBtn from '../components/common/WhatsAppBtn';

const Home = () => {
  return (
    // FIX 1: Removed 'overflow-x-hidden' from here (It breaks sticky)
    <div className="font-sans text-gray-900 ai-gradient-bg">
      
      {/* 1. TopBar (Normal Scroll - Will go up) */}
      <div className="w-full bg-white z-50 border-b border-gray-100">
        <TopBar />
      </div>

      {/* 2. Navbar (Sticky - Will stick to top when TopBar is gone) */}
      <div className="sticky top-0 z-[60]">
         <Navbar />
      </div>

      {/* 3. Main Content (Added overflow-x-hidden HERE instead) */}
      <main className="overflow-x-hidden"> 
        <Hero />
        <Clients />
        <WelcomeSection />
        <HowWeDo />          
        <WhyChooseUs />
        <ServiceHighlights />
        <Stats />
        <TrainingHighlights />
        <Testimonials />
      </main>
      
      <Footer />
      <WhatsAppBtn />
    </div>
  );
};

export default Home;