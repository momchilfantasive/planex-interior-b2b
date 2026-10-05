'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type PortfolioProject = {
  title: string;
  place: string;
  kind: string;
  image: string;
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

export default function PortfolioGallery({ projects }: PortfolioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeProject = activeIndex === null ? null : projects[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activeIndex !== null && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (activeIndex === null && dialog?.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function moveProject(direction: -1 | 1) {
    setActiveIndex(index => index === null ? null : (index + direction + projects.length) % projects.length);
  }

  return <>
    <div className="portfolioGrid">
      {projects.map((project, index) => <button
        className="portfolioCard"
        key={`${project.title}-${project.place}-${index}`}
        type="button"
        onClick={() => setActiveIndex(index)}
        aria-label={`Отворете ${project.kind}: ${project.title}, ${project.place}`}
      >
        <span className="portfolioImage">
          <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={index < 3} />
          <span className="portfolioTag">{project.kind}</span>
          <span className="portfolioOpenHint" aria-hidden="true">⤢</span>
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
      aria-label="Галерия с проекти"
      onClose={() => setActiveIndex(null)}
      onClick={event => {
        const dialog = event.currentTarget;
        const content = dialog.querySelector('.portfolioLightboxContent');
        const stage = dialog.querySelector('.portfolioLightboxStage');
        if (event.target === dialog || event.target === content || event.target === stage) {
          setActiveIndex(null);
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

          if (!isInsideImage) setActiveIndex(null);
        }
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          moveProject(-1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          moveProject(1);
        }
      }}
    >
      {activeProject && activeIndex !== null && <div className="portfolioLightboxContent">
        <div className="portfolioLightboxTop">
          <span className="portfolioLightboxKind">{activeProject.kind}</span>
          <button className="portfolioLightboxClose" type="button" onClick={() => setActiveIndex(null)} ref={closeButtonRef} aria-label="Затворете галерията">×</button>
        </div>
        <div className="portfolioLightboxStage">
          <Image className="portfolioLightboxImage" src={activeProject.image} alt={`${activeProject.kind}: ${activeProject.title}, ${activeProject.place}`} fill sizes="100vw" priority />
          <button className="portfolioLightboxArrow portfolioLightboxPrevious" type="button" onClick={() => moveProject(-1)} aria-label="Предишен проект">‹</button>
          <button className="portfolioLightboxArrow portfolioLightboxNext" type="button" onClick={() => moveProject(1)} aria-label="Следващ проект">›</button>
        </div>
        <div className="portfolioLightboxCaption" aria-live="polite">
          <div>
            <h2>{activeProject.title}</h2>
            <p><LocationPin />{activeProject.place}</p>
          </div>
          <span className="portfolioLightboxCount">{activeIndex + 1} / {projects.length}</span>
        </div>
      </div>}
    </dialog>
  </>;
}
