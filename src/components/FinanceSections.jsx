import React, { useEffect, useRef } from 'react';

function useParallax(ref, speed = 0.1) {
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

const MiniChart = () => (
  <div className="h-24 w-full rounded-lg border border-white/10 bg-white/5 p-2">
    <div className="flex h-full items-end gap-1">
      {[8,16,10,20,14,26,18,24,16,30,22,26].map((h, i) => (
        <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-blue-600/60 to-cyan-400/60" style={{ height: `${h * 3}px` }} />
      ))}
    </div>
  </div>
);

const FinanceSections = () => {
  const slowRef = useRef(null);
  const fastRef = useRef(null);

  useParallax(slowRef, 0.06);
  useParallax(fastRef, 0.12);

  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div ref={slowRef} className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Account Overview</h3>
                <p className="text-sm text-blue-100/80">Balances across linked accounts</p>
              </div>
              <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-xs text-emerald-300">+2.4% Today</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-blue-100">
              <div>
                <p className="text-xs text-blue-200/70">Checking</p>
                <p className="mt-1 text-xl font-medium text-white">$12,420</p>
              </div>
              <div>
                <p className="text-xs text-blue-200/70">Savings</p>
                <p className="mt-1 text-xl font-medium text-white">$38,910</p>
              </div>
              <div>
                <p className="text-xs text-blue-200/70">Investments</p>
                <p className="mt-1 text-xl font-medium text-white">$128,300</p>
              </div>
            </div>
            <div className="mt-6">
              <MiniChart />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Spending Breakdown</h3>
            <p className="mt-1 text-sm text-blue-100/80">Month to date</p>
            <div className="mt-6 grid grid-cols-4 gap-3 text-center text-blue-100">
              {[
                { label: 'Bills', v: 42 },
                { label: 'Food', v: 24 },
                { label: 'Travel', v: 18 },
                { label: 'Other', v: 16 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-400/30 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-slate-900/40 text-white">
                      {s.v}%
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-blue-200/80">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={fastRef} className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
            <p className="mt-1 text-sm text-blue-100/80">YTD Returns</p>
            <div className="mt-6">
              <MiniChart />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-blue-100/90">
              <div className="rounded-lg border border-white/10 bg-slate-900/40 p-3">
                <p className="text-blue-200/70">S&P 500</p>
                <p className="mt-1 text-white">+13.2%</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-slate-900/40 p-3">
                <p className="text-blue-200/70">NASDAQ</p>
                <p className="mt-1 text-white">+18.6%</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white">Upcoming Payments</h3>
            <ul className="mt-4 space-y-3 text-blue-100/90">
              {[
                { name: 'Mortgage', date: 'Apr 28', amt: '$1,950' },
                { name: 'Amex Platinum', date: 'May 02', amt: '$620' },
                { name: 'Car Lease', date: 'May 10', amt: '$410' },
              ].map((p) => (
                <li key={p.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-900/40 p-3">
                  <div>
                    <p className="font-medium text-white">{p.name}</p>
                    <p className="text-xs text-blue-200/70">Due {p.date}</p>
                  </div>
                  <span className="text-white">{p.amt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinanceSections;
