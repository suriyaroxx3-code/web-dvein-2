import React from 'react';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useContent } from '../context/ContentContext';

const Testimonials = () => {
  const { content } = useContent();
  const t = content.testimonials;

  return (
    <section className="py-20 ai-gradient-bg relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm mb-4 border border-white/50 cursor-pointer">
            <FaGoogle className="text-red-500 text-xl" />
            <span className="font-bold text-gray-700">{t.googleRating}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading">{t.heading}</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={t.reviews.length > 2}
          centeredSlides={false}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper !pb-16 !px-2"
        >
          {t.reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <div className="bg-white rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] h-full flex flex-col border border-gray-100 hover:shadow-xl transition-all">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < review.rating ? 'text-yellow-400' : 'text-gray-200'}
                      size={14}
                    />
                  ))}
                </div>

                {/* Quote */}
                <FaQuoteLeft className="text-dveinBlue/20 text-3xl mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed flex-grow italic">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-dveinBlue to-dveinGreen flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
