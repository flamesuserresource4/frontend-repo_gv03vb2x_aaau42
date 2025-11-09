import React, { useEffect, useState } from 'react';
import HeroScene from './components/HeroScene';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';
import AuthGate from './components/AuthGate';
import PrivateDashboard from './components/PrivateDashboard';

// Main App: public dashboard always visible, private dashboard gated without external services.
export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    setIsAuthed(localStorage.getItem('demo_authed') === 'true');
    const onStorage = () => setIsAuthed(localStorage.getItem('demo_authed') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <HeroScene />

        <GreetingHeader name={isAuthed ? 'Member' : 'Explorer'} />

        <StatsStrip />

        <QuickActions />

        {/* Private dashboard section (behind lightweight AuthGate) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Private Dashboard</h3>
            {isAuthed && (
              <button
                onClick={() => {
                  localStorage.setItem('demo_authed', 'false');
                  setIsAuthed(false);
                }}
                className="text-xs px-3 py-1 rounded-lg bg-white/5 text-white ring-1 ring-white/10 hover:bg-white/10"
              >
                Sign out
              </button>
            )}
          </div>
          <AuthGate>
            <PrivateDashboard />
          </AuthGate>
        </section>

        {/* Example content sections to ensure quick actions have scroll targets */}
        <div id="get-started" className="pt-16">
          <h3 className="text-xl font-semibold text-white mb-2">Get Started</h3>
          <p className="text-white/70 text-sm">
            Explore the live dashboard. Everything is configured to render instantly and reliably in any
            environment. You can enable the private view above without any external configuration.
          </p>
        </div>
        <div id="highlights" className="pt-12">
          <h3 className="text-xl font-semibold text-white mb-2">Highlights</h3>
          <ul className="list-disc pl-5 text-white/70 text-sm space-y-1">
            <li>Fast, responsive layout powered by Tailwind CSS</li>
            <li>3D hero section built with Spline (non-blocking)</li>
            <li>Accessible, keyboard-friendly controls</li>
          </ul>
        </div>
        <div id="overview" className="pt-12 pb-16">
          <h3 className="text-xl font-semibold text-white mb-2">Overview</h3>
          <p className="text-white/70 text-sm">
            This app is ready for deployment. No external configuration is required for the current public
            experience. When you’re ready, we can hook up real persistence and auth without breaking the public view.
          </p>
        </div>
      </div>
    </div>
  );
}
