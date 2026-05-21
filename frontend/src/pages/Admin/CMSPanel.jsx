import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import {
  FaImages, FaHandshake, FaChartBar, FaCogs, FaQuestionCircle,
  FaStar, FaMapMarkerAlt, FaSignOutAlt, FaSave, FaUndo, FaPlus,
  FaTrash, FaChevronDown, FaChevronUp, FaEye, FaCheck,
  FaShieldAlt, FaBars, FaTimes, FaGraduationCap, FaBox, FaFlask,
} from 'react-icons/fa';
import logo from '../../assets/logo.png';

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = 'text', rows, placeholder }) => (
  <div className="mb-4">
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
    {type === 'textarea'
      ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows || 3} placeholder={placeholder}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all resize-none placeholder-gray-300 shadow-sm" />
      : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all placeholder-gray-300 shadow-sm" />
    }
  </div>
);

const SaveBar = ({ onSave, onReset, saved }) => (
  <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-6">
    <button onClick={onSave}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${saved ? 'bg-[#10B981] text-white shadow-[#10B981]/25' : 'bg-[#0056D2] hover:bg-[#0046b0] text-white shadow-[#0056D2]/20'}`}>
      {saved ? <><FaCheck size={12} /> Saved!</> : <><FaSave size={12} /> Save Changes</>}
    </button>
    <button onClick={onReset}
      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
      <FaUndo size={11} /> Reset Default
    </button>
  </div>
);

const SectionHeader = ({ title, desc, icon, color = '#0056D2' }) => (
  <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-100">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm" style={{ background: color + '15', color }}>
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-bold text-gray-900 font-heading">{title}</h2>
      <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
    </div>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ${className}`}>{children}</div>
);

const AccordionCard = ({ label, number, open, onToggle, children }) => (
  <Card className="!p-0 overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full bg-[#0056D2]/10 text-[#0056D2] text-xs font-black flex items-center justify-center shrink-0">{number}</span>
        <span className="text-gray-800 font-semibold text-sm truncate max-w-xs">{label}</span>
      </div>
      {open ? <FaChevronUp className="text-gray-300 shrink-0" size={12} /> : <FaChevronDown className="text-gray-300 shrink-0" size={12} />}
    </button>
    {open && <div className="px-5 pb-5 border-t border-gray-50 pt-4">{children}</div>}
  </Card>
);

const useSave = (sectionKey, sourceData) => {
  const { updateSection, resetSection, content } = useContent();
  const [data, setData] = useState(sourceData);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setData(content[sectionKey]); }, [content[sectionKey]]);

  const save = (override) => {
    updateSection(sectionKey, override ?? data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const reset = () => { resetSection(sectionKey); setSaved(false); };
  return { data, setData, save, reset, saved };
};

// ─── HOME EDITORS ─────────────────────────────────────────────────────────────
const HeroEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [slides, setSlides] = useState(content.hero.slides);
  const [open, setOpen]     = useState(0);
  const [saved, setSaved]   = useState(false);
  useEffect(() => setSlides(content.hero.slides), [content.hero]);
  const upSlide = (i, k, v) => setSlides(p => p.map((s, j) => j === i ? { ...s, [k]: v } : s));
  const save = () => { updateSection('hero', { slides }); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Hero Slider" desc="Edit the 3 rotating hero slides." icon={<FaImages />} />
      <div className="space-y-3">
        {slides.map((slide, idx) => (
          <AccordionCard key={slide.id} number={idx + 1} label={slide.title} open={open === idx} onToggle={() => setOpen(open === idx ? -1 : idx)}>
            {slide.image && <div className="mb-4 rounded-xl overflow-hidden h-24 bg-gray-100"><img src={slide.image} alt="" className="w-full h-full object-cover" /></div>}
            <Field label="Image URL" value={slide.image} onChange={v => upSlide(idx, 'image', v)} placeholder="https://..." />
            <Field label="Badge Tag" value={slide.smallTag} onChange={v => upSlide(idx, 'smallTag', v)} />
            <Field label="Headline" value={slide.title} onChange={v => upSlide(idx, 'title', v)} />
            <Field label="Description" value={slide.description} onChange={v => upSlide(idx, 'description', v)} type="textarea" rows={2} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Primary Button" value={slide.primaryBtn} onChange={v => upSlide(idx, 'primaryBtn', v)} />
              <Field label="Primary Link" value={slide.primaryLink} onChange={v => upSlide(idx, 'primaryLink', v)} />
              <Field label="Secondary Button" value={slide.secondaryBtn} onChange={v => upSlide(idx, 'secondaryBtn', v)} />
              <Field label="Secondary Link" value={slide.secondaryLink} onChange={v => upSlide(idx, 'secondaryLink', v)} />
            </div>
          </AccordionCard>
        ))}
      </div>
      <SaveBar onSave={save} onReset={() => resetSection('hero')} saved={saved} />
    </div>
  );
};

const WelcomeEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.welcome);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.welcome), [content.welcome]);
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  const save = () => { updateSection('welcome', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Welcome / About Section" icon={<FaHandshake />} desc="'Who We Are' text and feature cards." color="#10B981" />
      <Card className="mb-4">
        <Field label="Tagline" value={data.tagline} onChange={v => set('tagline', v)} />
        <Field label="Heading" value={data.heading} onChange={v => set('heading', v)} />
        <Field label="Paragraph" value={data.paragraph} onChange={v => set('paragraph', v)} type="textarea" rows={4} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="CTA Text" value={data.ctaText} onChange={v => set('ctaText', v)} />
          <Field label="CTA Link" value={data.ctaLink} onChange={v => set('ctaLink', v)} />
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <p className="text-[11px] font-bold text-[#0056D2] uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#0056D2]" />Card 1 — Blue</p>
          <Field label="Title" value={data.card1Title} onChange={v => set('card1Title', v)} />
          <Field label="Description" value={data.card1Desc} onChange={v => set('card1Desc', v)} type="textarea" rows={2} />
        </Card>
        <Card>
          <p className="text-[11px] font-bold text-[#10B981] uppercase tracking-widest mb-3 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />Card 2 — Green</p>
          <Field label="Title" value={data.card2Title} onChange={v => set('card2Title', v)} />
          <Field label="Description" value={data.card2Desc} onChange={v => set('card2Desc', v)} type="textarea" rows={2} />
        </Card>
      </div>
      <SaveBar onSave={save} onReset={() => resetSection('welcome')} saved={saved} />
    </div>
  );
};

const StatsEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [stats, setStats] = useState(content.stats);
  const [saved, setSaved] = useState(false);
  useEffect(() => setStats(content.stats), [content.stats]);
  const upStat = (i, k, v) => setStats(p => p.map((s, j) => j === i ? { ...s, [k]: v } : s));
  const save = () => { updateSection('stats', stats); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Stats / Achievements" icon={<FaChartBar />} desc="The 4 key numbers on the homepage." color="#7C3AED" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <Card key={stat.id}>
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-widest mb-3">Stat {idx + 1}</p>
            <Field label="Value (e.g. 50+)" value={stat.value} onChange={v => upStat(idx, 'value', v)} />
            <Field label="Label" value={stat.name} onChange={v => upStat(idx, 'name', v)} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={() => resetSection('stats')} saved={saved} />
    </div>
  );
};

const HowWeDoEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.howWeDo);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.howWeDo), [content.howWeDo]);
  const upStep = (i, k, v) => setData(p => ({ ...p, steps: p.steps.map((s, j) => j === i ? { ...s, [k]: v } : s) }));
  const save = () => { updateSection('howWeDo', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="How We Do It — Process" icon={<FaCogs />} desc="Section heading and 4 process steps." color="#3B82F6" />
      <Card className="mb-4">
        <Field label="Tagline" value={data.tagline} onChange={v => setData(p => ({ ...p, tagline: v }))} />
        <Field label="Heading" value={data.heading} onChange={v => setData(p => ({ ...p, heading: v }))} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.steps.map((step, idx) => (
          <Card key={idx}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {idx + 1}</p>
            <Field label="Title" value={step.title} onChange={v => upStep(idx, 'title', v)} />
            <Field label="Description" value={step.desc} onChange={v => upStep(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={() => resetSection('howWeDo')} saved={saved} />
    </div>
  );
};

const WhyChooseEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.whyChooseUs);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.whyChooseUs), [content.whyChooseUs]);
  const upFeat = (i, k, v) => setData(p => ({ ...p, features: p.features.map((f, j) => j === i ? { ...f, [k]: v } : f) }));
  const save = () => { updateSection('whyChooseUs', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Why Choose Us" icon={<FaQuestionCircle />} desc="Heading and 4 feature cards." color="#F59E0B" />
      <Card className="mb-4">
        <Field label="Heading" value={data.heading} onChange={v => setData(p => ({ ...p, heading: v }))} />
        <Field label="Subheading" value={data.subheading} onChange={v => setData(p => ({ ...p, subheading: v }))} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.features.map((f, idx) => (
          <Card key={idx}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Feature {idx + 1}</p>
            <Field label="Title" value={f.name} onChange={v => upFeat(idx, 'name', v)} />
            <Field label="Description" value={f.desc} onChange={v => upFeat(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={() => resetSection('whyChooseUs')} saved={saved} />
    </div>
  );
};

const TestimonialsEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.testimonials);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.testimonials), [content.testimonials]);
  const upRev = (i, k, v) => setData(p => ({ ...p, reviews: p.reviews.map((r, j) => j === i ? { ...r, [k]: v } : r) }));
  const addRev = () => setData(p => ({ ...p, reviews: [...p.reviews, { id: Date.now(), name: 'New Name', role: 'Role', text: 'Review text.', rating: 5 }] }));
  const delRev = (i) => setData(p => ({ ...p, reviews: p.reviews.filter((_, j) => j !== i) }));
  const save = () => { updateSection('testimonials', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Testimonials" icon={<FaStar />} desc="Google badge, heading, and all reviews." color="#F59E0B" />
      <Card className="mb-4">
        <Field label="Section Heading" value={data.heading} onChange={v => setData(p => ({ ...p, heading: v }))} />
        <Field label="Google Badge Text" value={data.googleRating} onChange={v => setData(p => ({ ...p, googleRating: v }))} />
      </Card>
      <div className="space-y-3">
        {data.reviews.map((r, idx) => (
          <Card key={r.id} className="relative">
            <button onClick={() => delRev(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Review {idx + 1}</p>
            <div className="grid grid-cols-2 gap-3"><Field label="Name" value={r.name} onChange={v => upRev(idx, 'name', v)} /><Field label="Role" value={r.role} onChange={v => upRev(idx, 'role', v)} /></div>
            <Field label="Text" value={r.text} onChange={v => upRev(idx, 'text', v)} type="textarea" rows={2} />
            <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Stars</label>
              <div className="flex gap-1.5">{[1,2,3,4,5].map(n => <button key={n} onClick={() => upRev(idx, 'rating', n)} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${r.rating >= n ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-100 text-gray-400'}`}>{n}</button>)}</div>
            </div>
          </Card>
        ))}
      </div>
      <button onClick={addRev} className="mt-3 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Review</button>
      <SaveBar onSave={save} onReset={() => resetSection('testimonials')} saved={saved} />
    </div>
  );
};

const FooterEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.footer);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.footer), [content.footer]);
  const set = (k, v) => setData(p => ({ ...p, [k]: v }));
  const save = () => { updateSection('footer', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return (
    <div>
      <SectionHeader title="Footer" icon={<FaMapMarkerAlt />} desc="Address, phone, email and copyright text." color="#10B981" />
      <Card>
        <Field label="Address" value={data.address} onChange={v => set('address', v)} type="textarea" rows={2} />
        <Field label="Phone" value={data.phone} onChange={v => set('phone', v)} />
        <Field label="Email" value={data.email} onChange={v => set('email', v)} />
        <Field label="Copyright" value={data.copyright} onChange={v => set('copyright', v)} />
      </Card>
      <SaveBar onSave={save} onReset={() => resetSection('footer')} saved={saved} />
    </div>
  );
};

// ─── INTERNSHIPS EDITORS ─────────────────────────────────────────────────────
const InternshipsEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.internships);
  const [openDomain, setOpenDomain] = useState(-1);
  const [openCurr, setOpenCurr]     = useState(-1);
  const [saved, setSaved]           = useState(false);
  useEffect(() => setData(content.internships), [content.internships]);

  const setHero = (k, v) => setData(p => ({ ...p, hero: { ...p.hero, [k]: v } }));
  const setCurr = (k, v) => setData(p => ({ ...p, curriculum: { ...p.curriculum, [k]: v } }));
  const setCurrTrack = (track, idx, k, v) => setData(p => ({ ...p, curriculum: { ...p.curriculum, [track]: p.curriculum[track].map((item, i) => i === idx ? { ...item, [k]: v } : item) } }));
  const setDomain = (idx, k, v) => setData(p => ({ ...p, domains: p.domains.map((d, i) => i === idx ? { ...d, [k]: v } : d) }));
  const setSkills = (idx, v) => setDomain(idx, 'skills', v.split(',').map(s => s.trim()).filter(Boolean));
  const upProject = (idx, k, v) => setData(p => ({ ...p, projects: { ...p.projects, items: p.projects.items.map((pr, i) => i === idx ? { ...pr, [k]: v } : pr) } }));
  const addProject = () => setData(p => ({ ...p, projects: { ...p.projects, items: [...p.projects.items, { _id: Date.now(), title: 'New Project', tag: 'Full Stack', desc: 'Project description.' }] } }));
  const delProject = (idx) => setData(p => ({ ...p, projects: { ...p.projects, items: p.projects.items.filter((_, i) => i !== idx) } }));
  const upFaq = (idx, k, v) => setData(p => ({ ...p, faqs: p.faqs.map((f, i) => i === idx ? { ...f, [k]: v } : f) }));
  const addFaq = () => setData(p => ({ ...p, faqs: [...p.faqs, { _id: Date.now(), question: 'New question?', answer: 'Answer here.' }] }));
  const delFaq = (idx) => setData(p => ({ ...p, faqs: p.faqs.filter((_, i) => i !== idx) }));

  const save = () => { updateSection('internships', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <SectionHeader title="Internships Page" icon={<FaGraduationCap />} desc="Edit every section of the Internships / Training page." color="#2563EB" />

      {/* HERO */}
      <div className="mb-2"><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Hero Section</p>
      <Card className="mb-5">
        <Field label="Badge Text" value={data.hero.badge} onChange={v => setHero('badge', v)} />
        <Field label="Headline (use \\n for line break)" value={data.hero.headline} onChange={v => setHero('headline', v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v => setHero('description', v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Apply Button" value={data.hero.applyBtn} onChange={v => setHero('applyBtn', v)} />
          <Field label="Explore Button" value={data.hero.exploreBtn} onChange={v => setHero('exploreBtn', v)} />
        </div>
      </Card></div>

      {/* MARQUEE + DOMAINS HEADING */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Marquee & Domains</p>
      <Card className="mb-3">
        <Field label="Marquee Text" value={data.marquee} onChange={v => setData(p => ({ ...p, marquee: v }))} />
        <Field label="Domains Section Heading" value={data.domainsHeading} onChange={v => setData(p => ({ ...p, domainsHeading: v }))} />
        <Field label="Domains Subheading" value={data.domainsSubheading} onChange={v => setData(p => ({ ...p, domainsSubheading: v }))} />
      </Card>

      {/* DOMAINS ACCORDION */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Internship Domains ({data.domains.length})</p>
      <div className="space-y-2 mb-5">
        {data.domains.map((domain, idx) => (
          <AccordionCard key={domain._id} number={idx + 1} label={domain.title} open={openDomain === idx} onToggle={() => setOpenDomain(openDomain === idx ? -1 : idx)}>
            <Field label="Title" value={domain.title} onChange={v => setDomain(idx, 'title', v)} />
            <Field label="Description" value={domain.desc} onChange={v => setDomain(idx, 'desc', v)} type="textarea" rows={2} />
            <Field label="Skills (comma-separated)" value={domain.skills?.join(', ')} onChange={v => setSkills(idx, v)} placeholder="React, Node.js, MongoDB" />
          </AccordionCard>
        ))}
      </div>

      {/* CURRICULUM */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Curriculum Section</p>
      <Card className="mb-3">
        <Field label="Heading" value={data.curriculum.heading} onChange={v => setCurr('heading', v)} />
        <Field label="Subheading" value={data.curriculum.subheading} onChange={v => setCurr('subheading', v)} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {['web','ai'].map(track => (
          <Card key={track}>
            <p className="text-[11px] font-black text-[#0056D2] uppercase tracking-widest mb-3">{track === 'web' ? 'Web Track' : 'AI Track'}</p>
            {data.curriculum[track].map((item, idx) => (
              <div key={item._id} className="mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                <p className="text-[10px] font-bold text-gray-400 mb-2">Module {idx + 1}</p>
                <Field label="Week" value={item.week} onChange={v => setCurrTrack(track, idx, 'week', v)} />
                <Field label="Title" value={item.title} onChange={v => setCurrTrack(track, idx, 'title', v)} />
                <Field label="Description" value={item.desc} onChange={v => setCurrTrack(track, idx, 'desc', v)} type="textarea" rows={2} />
              </div>
            ))}
          </Card>
        ))}
      </div>

      {/* PROJECTS */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Industry Portfolio</p>
      <Card className="mb-2">
        <Field label="Section Heading" value={data.projects.heading} onChange={v => setData(p => ({ ...p, projects: { ...p.projects, heading: v } }))} />
      </Card>
      <div className="space-y-3 mb-3">
        {data.projects.items.map((proj, idx) => (
          <Card key={proj._id} className="relative">
            <button onClick={() => delProject(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Project {idx + 1}</p>
            <Field label="Title" value={proj.title} onChange={v => upProject(idx, 'title', v)} />
            <Field label="Tag" value={proj.tag} onChange={v => upProject(idx, 'tag', v)} />
            <Field label="Description" value={proj.desc} onChange={v => upProject(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <button onClick={addProject} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Project</button>

      {/* FAQS */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">FAQs</p>
      <div className="space-y-3">
        {data.faqs.map((faq, idx) => (
          <Card key={faq._id} className="relative">
            <button onClick={() => delFaq(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {idx + 1}</p>
            <Field label="Question" value={faq.question} onChange={v => upFaq(idx, 'question', v)} />
            <Field label="Answer" value={faq.answer} onChange={v => upFaq(idx, 'answer', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <button onClick={addFaq} className="mt-3 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add FAQ</button>
      <SaveBar onSave={save} onReset={() => resetSection('internships')} saved={saved} />
    </div>
  );
};

// ─── PRODUCTS EDITOR ─────────────────────────────────────────────────────────
const ProductsEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.products);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.products), [content.products]);

  const setHero = (k, v) => setData(p => ({ ...p, hero: { ...p.hero, [k]: v } }));
  const setDna = (k, v) => setData(p => ({ ...p, dna: { ...p.dna, [k]: v } }));
  const setDnaItem = (idx, k, v) => setData(p => ({ ...p, dna: { ...p.dna, items: p.dna.items.map((d, i) => i === idx ? { ...d, [k]: v } : d) } }));
  const setRoadmap = (k, v) => setData(p => ({ ...p, roadmap: { ...p.roadmap, [k]: v } }));
  const setRoadmapStep = (idx, k, v) => setData(p => ({ ...p, roadmap: { ...p.roadmap, steps: p.roadmap.steps.map((s, i) => i === idx ? { ...s, [k]: v } : s) } }));
  const setReviews = (k, v) => setData(p => ({ ...p, reviews: { ...p.reviews, [k]: v } }));
  const setReviewItem = (idx, k, v) => setData(p => ({ ...p, reviews: { ...p.reviews, items: p.reviews.items.map((r, i) => i === idx ? { ...r, [k]: v } : r) } }));
  const addReview = () => setData(p => ({ ...p, reviews: { ...p.reviews, items: [...p.reviews.items, { id: Date.now(), name: 'Name', role: 'Role', text: 'Review.', rating: 5 }] } }));
  const delReview = (idx) => setData(p => ({ ...p, reviews: { ...p.reviews, items: p.reviews.items.filter((_, i) => i !== idx) } }));
  const setFaq = (k, v) => setData(p => ({ ...p, faq: { ...p.faq, [k]: v } }));
  const setFaqItem = (idx, k, v) => setData(p => ({ ...p, faq: { ...p.faq, items: p.faq.items.map((f, i) => i === idx ? { ...f, [k]: v } : f) } }));
  const addFaq = () => setData(p => ({ ...p, faq: { ...p.faq, items: [...p.faq.items, { q: 'New question?', a: 'Answer here.' }] } }));
  const delFaq = (idx) => setData(p => ({ ...p, faq: { ...p.faq, items: p.faq.items.filter((_, i) => i !== idx) } }));

  const save = () => { updateSection('products', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <SectionHeader title="Products Page" icon={<FaBox />} desc="Edit every section of the Products page." color="#6366F1" />

      {/* HERO */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Hero Section</p>
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v => setHero('badge', v)} />
        <Field label="Headline (\\n for line break)" value={data.hero.headline} onChange={v => setHero('headline', v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v => setHero('description', v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Explore Button" value={data.hero.exploreBtn} onChange={v => setHero('exploreBtn', v)} />
          <Field label="Docs Button" value={data.hero.docsBtn} onChange={v => setHero('docsBtn', v)} />
        </div>
      </Card>

      {/* DNA */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Core Architecture Cards</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {data.dna.items.map((item, idx) => (
          <Card key={idx}>
            <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Card {idx + 1}</p>
            <Field label="Title" value={item.title} onChange={v => setDnaItem(idx, 'title', v)} />
            <Field label="Description" value={item.desc} onChange={v => setDnaItem(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>

      {/* ROADMAP */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Deployment Roadmap</p>
      <Card className="mb-3">
        <Field label="Title" value={data.roadmap.title} onChange={v => setRoadmap('title', v)} />
        <Field label="Subtitle" value={data.roadmap.subtitle} onChange={v => setRoadmap('subtitle', v)} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {data.roadmap.steps.map((step, idx) => (
          <Card key={idx}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {idx + 1}</p>
            <Field label="Label" value={step.label} onChange={v => setRoadmapStep(idx, 'label', v)} />
            <Field label="Description" value={step.desc} onChange={v => setRoadmapStep(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>

      {/* REVIEWS */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Reviews</p>
      <Card className="mb-3">
        <Field label="Section Heading" value={data.reviews.heading} onChange={v => setReviews('heading', v)} />
        <Field label="Google Badge Text" value={data.reviews.googleBadge} onChange={v => setReviews('googleBadge', v)} />
      </Card>
      <div className="space-y-3 mb-5">
        {data.reviews.items.map((r, idx) => (
          <Card key={r.id} className="relative">
            <button onClick={() => delReview(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Review {idx + 1}</p>
            <div className="grid grid-cols-2 gap-3"><Field label="Name" value={r.name} onChange={v => setReviewItem(idx, 'name', v)} /><Field label="Role" value={r.role} onChange={v => setReviewItem(idx, 'role', v)} /></div>
            <Field label="Text" value={r.text} onChange={v => setReviewItem(idx, 'text', v)} type="textarea" rows={2} />
            <div><label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Stars</label>
              <div className="flex gap-1.5">{[1,2,3,4,5].map(n => <button key={n} onClick={() => setReviewItem(idx, 'rating', n)} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${r.rating >= n ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-100 text-gray-400'}`}>{n}</button>)}</div>
            </div>
          </Card>
        ))}
      </div>
      <button onClick={addReview} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Review</button>

      {/* FAQ */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">FAQ</p>
      <Card className="mb-3"><Field label="FAQ Section Heading" value={data.faq.heading} onChange={v => setFaq('heading', v)} /></Card>
      <div className="space-y-3">
        {data.faq.items.map((faq, idx) => (
          <Card key={idx} className="relative">
            <button onClick={() => delFaq(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {idx + 1}</p>
            <Field label="Question" value={faq.q} onChange={v => setFaqItem(idx, 'q', v)} />
            <Field label="Answer" value={faq.a} onChange={v => setFaqItem(idx, 'a', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <button onClick={addFaq} className="mt-3 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add FAQ</button>
      <SaveBar onSave={save} onReset={() => resetSection('products')} saved={saved} />
    </div>
  );
};


// ─── STUDENT PROJECTS EDITOR ─────────────────────────────────────────────────
const StudentProjectsEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [data, setData] = useState(content.studentProjects);
  const [openProject, setOpenProject] = useState(-1);
  const [saved, setSaved] = useState(false);
  useEffect(() => setData(content.studentProjects), [content.studentProjects]);

  const save = () => { updateSection('studentProjects', data); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  // ── helpers ──
  const setHero     = (k, v) => setData(p => ({ ...p, hero: { ...p.hero, [k]: v } }));
  const setStat     = (idx, k, v) => setData(p => ({ ...p, stats: p.stats.map((s, i) => i === idx ? { ...s, [k]: v } : s) }));
  const addStat     = () => setData(p => ({ ...p, stats: [...p.stats, { _id: Date.now(), label: 'New Metric', count: '0+' }] }));
  const delStat     = (idx) => setData(p => ({ ...p, stats: p.stats.filter((_, i) => i !== idx) }));
  const setWhy      = (idx, k, v) => setData(p => ({ ...p, whyFeatures: p.whyFeatures.map((f, i) => i === idx ? { ...f, [k]: v } : f) }));
  const addWhy      = () => setData(p => ({ ...p, whyFeatures: [...p.whyFeatures, { _id: Date.now(), title: 'New Feature', desc: 'Description here.' }] }));
  const delWhy      = (idx) => setData(p => ({ ...p, whyFeatures: p.whyFeatures.filter((_, i) => i !== idx) }));
  const setHW       = (k, v) => setData(p => ({ ...p, hardware: { ...p.hardware, [k]: v } }));
  const setNode     = (idx, v) => setData(p => ({ ...p, hardware: { ...p.hardware, nodes: p.hardware.nodes.map((n, i) => i === idx ? v : n) } }));
  const addNode     = () => setData(p => ({ ...p, hardware: { ...p.hardware, nodes: [...p.hardware.nodes, 'New Node'] } }));
  const delNode     = (idx) => setData(p => ({ ...p, hardware: { ...p.hardware, nodes: p.hardware.nodes.filter((_, i) => i !== idx) } }));
  const setRepo     = (k, v) => setData(p => ({ ...p, repository: { ...p.repository, [k]: v } }));
  const setProject  = (idx, k, v) => setData(p => ({ ...p, repository: { ...p.repository, projects: p.repository.projects.map((pr, i) => i === idx ? { ...pr, [k]: v } : pr) } }));
  const setTools    = (idx, v) => setProject(idx, 'tools', v.split(',').map(s => s.trim()).filter(Boolean));
  const addProject  = () => setData(p => ({ ...p, repository: { ...p.repository, projects: [...p.repository.projects, { _id: Date.now(), category: 'software', title: 'New Project', desc: 'Project description.', tools: ['React'], image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069' }] } }));
  const delProject  = (idx) => setData(p => ({ ...p, repository: { ...p.repository, projects: p.repository.projects.filter((_, i) => i !== idx) } }));
  const setRoadmap  = (k, v) => setData(p => ({ ...p, roadmap: { ...p.roadmap, [k]: v } }));
  const setStep     = (idx, k, v) => setData(p => ({ ...p, roadmap: { ...p.roadmap, steps: p.roadmap.steps.map((s, i) => i === idx ? { ...s, [k]: v } : s) } }));
  const setCta      = (k, v) => setData(p => ({ ...p, cta: { ...p.cta, [k]: v } }));

  return (
    <div>
      <SectionHeader title="Student Projects Page" icon={<FaFlask />} desc="Edit every section of the Student Projects / Innovation Hub page." color="#0891B2" />

      {/* HERO */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Hero Section</p>
      <Card className="mb-5">
        <Field label="Badge Text" value={data.hero.badge} onChange={v => setHero('badge', v)} />
        <Field label="Headline (use \n for line break)" value={data.hero.headline} onChange={v => setHero('headline', v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v => setHero('description', v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="PDF Button Text" value={data.hero.pdfBtn} onChange={v => setHero('pdfBtn', v)} />
          <Field label="PDF Link" value={data.hero.pdfLink} onChange={v => setHero('pdfLink', v)} />
        </div>
      </Card>

      {/* STATS */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Performance Metrics ({data.stats.length})</p>
      <div className="space-y-2 mb-2">
        {data.stats.map((stat, idx) => (
          <Card key={stat._id} className="relative">
            <button onClick={() => delStat(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <div className="grid grid-cols-2 gap-3 pr-10">
              <Field label="Label" value={stat.label} onChange={v => setStat(idx, 'label', v)} />
              <Field label="Count" value={stat.count} onChange={v => setStat(idx, 'count', v)} />
            </div>
          </Card>
        ))}
      </div>
      <button onClick={addStat} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Metric</button>

      {/* WHY CHOOSE */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Why Choose DVein Section</p>
      <Card className="mb-3">
        <Field label="Section Heading" value={data.whyHeading} onChange={v => setData(p => ({ ...p, whyHeading: v }))} />
      </Card>
      <div className="space-y-3 mb-2">
        {data.whyFeatures.map((f, idx) => (
          <Card key={f._id} className="relative">
            <button onClick={() => delWhy(idx)} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all"><FaTrash size={10} /></button>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Feature {idx + 1}</p>
            <Field label="Title" value={f.title} onChange={v => setWhy(idx, 'title', v)} />
            <Field label="Description" value={f.desc} onChange={v => setWhy(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <button onClick={addWhy} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Feature</button>

      {/* HARDWARE INVENTORY */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Hardware Inventory Section</p>
      <Card className="mb-3">
        <Field label="Section Heading (use \n for line break)" value={data.hardware.heading} onChange={v => setHW('heading', v)} type="textarea" rows={2} />
        <Field label="Lab Image URL" value={data.hardware.image} onChange={v => setHW('image', v)} />
        <Field label="Badge Text (bottom-right card)" value={data.hardware.badgeText} onChange={v => setHW('badgeText', v)} />
      </Card>
      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Hardware Nodes ({data.hardware.nodes.length})</p>
      <div className="space-y-2 mb-2">
        {data.hardware.nodes.map((node, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={node}
              onChange={e => setNode(idx, e.target.value)}
              className="flex-1 bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all shadow-sm"
            />
            <button onClick={() => delNode(idx)} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all shrink-0"><FaTrash size={10} /></button>
          </div>
        ))}
      </div>
      <button onClick={addNode} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Node</button>

      {/* PROJECT REPOSITORY */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Project Repository</p>
      <Card className="mb-3">
        <Field label="Section Heading" value={data.repository.heading} onChange={v => setRepo('heading', v)} />
        <Field label="Section Subtitle" value={data.repository.subtitle} onChange={v => setRepo('subtitle', v)} />
      </Card>
      <div className="space-y-2 mb-2">
        {data.repository.projects.map((proj, idx) => (
          <AccordionCard key={proj._id} number={idx + 1} label={proj.title} open={openProject === idx} onToggle={() => setOpenProject(openProject === idx ? -1 : idx)}>
            <button onClick={() => delProject(idx)} className="mb-3 flex items-center gap-1.5 text-red-400 text-xs font-bold hover:text-red-600 transition-colors"><FaTrash size={10} /> Remove Project</button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title" value={proj.title} onChange={v => setProject(idx, 'title', v)} />
              <Field label="Category" value={proj.category} onChange={v => setProject(idx, 'category', v)} placeholder="hardware / software / embedded" />
            </div>
            <Field label="Description" value={proj.desc} onChange={v => setProject(idx, 'desc', v)} type="textarea" rows={2} />
            <Field label="Tools (comma-separated)" value={proj.tools?.join(', ')} onChange={v => setTools(idx, v)} placeholder="React, Node.js, MongoDB" />
            <Field label="Image URL" value={proj.image} onChange={v => setProject(idx, 'image', v)} />
          </AccordionCard>
        ))}
      </div>
      <button onClick={addProject} className="mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors"><FaPlus size={11} /> Add Project</button>

      {/* ROADMAP */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Execution Roadmap</p>
      <Card className="mb-3">
        <Field label="Roadmap Title" value={data.roadmap.title} onChange={v => setRoadmap('title', v)} />
        <Field label="Roadmap Subtitle" value={data.roadmap.subtitle} onChange={v => setRoadmap('subtitle', v)} type="textarea" rows={2} />
      </Card>
      <div className="space-y-2 mb-5">
        {data.roadmap.steps.map((step, idx) => (
          <Card key={step._id}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {idx + 1}</p>
            <Field label="Label" value={step.label} onChange={v => setStep(idx, 'label', v)} />
            <Field label="Description" value={step.desc} onChange={v => setStep(idx, 'desc', v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>

      {/* CTA */}
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Call to Action</p>
      <Card>
        <Field label="Heading (use \n for line break)" value={data.cta.heading} onChange={v => setCta('heading', v)} type="textarea" rows={2} />
        <Field label="Description" value={data.cta.description} onChange={v => setCta('description', v)} type="textarea" rows={2} />
        <Field label="Button Text" value={data.cta.buttonText} onChange={v => setCta('buttonText', v)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="WhatsApp Number" value={data.cta.whatsappNumber} onChange={v => setCta('whatsappNumber', v)} placeholder="918667363896" />
          <Field label="WhatsApp Message" value={data.cta.whatsappMessage} onChange={v => setCta('whatsappMessage', v)} />
        </div>
      </Card>

      <SaveBar onSave={save} onReset={() => resetSection('studentProjects')} saved={saved} />
    </div>
  );
};

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV = [
  { key: 'hero',         label: 'Hero Slider',     icon: FaImages,         color: '#0056D2', group: 'Home Page' },
  { key: 'welcome',      label: 'Welcome / About',  icon: FaHandshake,      color: '#10B981', group: 'Home Page' },
  { key: 'stats',        label: 'Stats',            icon: FaChartBar,       color: '#7C3AED', group: 'Home Page' },
  { key: 'howWeDo',      label: 'How We Do It',    icon: FaCogs,           color: '#3B82F6', group: 'Home Page' },
  { key: 'whyChooseUs',  label: 'Why Choose Us',   icon: FaQuestionCircle, color: '#F59E0B', group: 'Home Page' },
  { key: 'testimonials', label: 'Testimonials',    icon: FaStar,           color: '#F59E0B', group: 'Home Page' },
  { key: 'footer',       label: 'Footer',          icon: FaMapMarkerAlt,   color: '#10B981', group: 'Home Page' },
  { key: 'internships',  label: 'Internships Page', icon: FaGraduationCap,  color: '#2563EB', group: 'Other Pages' },
  { key: 'products',     label: 'Products Page',   icon: FaBox,            color: '#6366F1', group: 'Other Pages' },
  { key: 'studentProjects', label: 'Student Projects', icon: FaFlask, color: '#0891B2', group: 'Other Pages' },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────
const CMSPanel = () => {
  const navigate = useNavigate();
  const { resetAll } = useContent();
  const [active, setActive]       = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login?redirect=/admin/cms');
  }, [navigate]);

  const handleLogout = () => { localStorage.clear(); navigate('/admin/login'); };

  const renderEditor = () => {
    switch (active) {
      case 'hero':         return <HeroEditor />;
      case 'welcome':      return <WelcomeEditor />;
      case 'stats':        return <StatsEditor />;
      case 'howWeDo':      return <HowWeDoEditor />;
      case 'whyChooseUs':  return <WhyChooseEditor />;
      case 'testimonials': return <TestimonialsEditor />;
      case 'footer':       return <FooterEditor />;
      case 'internships':  return <InternshipsEditor />;
      case 'products':     return <ProductsEditor />;
      case 'studentProjects': return <StudentProjectsEditor />;
      default:             return null;
    }
  };

  const activeNav = NAV.find(n => n.key === active);
  const groups = [...new Set(NAV.map(n => n.group))];

  return (
    <div className="min-h-screen bg-[#F7F8FC] font-sans flex flex-col">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
          <img src={logo} alt="DVein" className="h-7 w-auto object-contain" />
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-100">
            <span className="text-gray-900 font-bold text-sm font-heading">Content Manager</span>
            <span className="bg-[#0056D2]/10 text-[#0056D2] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">CMS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-xl font-bold text-xs transition-all"><FaEye size={11} /> Preview</a>
          <Link to="/admin/dashboard" className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-xl font-bold text-xs transition-all"><FaShieldAlt size={11} /> Dashboard</Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 px-3.5 py-2 rounded-xl font-bold text-xs transition-all"><FaSignOutAlt size={11} /><span className="hidden sm:inline">Logout</span></button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        {mobileOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 pt-16 lg:pt-0 ${mobileOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
          <div className="px-4 py-3 border-b border-gray-50"><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Website Sections</p></div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-4">
            {groups.map(group => (
              <div key={group}>
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest px-3 mb-1.5">{group}</p>
                <div className="space-y-0.5">
                  {NAV.filter(n => n.group === group).map(({ key, label, icon: Icon, color }) => (
                    <button key={key} onClick={() => { setActive(key); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${active === key ? 'bg-[#0056D2] text-white shadow-md shadow-[#0056D2]/20' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
                      <Icon size={13} className="shrink-0" /> {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-50">
            <button onClick={() => { if (window.confirm('Reset ALL content to defaults?')) resetAll(); }}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-400 border border-red-100 px-4 py-2.5 rounded-xl font-bold text-xs transition-all">
              <FaUndo size={10} /> Reset All Content
            </button>
          </div>
        </aside>

        {/* EDITOR */}
        <main className="flex-1 overflow-y-auto">
          <div className="bg-white border-b border-gray-100 px-6 lg:px-10 py-3.5 flex items-center gap-3">
            {activeNav && (
              <>
                <span className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0" style={{ background: activeNav.color + '15', color: activeNav.color }}><activeNav.icon /></span>
                <div>
                  <h1 className="text-sm font-bold text-gray-900">{activeNav.label}</h1>
                  <p className="text-[11px] text-gray-400">Changes save instantly to the live website</p>
                </div>
              </>
            )}
          </div>
          <div className="p-6 lg:p-10 max-w-3xl mx-auto">{renderEditor()}</div>
        </main>
      </div>
    </div>
  );
};

export default CMSPanel;
