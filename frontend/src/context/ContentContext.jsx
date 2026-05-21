import React, { createContext, useContext, useState } from 'react';

export const defaultContent = {
  // ─── HOME PAGE ────────────────────────────────────────────────────────────
  hero: {
    slides: [
      { id: 1, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=100&w=2070&auto=format&fit=crop", smallTag: "Welcome to DVein Innovations", title: "Empowering Innovation through Technology", description: "Your partner for custom software solutions and engineering training.", primaryBtn: "Explore Services", primaryLink: "/student-projects", secondaryBtn: "Contact Us", secondaryLink: "/contact" },
      { id: 2, image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=100&w=2070&auto=format&fit=crop", smallTag: "Software Solutions", title: "Custom Software built for Business Growth", description: "We build digital ecosystems. From Web and Mobile Apps to AI/ML solutions.", primaryBtn: "View Solutions", primaryLink: "/services/software", secondaryBtn: "Get a Quote", secondaryLink: "/contact" },
      { id: 3, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=2070&auto=format&fit=crop", smallTag: "Training and Development", title: "Shaping Future Tech Leaders", description: "Industry-relevant training programs designed by experts for students.", primaryBtn: "View Courses", primaryLink: "/services/courses", secondaryBtn: "Apply Internship", secondaryLink: "/register" }
    ]
  },
  welcome: {
    tagline: "Who We Are",
    heading: "Welcome To DVein Innovations",
    paragraph: "We are a dynamic team of passionate tech professionals and educators. We don't just build software; we build careers. Our mission is to bridge the gap between Industry Requirements and Academic Learning.",
    ctaText: "Read Our Story",
    ctaLink: "/our-story",
    card1Title: "Software Development",
    card1Desc: "Building scalable Web & Mobile applications, AI solutions, and Cloud infrastructure for modern businesses.",
    card2Title: "Skill Development",
    card2Desc: "Providing hands-on internships and industry-standard training to shape the next generation of engineers."
  },
  stats: [
    { id: 1, name: 'Projects Completed', value: '50+' },
    { id: 2, name: 'Students Trained',   value: '200+' },
    { id: 3, name: 'Happy Clients',      value: '20+' },
    { id: 4, name: 'Years of Innovation',value: '2+' }
  ],
  howWeDo: {
    tagline: "Our Process",
    heading: "How We Make It Happen",
    steps: [
      { id: '01', title: 'Discovery',   desc: 'We analyze your requirements and brainstorm the best technical approach.' },
      { id: '02', title: 'Design',      desc: 'Creating intuitive UI/UX prototypes that align with your brand identity.' },
      { id: '03', title: 'Development', desc: 'Our experts build robust, scalable solutions using cutting-edge technology.' },
      { id: '04', title: 'Launch',      desc: 'Testing, deployment, and post-launch support to ensure success.' }
    ]
  },
  whyChooseUs: {
    heading: "Why Choose DVein?",
    subheading: "Our journey has just begun, and we're excited to grow alongside our clients and learners.",
    features: [
      { name: 'Innovative Approach',        desc: 'We believe in learning by doing and delivering value through every line of code.' },
      { name: 'Industry-Relevant Training', desc: 'Curriculum designed by experts to meet current market demands.' },
      { name: 'Student & Client-Focused',   desc: 'Dedicated support for both business growth and student career development.' },
      { name: 'Affordable Solutions',       desc: 'Top-tier tech solutions and education at accessible price points.' }
    ]
  },
  testimonials: {
    heading: "Loved by Clients & Students",
    googleRating: "Rated 5.0 on Google Reviews",
    reviews: [
      { id: 1, name: "Sriram K.",     role: "Data Science Intern",  text: "The internship gave me practical exposure to real datasets. I contributed to an actual AI project, not just dummy tasks.", rating: 5 },
      { id: 2, name: "Divya R.",      role: "Client - E-commerce",  text: "DVein team delivered our mobile app way ahead of schedule. The UI is stunning and exactly what we envisioned.", rating: 5 },
      { id: 3, name: "Arun Vijay",    role: "Full Stack Student",   text: "Best place to learn MERN stack. Mentors are working professionals, teaching industry standards.", rating: 5 },
      { id: 4, name: "Priya M.",      role: "Client - Healthcare",  text: "They built a complex patient management system for us. Very secure and scalable.", rating: 5 },
      { id: 5, name: "Karthik S.",    role: "Java Trainee",         text: "Started with zero knowledge, now I can build full applications. The hands-on approach changed everything for me.", rating: 4 },
      { id: 6, name: "TechSolutions", role: "Corporate Client",     text: "Reliable development partner. They handle our cloud infrastructure efficiently.", rating: 5 }
    ]
  },
  footer: {
    address: "Alpha City IT Park, No.25, OMR,\nNavalur, Chennai - 600130",
    phone: "+91 95001 81230",
    email: "info@dveininnovations.com",
    copyright: "DVein Innovations. All Rights Reserved."
  },

  // ─── INTERNSHIPS PAGE ─────────────────────────────────────────────────────
  internships: {
    hero: {
      badge: "Internship Program 2025",
      headline: "Stop Learning Syntax.\nStart Building Projects.",
      description: "Join the internship program designed by IT Professionals. Mastering the tech through intense execution and real-world deployment.",
      applyBtn: "Apply Now",
      exploreBtn: "Explore Tracks"
    },
    marquee: "200+ Students • 100+ Projects • 20+ Courses •",
    domainsHeading: "Choose Your Internships",
    domainsSubheading: "Great courses built for high-performance careers.",
    domains: [
      { _id: 1,  title: "Full Stack Java",               iconName: "FaCode",            color: "text-blue-600",    desc: "Build enterprise-grade applications with Java, Spring Boot, REST APIs, and scalable backend systems.",      skills: ["Java", "Spring Boot", "REST API", "MySQL"] },
      { _id: 2,  title: "Full Stack Python",              iconName: "FaCode",            color: "text-green-600",   desc: "End-to-end Python development using Django, FastAPI, and modern frontend integration.",                   skills: ["Python", "Django", "FastAPI", "PostgreSQL"] },
      { _id: 3,  title: "Data Science and AI",            iconName: "FaBrain",           color: "text-purple-600",  desc: "Explore data pipelines, statistical modelling, and AI-driven applications using Python and real datasets.", skills: ["Python", "Pandas", "Statistics", "Visualization"] },
      { _id: 4,  title: "AI & Machine Learning",          iconName: "FaRobot",           color: "text-indigo-600",  desc: "Supervised, unsupervised, and deep learning models built for real production deployments.",                skills: ["TensorFlow", "PyTorch", "Scikit-learn", "LLMs"] },
      { _id: 5,  title: "Data Analytics",                 iconName: "FaChartBar",        color: "text-teal-600",    desc: "Transform raw data into actionable insights using SQL, Excel, Power BI, and Tableau.",                   skills: ["SQL", "Excel", "Power BI", "Tableau"] },
      { _id: 6,  title: "Business Analytics",             iconName: "FaChartLine",       color: "text-orange-600",  desc: "Drive strategic decisions through data-driven business modelling, KPIs, and BI dashboards.",             skills: ["Strategy", "BI Tools", "KPIs", "Reporting"] },
      { _id: 7,  title: "DevOps",                         iconName: "FaCogs",            color: "text-slate-600",   desc: "CI/CD pipelines, containerisation, and infrastructure automation for modern software delivery.",         skills: ["Docker", "CI/CD", "Kubernetes", "Jenkins"] },
      { _id: 8,  title: "Cloud Computing",                iconName: "FaCloud",           color: "text-sky-600",     desc: "Deploy, scale, and manage applications on AWS, Azure, and GCP with cloud-native best practices.",        skills: ["AWS", "Azure", "GCP", "Terraform"] },
      { _id: 9,  title: "MERN Stack",                     iconName: "FaLayerGroup",      color: "text-blue-500",    desc: "Full-stack web apps with MongoDB, Express, React, and Node.js in a cohesive modern workflow.",           skills: ["MongoDB", "Express", "React", "Node.js"] },
      { _id: 10, title: "UI/UX Design and Prototyping",   iconName: "FaDraftingCompass", color: "text-pink-600",    desc: "Design intuitive user interfaces and interactive prototypes using Figma and design system principles.",    skills: ["Figma", "Prototyping", "Wireframes", "User Research"] },
      { _id: 11, title: "Web Development",                iconName: "FaGlobe",           color: "text-blue-600",    desc: "Core and advanced web development covering HTML, CSS, JavaScript, and modern frameworks.",               skills: ["HTML/CSS", "JavaScript", "React", "Responsive"] },
      { _id: 12, title: "IOT",                            iconName: "FaMicrochip",       color: "text-green-600",   desc: "Connect physical devices to the internet with sensor integration, protocols, and cloud IoT platforms.",   skills: ["Arduino", "MQTT", "Sensors", "Cloud IoT"] },
      { _id: 13, title: "Embedded Systems",               iconName: "FaMemory",          color: "text-amber-600",   desc: "Program microcontrollers, real-time systems, and low-level hardware interfaces for embedded applications.", skills: ["C/C++", "Microcontrollers", "RTOS", "PCB"] },
      { _id: 14, title: "Cybersecurity",                  iconName: "FaShieldAlt",       color: "text-red-600",     desc: "Ethical hacking, threat analysis, and secure system design following OWASP and industry standards.",      skills: ["Ethical Hacking", "OWASP", "Pen Testing", "SIEM"] },
      { _id: 15, title: "Big Data Analytics",             iconName: "FaDatabase",        color: "text-violet-600",  desc: "Process and analyse massive datasets using Hadoop, Spark, and distributed computing frameworks.",         skills: ["Hadoop", "Spark", "Hive", "Kafka"] },
      { _id: 16, title: "HR - Operations",                iconName: "FaUserTie",         color: "text-slate-600",   desc: "Streamline HR workflows, talent acquisition, and workforce management with modern HR tools.",            skills: ["Talent Acquisition", "HRMS", "Onboarding", "Compliance"] },
      { _id: 17, title: "HR - Marketing",                 iconName: "FaBullhorn",        color: "text-rose-600",    desc: "Employer branding, talent marketing strategies, and HR communication for modern organisations.",         skills: ["Employer Branding", "Recruitment Mktg", "LinkedIn", "Analytics"] },
      { _id: 18, title: "HR - Finance & Accounting",      iconName: "FaMoneyBillWave",   color: "text-emerald-600", desc: "Payroll management, financial reporting, and accounting fundamentals for HR professionals.",            skills: ["Payroll", "Tally", "Budgeting", "Compliance"] },
      { _id: 19, title: "Digital Marketing",              iconName: "FaBullseye",        color: "text-orange-500",  desc: "SEO, paid advertising, social media strategy, and analytics for impactful digital campaigns.",          skills: ["SEO", "Google Ads", "Social Media", "Analytics"] },
      { _id: 20, title: "Software Testing",               iconName: "FaBug",             color: "text-cyan-600",    desc: "Manual and automated testing, test case design, and QA methodologies for production-grade software.",   skills: ["Manual Testing", "Selenium", "Jest", "Test Plans"] }
    ],
    curriculum: {
      heading: "What will you master?",
      subheading: "Our curriculum is engineered backward from industry hiring requirements.",
      web: [
        { _id: 1, week: "Week 1-2", title: "HTML, CSS",           desc: "JavaScript V8 Engine internals, Async architecture, and DOM manipulation." },
        { _id: 2, week: "Week 3-5", title: "JAVASCRIPT",          desc: "Building scalable APIs with Node.js, Express, and Database Design patterns." },
        { _id: 3, week: "Week 6-8", title: "BOOTSTRAP",           desc: "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2." }
      ],
      ai: [
        { _id: 1, week: "Week 1-2", title: "Python & Statistics", desc: "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML." },
        { _id: 2, week: "Week 3-5", title: "Machine Learning",    desc: "Supervised Learning, Scikit-learn, and model evaluation metrics." },
        { _id: 3, week: "Week 6-8", title: "Deep Learning & LLMs",desc: "Neural Networks, Transformers, and building RAG applications." }
      ]
    },
    projects: {
      heading: "Industry Portfolio",
      items: [
        { _id: 1, title: "AI-Powered SaaS",  tag: "Full Stack", desc: "Build a subscription-based SaaS platform integrated with OpenAI API." },
        { _id: 2, title: "Crypto Exchange",   tag: "Web3",       desc: "Real-time trading engine with WebSockets and high-frequency data handling." },
        { _id: 3, title: "Autonomous Agents", tag: "AI/ML",      desc: "Create AI agents that can browse the web and perform tasks automatically." }
      ]
    },
    faqs: [
      { _id: 1, question: "Is this beginner friendly?",        answer: "Yes, but be ready to work hard. We start from zero but move fast." },
      { _id: 2, question: "Do you provide placement support?", answer: "We have 20+ hiring partners. If you clear our assessments, we refer you directly." },
      { _id: 3, question: "What is the duration?",             answer: "The internship class runs for 1 Month to 3 Months." }
    ]
  },

  // ─── PRODUCTS PAGE ────────────────────────────────────────────────────────
  products: {
    hero: {
      badge: "Product Hub Node Activated",
      headline: "Future-Proof\nProduct Disruptors",
      description: "We build high-performance software nodes designed for enterprise stability. Deploy disruptive kernels globally with zero-latency sync.",
      exploreBtn: "Explore Inventory",
      docsBtn: "Technical Docs"
    },
    dna: {
      heading: "Core Architecture",
      items: [
        { title: "Quantum Sync",      desc: "Low-latency data kernels for high-speed enterprise nodes synchronized globally." },
        { title: "Zero-Trust Mesh",   desc: "Multi-layered identity validation nodes ensure secure cluster environments." },
        { title: "Immutable Sync",    desc: "System logs mirrored on private ledgers for audit accuracy." }
      ]
    },
    roadmap: {
      title: "Deployment Lifecycle",
      subtitle: "Agile Activation Sync Nodes — from discovery to global deployment.",
      steps: [
        { label: "Technical Discovery", desc: "Identifying scaling bottlenecks in current tech stacks." },
        { label: "Architecture Build",  desc: "Designing customized clusters for production load." },
        { label: "Mesh Integration",    desc: "Securing nodes and performing vulnerability scans." },
        { label: "Global Activation",   desc: "Zero-downtime deployment across global nodes." }
      ]
    },
    reviews: {
      heading: "Loved by Global Partners",
      googleBadge: "Rated 5.0 Google Reviews",
      items: [
        { id: 1, name: "Sriram K.",  role: "Intern Node",       text: "The internship gave me practical exposure to real datasets.", rating: 5 },
        { id: 2, name: "Divya R.",   role: "Enterprise Client",  text: "DVein delivered our mobile node ahead of schedule.", rating: 5 },
        { id: 3, name: "Arun Vijay", role: "Full Stack Student", text: "Mentors teach real industry standards.", rating: 5 }
      ]
    },
    faq: {
      heading: "Product Logs",
      items: [
        { q: "Is Cluster Redundancy Standard?", a: "Every enterprise node comes with automated backups by default." },
        { q: "Custom AI Cluster Sync?",         a: "Nodes support seamless third-party AI/ML integration." },
        { q: "Activation Cycle Window?",        a: "Full activation usually takes less than 48 hours." }
      ]
    }
  },

  // ─── STUDENT PROJECTS PAGE ────────────────────────────────────────────────
  studentProjects: {
    hero: {
      badge: "Innovation Hub Activated",
      headline: "Engineering The Future.\nOne Project Node at a Time.",
      description: "Bridging the gap between theoretical syntax and physical deployment. Our student ecosystem is architected for industrial mastery.",
      pdfBtn: "Download Project Ledger (PDF)",
      pdfLink: "/DVein_Projects_List.pdf"
    },
    stats: [
      { _id: 1, label: "Hardware Nodes",    count: "250+" },
      { _id: 2, label: "Software Clusters", count: "190+" },
      { _id: 3, label: "IoT Mesh Systems",  count: "110+" },
      { _id: 4, label: "Patent Drafts",     count: "30+"  }
    ],
    whyHeading: "Why Students Choose DVein.",
    whyFeatures: [
      { _id: 1, title: "Industrial Component Inventory",    desc: "Access production-grade hardware nodes like ESP32-S3, STM32 Nucleo, and industrial sensors. Build with actual hardware used in factories." },
      { _id: 2, title: "Enterprise Full-Stack Integration", desc: "Our unique methodology focuses on connecting physical hardware to massive cloud clusters using MERN stack and MQTT protocols for real-time telemetry." },
      { _id: 3, title: "Production-Grade Prototyping",      desc: "Beyond breadboards. We guide students through professional PCB design, custom 3D enclosures, and industrial wiring standards for market-ready products." },
      { _id: 4, title: "Secure Deployment Logic",           desc: "Every software node is built with MVC architecture, JWT-based security sync, and scalable database management." },
      { _id: 5, title: "IP & Patent Mentorship",            desc: "Innovative projects are mentored for potential patent drafting, ensuring your intellectual property meets industrial standards for global commercialization." },
      { _id: 6, title: "Hybrid System Architecture",        desc: "Learn to architect complex systems that involve seamless cross-platform communication between mobile apps, web dashboards, and embedded nodes." }
    ],
    hardware: {
      heading: "The Hardware\nNode Inventory.",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070",
      badgeText: "Node Active Sync",
      nodes: ["Dual-Core ESP32", "LoRa SX1278", "Biometric Nodes", "RTOS Kernels", "STM32 Bluepill", "Telemetry Hub"]
    },
    repository: {
      heading: "Project Repository.",
      subtitle: "Active Knowledge Repository Hub",
      projects: [
        { _id: 1, category: "hardware",  title: "Smart Factory Predictive Maintenance", desc: "Industrial-grade vibration analysis node using ESP32. Identifies machinery failure before downtime with 98% accuracy.",                               tools: ["ESP32", "MPU6050", "MQTT", "Python"],       image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070" },
        { _id: 2, category: "software",  title: "Enterprise HRM AI Dashboard",          desc: "Cloud-native management ecosystem with automated biometric hardware sync. Engineered for global organization scalability.",                           tools: ["React", "Node.js", "MongoDB", "Redux"],     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026" },
        { _id: 3, category: "embedded",  title: "Autonomous Hydroponics Node",          desc: "RTOS-based farming automation node that monitors pH/EC levels and controls nutrient dosing without human intervention.",                              tools: ["STM32", "FreeRTOS", "Sensors", "Nextion"],  image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974" },
        { _id: 4, category: "software",  title: "Blockchain Supply Chain Cluster",      desc: "Distributed ledger node for real-time asset tracking in international logistics, ensuring 100% data integrity.",                                     tools: ["Solidity", "Ether.js", "React", "Express"], image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1973" },
        { _id: 5, category: "hardware",  title: "LoRa Emergency Mesh System",           desc: "Off-grid disaster management node that creates a private communication mesh over 10km using LoRa technology.",                                        tools: ["LoRa SX1278", "ESP32", "GPS", "Custom PCB"],image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" },
        { _id: 6, category: "embedded",  title: "Biometric Door Lock Node",             desc: "Highly secure fingerprint and RFID based locking system with real-time logging via cloud dashboard.",                                                  tools: ["Arduino", "AS608 Fingerprint", "Node.js", "Firebase"], image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070" }
      ]
    },
    roadmap: {
      title: "The Innovation Execution Cycle",
      subtitle: "From raw idea to global-grade deployment — powered by real engineering discipline.",
      steps: [
        { _id: 1, label: "Ideation Node",  desc: "Conceptualizing disruptive frameworks and defining the problem worth solving." },
        { _id: 2, label: "Logic Mesh",     desc: "Designing decentralized architecture nodes, data flows, and system contracts." },
        { _id: 3, label: "Assembly Sync",  desc: "Building production-grade prototypes with peer reviews and quality gates." },
        { _id: 4, label: "Global Deploy",  desc: "Final activation, CI/CD pipeline, and worldwide sync for maximum impact." }
      ]
    },
    cta: {
      heading: "Activate Your\nProject",
      description: "Join our next batch of student innovators and turn your ideas into physical industrial mastery.",
      buttonText: "Launch Project",
      whatsappNumber: "918667363896",
      whatsappMessage: "Hello DVein Team, I am interested in launching a project node."
    }
  }
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('dvein_cms_content');
      if (!saved) return defaultContent;
      const p = JSON.parse(saved);
      const merge = (key) => {
        if (!p[key]) return defaultContent[key];
        if (Array.isArray(defaultContent[key])) return p[key];
        return { ...defaultContent[key], ...p[key] };
      };
      return {
        hero:            { slides: p.hero?.slides || defaultContent.hero.slides },
        welcome:         merge('welcome'),
        stats:           p.stats || defaultContent.stats,
        howWeDo:         { ...merge('howWeDo'), steps: p.howWeDo?.steps || defaultContent.howWeDo.steps },
        whyChooseUs:     { ...merge('whyChooseUs'), features: p.whyChooseUs?.features || defaultContent.whyChooseUs.features },
        testimonials:    { ...merge('testimonials'), reviews: p.testimonials?.reviews || defaultContent.testimonials.reviews },
        footer:          merge('footer'),
        internships:     p.internships     ? { ...defaultContent.internships,     ...p.internships     } : defaultContent.internships,
        products:        p.products        ? { ...defaultContent.products,        ...p.products        } : defaultContent.products,
        studentProjects: p.studentProjects ? { ...defaultContent.studentProjects, ...p.studentProjects } : defaultContent.studentProjects,
      };
    } catch { return defaultContent; }
  });

  const updateSection = (section, data) => {
    setContent(prev => {
      const updated = { ...prev, [section]: data };
      try { localStorage.setItem('dvein_cms_content', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const resetSection = (section) => updateSection(section, defaultContent[section]);
  const resetAll = () => {
    try { localStorage.removeItem('dvein_cms_content'); } catch {}
    setContent(defaultContent);
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection, resetAll, defaultContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within <ContentProvider>');
  return ctx;
};

export default ContentContext;
