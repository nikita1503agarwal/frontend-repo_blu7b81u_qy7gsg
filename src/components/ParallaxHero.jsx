import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

// Lightweight, performant parallax using requestAnimationFrame
function useParallax(ref, speed = 0.2) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    let latestY = window.scrollY;
    let ticking = false;

    const update = () => {
      const translate = Math.round(latestY * speed);
      el.style.transform = `translate3d(0, ${translate}px, 0)`;
      ticking = false;
    };

    const onScroll = () => {
      latestY = window.scrollY;
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.cancelAnimationFrame(rafId);
    };
  }, [ref, speed]);
}

const ParallaxHero = () => {
  const bgRef = useRef(null);
  const midRef = useRef(null);
  const fgRef = useRef(null);

  // Different speeds create depth — smaller = farther away
  useParallax(bgRef, 0.08);
  useParallax(midRef, 0.14);
  useParallax(fgRef, 0.22);

  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-slate-950">
      {/* Spline 3D cover background */}
      <div ref={bgRef} className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlays for readability */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-slate-950/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(15,23,42,0.0),rgba(15,23,42,0.6))]" />

      {/* Midground floating accents */}
      <div ref={midRef} className="absolute inset-0">
        <div className="absolute right-8 top-24 h-28 w-28 rounded-2xl bg-cyan-400/10 blur-2xl" />
        <div className="absolute left-10 bottom-24 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
      </div>

      {/* Foreground content */}
      <div ref={fgRef} className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6 sm:px-10">
        <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100 backdrop-blur">
          Premium Finance Platform
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
          Smooth Parallax for Modern Fintech
        </h1>
        <p className="mt-4 max-w-2xl text-blue-100/90">
          A subtle, high‑performance scroll effect designed for dashboards, analytics,
          and investor‑grade experiences.
        </p>
        <div className="mt-8 flex items-center gap-3">
          <button className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-400">
            Get Started
          </button>
          <button className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/10">
            View Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
