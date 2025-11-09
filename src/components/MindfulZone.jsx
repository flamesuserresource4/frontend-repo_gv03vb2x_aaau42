import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

const presets = [
  { id: 'breathe-box', title: 'Box Breathing', duration: 60, steps: ['Inhale 4s', 'Hold 4s', 'Exhale 4s', 'Hold 4s'] },
  { id: 'body-scan', title: 'Mini Body Scan', duration: 120, steps: ['Head', 'Shoulders', 'Arms', 'Chest', 'Legs', 'Feet'] },
];

export default function MindfulZone() {
  const [active, setActive] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const start = (p) => {
    setActive(p);
    setElapsed(0);
    setRunning(true);
  };

  const stop = async () => {
    setRunning(false);
    if (active) {
      try {
        await fetch(`${API_BASE}/mindfulness/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: 'demo-user', type: active.id, duration: elapsed })
        });
      } catch (e) {}
    }
  };

  return (
    <div id="mindful" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Mindful Zone</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {presets.map((p) => (
          <button key={p.id} onClick={() => start(p)} className={`rounded-xl border p-4 text-left hover:border-indigo-400 ${active?.id === p.id ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'}`}>
            <div className="font-medium text-slate-800">{p.title}</div>
            <div className="text-xs text-slate-500">~{Math.round(p.duration / 60)} min • {p.steps.length} steps</div>
          </button>
        ))}
      </div>

      {active && (
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-indigo-900">{active.title}</div>
              <div className="text-xs text-indigo-700">{elapsed}s elapsed</div>
            </div>
            <div className="flex gap-2">
              {!running ? (
                <button onClick={() => setRunning(true)} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm">Resume</button>
              ) : (
                <button onClick={() => setRunning(false)} className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-sm">Pause</button>
              )}
              <button onClick={stop} className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700 text-sm">End</button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {active.steps.map((s, i) => (
              <div key={i} className="rounded-lg bg-white/70 border border-indigo-100 px-3 py-2 text-xs text-indigo-900">{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
