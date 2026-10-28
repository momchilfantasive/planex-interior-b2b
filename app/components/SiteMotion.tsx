'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function setupMotion() {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add({
        motion: '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 761px)',
      }, context => {
        if (!context.conditions?.motion) return;

        const heroVideo = document.querySelector<HTMLVideoElement>('video.heroVideo');
        let heroVisible = true;
        const lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -24 },
          // Pause before Lenis applies the wheel, so the video frame is not
          // composited inside the same scroll update.
          virtualScroll: () => {
            if (heroVideo && heroVisible && !heroVideo.paused) heroVideo.pause();
            return true;
          },
          // The office carousel is horizontal. Letting it opt out of Lenis makes
          // the vertical wheel fall back to instant native scrolling while the
          // pointer is over the slides.
          prevent: element => element.closest('.portfolioLightbox, .mobileNavigation') !== null,
        });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        let heroScrolling = false;
        let heroScrollTimer = 0;
        let heroObserver: IntersectionObserver | undefined;
        const onHeroScroll = () => {
          heroScrolling = true;
          window.clearTimeout(heroScrollTimer);
          // A playing 1080p HEVC frame makes the browser's scroll update stall.
          // Freeze the film while the page is moving and resume once it settles.
          if (heroVideo && heroVisible && !heroVideo.paused) heroVideo.pause();
          heroScrollTimer = window.setTimeout(() => {
            heroScrolling = false;
            syncHeroPlayback();
          }, 160);
        };
        const syncHeroPlayback = () => {
          if (!heroVideo || disposed) return;
          const nearLoop = Number.isFinite(heroVideo.duration) && heroVideo.currentTime > heroVideo.duration - 0.8;
          if (!heroVisible || heroScrolling) {
            heroVideo.pause();
            return;
          }
          // Seeking this 1080p HEVC file back to the start blocks the main thread.
          // Do it only after the scroll animation has finished.
          if (heroVideo.ended || nearLoop) heroVideo.currentTime = 0;
          if (heroVideo.paused) heroVideo.play().catch(() => {});
        };
        if (heroVideo) {
          heroVideo.loop = false;
          const hero = heroVideo.closest('.hero');
          if (hero) {
            heroObserver = new IntersectionObserver(([entry]) => {
              heroVisible = entry.isIntersecting;
              syncHeroPlayback();
            }, { threshold: 0.2 });
            heroObserver.observe(hero);
          }
          heroVideo.addEventListener('ended', syncHeroPlayback);
          lenis.on('scroll', onHeroScroll);
        }

        document.querySelectorAll<HTMLElement>('main h1, main h2, [data-reveal]').forEach(target => {
          // Previously passed sections remain readable after navigation or resize.
          if (target.getBoundingClientRect().bottom <= 0) return;
          gsap.fromTo(target, { opacity: 0, y: 22 }, {
            opacity: 1,
            y: 0,
            duration: .85,
            ease: 'power2.out',
            scrollTrigger: { trigger: target, start: 'top 93%', once: true },
          });
        });

        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(frame => {
          const layer = frame.querySelector<HTMLElement>('[data-parallax-layer]');
          if (!layer) return;
          const distance = context.conditions?.desktop ? 5 : 2.5;
          gsap.fromTo(layer, { yPercent: -distance }, {
            yPercent: distance,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        const refresh = () => ScrollTrigger.refresh();
        const images = [...document.images].filter(image => !image.complete);
        images.forEach(image => image.addEventListener('load', refresh, { once: true }));
        document.fonts.ready.then(() => { if (!disposed) refresh(); });
        refresh();

        return () => {
          images.forEach(image => image.removeEventListener('load', refresh));
          window.clearTimeout(heroScrollTimer);
          heroObserver?.disconnect();
          heroVideo?.removeEventListener('ended', syncHeroPlayback);
          gsap.ticker.remove(tick);
          lenis.off('scroll', onHeroScroll);
          lenis.off('scroll', ScrollTrigger.update);
          lenis.destroy();
        };
      });

      cleanup = () => media.revert();
    }

    setupMotion().catch(error => console.error('Unable to initialize page motion:', error));
    return () => { disposed = true; cleanup?.(); };
  }, [pathname]);

  return null;
}
