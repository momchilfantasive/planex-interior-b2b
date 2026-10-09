'use client';

import { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type OfficeProject = {
  image: string;
  title: string;
  place: string;
};

function LocationPin() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function OfficeCarousel({ offices }: { offices: OfficeProject[] }) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <>
      <div className="sectionHeader">
        <div>
          <p className="kicker">Бизнес пространства</p>
          <h2>Офиси и търговски площи с цялостна реализация</h2>
        </div>
        <div className="projectActions">
          <button type="button" onClick={() => swiperRef.current?.slidePrev()} aria-label="Предишни проекти">←</button>
          <button type="button" onClick={() => swiperRef.current?.slideNext()} aria-label="Следващи проекти">→</button>
        </div>
      </div>
      <Swiper
        className="officeCarousel"
        modules={[A11y]}
        onSwiper={swiper => { swiperRef.current = swiper; }}
        grabCursor
        simulateTouch
        watchOverflow
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={20}
        breakpoints={{
          901: { slidesPerView: 2, spaceBetween: 20 },
        }}
        a11y={{
          enabled: true,
          prevSlideMessage: 'Предишен проект',
          nextSlideMessage: 'Следващ проект',
        }}
      >
        {offices.map((project, index) => (
          <SwiperSlide key={project.title}>
            <article className={`projectCard office${index + 1}`}>
              <div className="projectImage" data-parallax>
                <div className="homeParallaxLayer" data-parallax-layer style={{ backgroundImage: `url('${project.image}')` }} />
                <span className="category">Офис интериор</span>
              </div>
              <div className="projectDetails">
                <div>
                  <h3>{project.title}</h3>
                  <p>Цялостна реализация</p>
                </div>
                <span className="projectLocation">
                  <LocationPin />
                  {project.place}
                </span>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
