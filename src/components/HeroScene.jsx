import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  const [failed, setFailed] = useState(false);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900/40 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        {!failed ? (
          <Spline
            scene="https://prod.spline.design/8X2uQeY1k0OykTn4/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),rgba(2,6,23,0.6))]" />
        )}
      </div>

      {/* Non-blocking gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

      <div className="relative z-10 h-full flex items-end p-6 md:p-10">
        <div className="max-w-3xl text-white">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-medium ring-1 ring-emerald-300/30">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
            Live
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight">Your Real‑Time Wellness Dashboard</h1>
          <p className="mt-3 text-white/80 text-sm md:text-base">Stay on top of your day with live metrics, guided focus tools, and a welcoming community. If 3D is blocked by your network, a graceful fallback is shown and the rest of the page remains fully usable.</p>
        </div>
      </div>
    </section>
  );
}
