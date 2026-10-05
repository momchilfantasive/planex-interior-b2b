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

        const lenis = new Lenis({
          duration: 1.05,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -24 },
          prevent: element => element.closest('.officeCarousel, .mobileNavigation') !== null,
        });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

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
          gsap.ticker.remove(tick);
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
