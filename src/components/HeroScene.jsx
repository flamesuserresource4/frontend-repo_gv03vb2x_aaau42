import Spline from '@splinetool/react-spline';

export default function HeroScene() {
  return (
    <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <Spline
        scene="https://prod.spline.design/6k1h3rHBwq2jVvV9/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,70,229,0.10),transparent_40%),_radial-gradient(circle_at_80%_30%,rgba(236,72,153,0.10),transparent_40%)]" />
      <div className="absolute bottom-4 left-4 right-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-800">MentraCare</h1>
          <p className="text-slate-600 text-sm md:text-base">Your calm companion for moods, reflections, and community support.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="#mood" className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm shadow hover:bg-indigo-700 transition-colors">Log today’s mood</a>
          <a href="#peer" className="inline-flex items-center gap-2 rounded-lg bg-white text-slate-700 px-4 py-2 text-sm border border-slate-200 shadow hover:bg-slate-50 transition-colors">Visit Peer Wall</a>
        </div>
      </div>
    </div>
  );
}
