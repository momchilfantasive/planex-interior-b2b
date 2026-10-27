'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { A11y, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export type PortfolioImage = {
  src: string;
  alt?: string;
};

export type PortfolioProject = {
  id?: string;
  title: string;
  place: string;
  kind: string;
  image: string;
  alt?: string;
  gallery?: PortfolioImage[];
};

type PortfolioGalleryProps = {
  projects: PortfolioProject[];
};

function LocationPin() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>;
}

function getProjectSlides(project: PortfolioProject): PortfolioImage[] {
  const main: PortfolioImage = { src: project.image, alt: project.alt };
  return (project.gallery ?? []).filter(image => image.src && image.src !== main.src);
}

export default function PortfolioGallery({ projects }: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];
  const slides = activeProject ? getProjectSlides(activeProject) : [];
  const canSwipe = slides.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
      requestAnimationFrame(() => swiperRef.current?.update());
    } else if (activeIndex === null && dialog?.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function openProject(index: number) {
    if (getProjectSlides(projects[index]).length === 0) return;
    setSlideIndex(0);
    setActiveIndex(index);
  }

  function closeProject() {
    setActiveIndex(null);
    setSlideIndex(0);
    swiperRef.current = null;
  }

  function moveSlide(direction: -1 | 1) {
    if (!canSwipe) return;
    if (direction < 0) swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  }

  return <>
    <div className="portfolioGrid">
      {projects.map((project, index) => <button
        className="portfolioCard"
        key={project.id ?? `${project.title}-${project.place}-${index}`}
        type="button"
        onClick={() => openProject(index)}
        aria-label={`Отворете ${project.kind}: ${project.title}, ${project.place}`}
      >
        <span className="portfolioImage">
          <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={index < 3} />
          <span className="portfolioTag">{project.kind}</span>
        </span>
        <span className="portfolioCaption">
          <span className="portfolioProjectTitle">{project.title}</span>
          <span className="portfolioLocation"><LocationPin />{project.place}</span>
        </span>
      </button>)}
    </div>

    <dialog
      className="portfolioLightbox"
      ref={dialogRef}
      aria-label={activeProject ? `Снимки от ${activeProject.title}` : 'Галерия с проекти'}
      onClose={() => closeProject()}
      onClick={event => {
        const dialog = event.currentTarget;
        const content = dialog.querySelector('.portfolioLightboxContent');
        const stage = dialog.querySelector('.portfolioLightboxStage');
        if (event.target === dialog || event.target === content || event.target === stage) {
          closeProject();
          return;
        }

        if (event.target instanceof HTMLImageElement && event.target.classList.contains('portfolioLightboxImage')) {
          const image = event.target;
          if (!image.naturalWidth || !image.naturalHeight) return;

          const bounds = image.getBoundingClientRect();
          const style = window.getComputedStyle(image);
          const left = bounds.left + Number.parseFloat(style.paddingLeft);
          const top = bounds.top + Number.parseFloat(style.paddingTop);
          const width = bounds.width - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight);
          const height = bounds.height - Number.parseFloat(style.paddingTop) - Number.parseFloat(style.paddingBottom);
          const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
          const renderedWidth = image.naturalWidth * scale;
          const renderedHeight = image.naturalHeight * scale;
          const renderedLeft = left + (width - renderedWidth) / 2;
          const renderedTop = top + (height - renderedHeight) / 2;
          const isInsideImage = event.clientX >= renderedLeft && event.clientX <= renderedLeft + renderedWidth
            && event.clientY >= renderedTop && event.clientY <= renderedTop + renderedHeight;

          if (!isInsideImage) closeProject();
        }
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          moveSlide(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          moveSlide(1);
        }
      }}
    >
      {activeProject && slides.length > 0 && <div className="portfolioLightboxContent">
        <div className="portfolioLightboxTop">
          <span className="portfolioLightboxKind">{activeProject.kind}</span>
          <button className="portfolioLightboxClose" type="button" onClick={() => closeProject()} ref={closeButtonRef} aria-label="Затворете галерията"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6 18 18M18 6 6 18" /></svg></button>
        </div>
        <div className="portfolioLightboxStage">
          <Swiper
            className="portfolioLightboxSwiper"
            modules={[A11y, Keyboard]}
            onSwiper={swiper => { swiperRef.current = swiper; }}
            onSlideChange={swiper => setSlideIndex(swiper.realIndex)}
            grabCursor={canSwipe}
            simulateTouch={canSwipe}
            allowTouchMove={canSwipe}
            keyboard={{ enabled: canSwipe }}
            loop={canSwipe}
            observer
            observeParents
            slidesPerView={1}
            spaceBetween={0}
            watchOverflow
            a11y={{
              enabled: true,
              prevSlideMessage: 'Предишна снимка',
              nextSlideMessage: 'Следваща снимка',
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={`${slide.src}-${index}`}>
                <div className="portfolioLightboxSlide">
                  <Image className="portfolioLightboxImage" src={slide.src} alt={slide.alt || `${activeProject.kind}: ${activeProject.title}, ${activeProject.place}`} fill sizes="100vw" priority={index === 0} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {canSwipe && <>
            <button className="portfolioLightboxArrow portfolioLightboxPrevious" type="button" onClick={() => moveSlide(-1)} aria-label="Предишна снимка"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg></button>
            <button className="portfolioLightboxArrow portfolioLightboxNext" type="button" onClick={() => moveSlide(1)} aria-label="Следваща снимка"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg></button>
          </>}
        </div>
        <div className="portfolioLightboxCaption" aria-live="polite">
          <div>
            <h2>{activeProject.title}</h2>
            <p><LocationPin />{activeProject.place}</p>
          </div>
          {canSwipe && <span className="portfolioLightboxCount">{slideIndex + 1} / {slides.length}</span>}
        </div>
      </div>}
    </dialog>
  </>;
}
