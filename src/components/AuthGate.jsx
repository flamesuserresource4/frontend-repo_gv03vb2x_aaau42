import React, { useEffect, useState } from 'react';

// Lightweight, client-side auth gate that keeps public content visible
// and reveals private sections after a mock sign-in. Storage is guarded
// so the UI still renders in privacy-restricted environments.
export default function AuthGate({ children }) {
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const flag = localStorage.getItem('demo_authed') === 'true';
      setAuthed(flag);
      const onStorage = () => setAuthed(localStorage.getItem('demo_authed') === 'true');
      window.addEventListener('storage', onStorage);
      setLoading(false);
      return () => window.removeEventListener('storage', onStorage);
    } catch (e) {
      // Storage might be blocked; continue without persistence
      setLoading(false);
    }
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
          try { localStorage.setItem('demo_authed', 'true'); } catch (_) {}
          setAuthed(true);
        }}
        className="mt-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
      >
        Enable Private View
      </button>
    </div>
  );
}
