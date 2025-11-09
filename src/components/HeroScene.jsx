import React from 'react';
import Spline from '@splinetool/react-spline';

// A full-width hero with a 3D Spline scene and a soft gradient overlay.
export default function HeroScene() {
  return (
    <section className="relative w-full h-[460px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6qVJqkS0c0-hero-placeholder/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Soft overlay for readability; pointer-events-none to avoid blocking the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14),rgba(0,0,0,0.35))]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-white text-xs font-medium shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Preview Enabled
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-white">Welcome to Your Dashboard</h1>
        <p className="mt-3 max-w-2xl text-white/85 text-sm md:text-base">
          Smooth 3D visuals, clear metrics, and quick actions — everything you need at a glance.
        </p>
      </div>
    </section>
  );
}
