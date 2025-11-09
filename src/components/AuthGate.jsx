import React, { useEffect, useState } from 'react';

// Lightweight, client-side auth gate that keeps public content visible
// and reveals private sections after a mock sign-in.
export default function AuthGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check persisted session flag (no external env needed)
    const flag = localStorage.getItem('demo_authed') === 'true';
    setAuthed(flag);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16 text-white/70">Loading…</div>
    );
  }

  if (authed) return <>{children}</>;

  return (
    <div className="p-6 rounded-xl bg-white/5 ring-1 ring-white/10 text-white">
      <h3 className="text-lg font-semibold">Sign in to see your private dashboard</h3>
      <p className="text-sm text-white/70 mt-1">The public sections remain visible. This demo sign-in does not require any external services.</p>
      <button
        onClick={() => {
          localStorage.setItem('demo_authed', 'true');
          setAuthed(true);
        }}
        className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
      >
        Enable Private View
      </button>
    </div>
  );
}
