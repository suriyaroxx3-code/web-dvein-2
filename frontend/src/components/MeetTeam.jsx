import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContent } from '../context/ContentContext';

// Eagerly import all asset images so Vite bundles them and we can resolve by filename
const teamAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23e5e7eb"/><circle cx="80" cy="64" r="28" fill="%23d1d5db"/><ellipse cx="80" cy="128" rx="44" ry="32" fill="%23d1d5db"/></svg>';

const resolveTeamImage = (image) => {
  if (!image) return PLACEHOLDER;
  // data: URIs (uploaded/compressed images), http(s) URLs, absolute paths — use directly
  if (/^(data:|https?:|\/)/.test(image)) return image;
  // Local asset filename — look up the Vite-bundled asset map
  const resolved = teamAssets[`../assets/${image}`];
  if (resolved) return resolved;
  // Try with different capitalisation (e.g. Yasik.png stored differently)
  const key = Object.keys(teamAssets).find(
    k => k.toLowerCase() === `../assets/${image}`.toLowerCase()
  );
  return key ? teamAssets[key] : PLACEHOLDER;
};

const MeetTeam = () => {
  const { content } = useContent();
  const cms = content?.meetTeam || {};
  const teamMembers = Array.isArray(cms.members) ? cms.members.filter(Boolean) : [];

  if (teamMembers.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-dveinGreen mb-3">{cms.eyebrow || 'Our People'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black font-heading">{cms.heading || 'Meet the Crew'}</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={22}
          loop={teamMembers.length > 3}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: Math.min(2, teamMembers.length), spaceBetween: 22 },
            1024: { slidesPerView: Math.min(3, teamMembers.length), spaceBetween: 28 },
          }}
          modules={[Autoplay, Pagination]}
          className="!pb-14 !px-2"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={member.id || index} className="h-auto">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 rounded-full bg-gradient-to-tr from-dveinBlue via-cyan-400 to-dveinGreen p-1.5 shadow-lg shadow-dveinBlue/10">
                  <div className="h-36 w-36 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white sm:h-40 sm:w-40">
                    <img
                      src={resolveTeamImage(member.image)}
                      alt={member.name || 'Team member'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = PLACEHOLDER; }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black font-heading">{member.name || 'Team Member'}</h3>
                <p className="mt-2 text-sm font-semibold text-dveinBlue">{member.role || 'Role'}</p>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MeetTeam;
