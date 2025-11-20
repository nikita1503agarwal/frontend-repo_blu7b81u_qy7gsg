import React from 'react';
import ParallaxHero from './components/ParallaxHero';
import FinanceSections from './components/FinanceSections';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-blue-100">
      {/* Hero with subtle, professional parallax */}
      <ParallaxHero />

      {/* Finance content with layered parallax sections */}
      <FinanceSections />

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-blue-200/70">
          Built for performance • GPU-accelerated parallax • Responsive across devices
        </div>
      </footer>
    </div>
  );
}

export default App;
