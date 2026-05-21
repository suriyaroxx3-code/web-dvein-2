import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaMicrochip, FaCode, FaTools, FaCloudDownloadAlt,
  FaLightbulb, FaCheckCircle, FaProjectDiagram, FaGlobe,
  FaSatellite, FaBolt, FaMemory, FaRocket
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import ImageSlideshow from '../components/ImageSlideshow';
import { useContent } from '../context/ContentContext';

// Visual constants — icons & colors stay fixed
const STAT_ICONS    = [<FaMicrochip />, <FaCode />, <FaSatellite />, <FaLightbulb />];
const ROADMAP_ICONS  = [<FaLightbulb />, <FaProjectDiagram />, <FaTools />, <FaGlobe />];
const ROADMAP_COLORS = ['bg-indigo-500', 'bg-violet-600', 'bg-blue-600', 'bg-cyan-600'];

const StudentProjects = () => {
  const { content } = useContent();
  const sp = content.studentProjects;
  const heroLines = sp.hero.headline.split('\n');

  const [isSyncing, setIsSyncing] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);

  const nodeFilters = [
    { label: 'All Nodes',      value: 'all' },
    { label: 'Software Node',  value: 'software' },
    { label: 'Hardware Node',  value: 'hardware' },
    { label: 'Embedded Node',  value: 'embedded' },
  ];

  useEffect(() => {
    // Initializing high-performance logic nodes
    const timer = setTimeout(() => setIsSyncing(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. PERFORMANCE METRICS (Compact Enterprise Layout) ---
  const projectStats = [
    { label: "Hardware Nodes", count: "250+", icon: <FaMicrochip /> },
    { label: "Software Clusters", count: "190+", icon: <FaCode /> },
    { label: "IoT Mesh Systems", count: "110+", icon: <FaSatellite /> },
    { label: "Patent Drafts", count: "30+", icon: <FaLightbulb /> }
  ];

  // --- 2. MASSIVE CONTENT: WHY DVEIN FOR PROJECTS (500+ Line Depth) ---
  const whyBestFeatures = [
    {
      t: "Industrial Component Inventory",
      d: "Access production-grade hardware nodes like ESP32-S3, STM32 Nucleo, and industrial sensors. Build with actual hardware used in factories."
    },
    {
      t: "Enterprise Full-Stack Integration",
      d: "Our unique methodology focuses on connecting physical hardware to massive cloud clusters using MERN stack and MQTT protocols for real-time telemetry."
    },
    {
      t: "Production-Grade Prototyping",
      d: "Beyond breadboards. We guide students through professional PCB design, custom 3D enclosures, and industrial wiring standards for market-ready products."
    },
    {
      t: "Secure Deployment Logic",
      d: "Every software node is built with MVC architecture, JWT-based security sync, and scalable database management."
    },
    {
      t: "IP & Patent Mentorship",
      d: "Innovative projects are mentored for potential patent drafting, ensuring your intellectual property meets industrial standards for global commercialization."
    },
    {
      t: "Hybrid System Architecture",
      d: "Learn to architect complex systems that involve seamless cross-platform communication between mobile apps, web dashboards, and embedded nodes."
    }
  ];

  // --- 3. REPOSITORY DATA (Integrated Multi-Domain Projects) ---
  const projects = [
    {
      id: 1,
      category: 'software',
      title: "AI based Smart Medicine Remainder Android Application",
      student: "Software Development Batch",
      desc: "•Smart Reminders • Medicine Tracking • Missed Dose Alerts • Caregiver Notifications • Health Dashboard",
      tools: [ "React Native","FastAPI","PostgreSQL","Twilio API","Expo Notifications" ],
      images: [
        "/project-images/ai-medicine/img1.jpg",
        "/project-images/ai-medicine/img2.jpg",
        "/project-images/ai-medicine/img3.jpg",
        "/project-images/ai-medicine/img4.jpg",
        "/project-images/ai-medicine/img5.jpg",
        "/project-images/ai-medicine/img6.jpg",
        "/project-images/ai-medicine/img7.jpg",
        "/project-images/ai-medicine/img8.jpg",
        "/project-images/ai-medicine/img9.jpg",
      ]
    },
    {
      id: 2,
      category: 'hardware',
      title: "Crowd Safety Application based on Real Time Metro Station Monitoring",
      student: "Hardware & IoT Batch",
      desc: "•Live Crowd Detection • Real-Time Alerts  •Safety Threshold Monitoring •SMS Notifications •Analytics Dashboard •Automated Emergency Indications",
      tools: ["Arduino Uno","I2C LCD Display","Buzzer","LED Indicators","Camera Module","React Native","FastAPI","OpenCV","Twilio API","Arduino IDE","Serial Communication"],
      images: [
        "/project-images/crowd-safety/img1.jpg",
        "/project-images/crowd-safety/img2.jpg",
        "/project-images/crowd-safety/img3.jpg",
        "/project-images/crowd-safety/img4.jpg",
        "/project-images/crowd-safety/img5.jpg",
        "/project-images/crowd-safety/img6.jpg",
        "/project-images/crowd-safety/img7.jpg",
        "/project-images/crowd-safety/img8.jpg",
      ]
    },
    {
      id: 3,
      category: 'embedded',
      title: "Smart Ring Application for Health Monitoring",
      student: "Embedded Systems Batch",
      desc: "•Yoga Posture Tracking • Activity Monitoring • Breathing Analysis • Real-Time Health Insights • Smart Notifications • Progress Analytics",
      tools: ["Smart Sensor Ring", "Motion Sensors", "Bluetooth Module", "Health Monitoring Sensors", "React Native", "FastAPI", "Python", "IoT Sensors", "Bluetooth Communication", "Cloud Analytics"],
      images: [
        "/project-images/smart-ring/img1.jpg",
        "/project-images/smart-ring/img2.jpg",
        "/project-images/smart-ring/img3.jpg",
        "/project-images/smart-ring/img4.jpg",
        "/project-images/smart-ring/img5.jpg",
      ]
    },
    {
      id: 4,
      category: 'hardware',
      title: "Fingerprint and iris voting system",
      student: "Hardware Security Batch",
      desc: " •Facial Recognition Authentication •Secure Vote Casting •Automated Voter Verification •Real-Time LCD Guidance System •Audio & Visual Alert System",
      tools: ["ESP32-CAM Module","ESP32 DevKit V1","16x2 LCD Display with I2C Module","Push Buttons","Active Buzzer","LED Indicators","OV2640 Camera Sensor"],
      images: [
        "/project-images/iris-voting/img1.jpg",
        "/project-images/iris-voting/img2.jpg",
      ]
    },
    {
      id: 5,
      category: 'software',
      title: "Maternal Health Tracker",
      student: "Software Development Batch",
      desc: " •Maternal Health Monitoring System •Real-Time Body Temperature Tracking •Automatic Fall Detection & Emergency Alerts •BLE-Based Mobile App Connectivity •Doctor & Patient Real-Time Monitoring Dashboard",
      tools: ["ESP32 Development Board","MAX30102 Sensor","MPU6050 Sensor","Temperature Sensor","Li-ion Battery","React Native","Spring Boot","MySQL Database"],
      images: [
        "/project-images/maternal-health/img1.jpg",
        "/project-images/maternal-health/img2.jpg",
        "/project-images/maternal-health/img3.jpg",
        "/project-images/maternal-health/img4.jpg",
        "/project-images/maternal-health/img5.jpg",
        "/project-images/maternal-health/img6.jpg",
      ]
    },
    {
      id: 6,
      category: 'embedded',
      title: "Smart Plant Monitoring system using Raspberry pi and ESP32",
      student: "Embedded Systems Batch",
      desc: "•Dynamic Product Catalog System •Secure UPI Payment Verification •Automated WhatsApp Order Routing •Hyper-Local Multi-State SEO Optimization •Fully Responsive Cross-Browser Design",
      tools: ["React.js","TailwindCSS","FramerMotion","Node.js","Express.js","MongoDB Atlas"],
      images: [
        "/project-images/smart-plant/img1.jpg",
        "/project-images/smart-plant/img2.jpg",
      ]
    },
    {
      id: 7,
      category: 'hardware',
      title: "Intelligent Mobility and Safety Assistance System for Visually Impaired Individuals",
      student: "Hardware & AI Batch",
      desc: "•Real-Time Object Detection •Face Recognition System •OCR-Based Text Reading •Voice Command Navigation •Bluetooth Audio Assistance",
      tools: ["Raspberry Pi", "Python", "TensorFlow", "Ultralytics", "EasyOCR", "Pyttsx3", "SpeechRecognition"],
      images: [
        "/project-images/safety-assist/img1.jpg",
      ]
    },
    {
      id: 8,
      category: 'embedded',
      title: "Smart Traffic Accident Hotspot Prediction and Prevention System",
      student: "Embedded & Web Batch",
      desc: "•Real-Time Safety Monitoring • Emergency Alerts • Sensor-Based Detection • Live Dashboard • Automated Notifications • Risk Analysis",
      tools: [" Arduino/ESP32","Smoke Sensor","Temperature Sensor","Gas Sensor","Buzzer","LED Indicators","FastAPI","React","IoT Sensors","Arduino IDE","Cloud Monitoring Systems"],
      images: [
        "/project-images/traffic-accidents/img1.png",
        "/project-images/traffic-accidents/img2.png",
        "/project-images/traffic-accidents/img3.png",
        "/project-images/traffic-accidents/img4.png",
        "/project-images/traffic-accidents/img5.png",
        "/project-images/traffic-accidents/img6.png",
      ]
    }
  ];

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

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-32 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {sp.stats.map((stat, i) => (
          <motion.div key={stat._id} whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all group">
            <div className="text-3xl font-black text-indigo-600 mb-2">{stat.count}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* WHY DVein */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-12">{sp.whyHeading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sp.whyFeatures.map((f, i) => (
            <motion.div key={f._id} whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5">
                <FaCheckCircle />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECT REPOSITORY */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4">{sp.repository.heading}</h2>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-12">{sp.repository.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sp.repository.projects.map((proj) => (
            <motion.div key={proj._id} whileHover={{ y: -6 }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="h-48 overflow-hidden">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3 block">{proj.category}</span>
                <h3 className="font-bold text-slate-900 mb-2">{proj.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tools.map((t, i) => (
                    <span key={i} className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ROADMAP */}
      <AnimatedRoadmap
        title={sp.roadmap.title}
        subtitle={sp.roadmap.subtitle}
        accent="bg-indigo-500"
        steps={sp.roadmap.steps.map(s => ({ label: s.label, desc: s.desc, color: 'bg-indigo-600' }))}
      />

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-black text-slate-900 mb-4">{sp.cta.heading}</h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-10">{sp.cta.description}</p>
          <button
            onClick={() => window.open(`https://wa.me/${sp.cta.whatsappNumber}?text=${encodeURIComponent(sp.cta.whatsappMessage)}`, '_blank')}
            className="btn-brand px-10 py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-xl inline-flex items-center gap-3"
          >
            <FaProjectDiagram /> {sp.cta.buttonText}
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default StudentProjects;
