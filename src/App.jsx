import React, { useEffect, useState } from 'react';
import HeroScene from './components/HeroScene';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';
import AuthGate from './components/AuthGate';
import PrivateDashboard from './components/PrivateDashboard';
import ErrorBoundary from './components/ErrorBoundary';

// Main App: public dashboard always visible, private dashboard gated without external services.
export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const flag = localStorage.getItem('demo_authed') === 'true';
      setIsAuthed(flag);
      const onStorage = () => setIsAuthed(localStorage.getItem('demo_authed') === 'true');
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    } catch (e) {
      // localStorage may be blocked; keep public UI visible regardless
      // eslint-disable-next-line no-console
      console.warn('Storage not available, continuing without persistence');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 px-3 py-2 rounded bg-emerald-600">Skip to content</a>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8" id="content">
        <ErrorBoundary>
          <HeroScene />
        </ErrorBoundary>

        <ErrorBoundary>
          <GreetingHeader name={isAuthed ? 'Member' : 'Explorer'} />
        </ErrorBoundary>

        <ErrorBoundary>
          <StatsStrip />
        </ErrorBoundary>

        <ErrorBoundary>
          <QuickActions />
        </ErrorBoundary>

        {/* Private dashboard section (behind lightweight AuthGate) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Private Dashboard</h3>
            {mounted && isAuthed && (
              <button
                onClick={() => {
                  try {
                    localStorage.setItem('demo_authed', 'false');
                  } catch (_) {}
                  setIsAuthed(false);
                }}
                className="text-xs px-3 py-1 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
              >
                Sign out
              </button>
            )}
          </div>
          <ErrorBoundary>
            <AuthGate>
              <PrivateDashboard />
            </AuthGate>
          </ErrorBoundary>
        </section>

        {/* Ensure quick actions have scroll targets and always-visible fallback content */}
        <div id="get-started" className="pt-16">
          <h3 className="text-xl font-semibold mb-2">Get Started</h3>
          <p className="text-white/80 text-sm">
            Explore the live dashboard. Everything is configured to render instantly and reliably.
            You can enable the private view above without any external configuration.
          </p>
        </div>
        <div id="highlights" className="pt-12">
          <h3 className="text-xl font-semibold mb-2">Highlights</h3>
          <ul className="list-disc pl-5 text-white/80 text-sm space-y-1">
            <li>Fast, responsive layout powered by Tailwind CSS</li>
            <li>3D hero section built with Spline (non-blocking)</li>
            <li>Accessible, keyboard-friendly controls</li>
          </ul>
        </div>
        <div id="overview" className="pt-12 pb-16">
          <h3 className="text-xl font-semibold mb-2">Overview</h3>
          <p className="text-white/80 text-sm">
            This app is ready for iteration. No external configuration is required for the current public
            experience. When you’re ready, we can hook up real persistence and auth without breaking the public view.
          </p>
        </div>
      </div>
    </div>
  );
}
