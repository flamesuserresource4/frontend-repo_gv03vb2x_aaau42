import React from 'react';
import HeroScene from './components/HeroScene';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';

// Main App: visible and functional for everyone with no external env requirements.
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <HeroScene />

        <GreetingHeader name="Friend" />

        <StatsStrip />

        <QuickActions />

        {/* Example content sections to ensure quick actions have scroll targets */}
        <div id="get-started" className="pt-16">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">Get Started</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Explore the live dashboard. Everything is configured to render instantly and reliably in any
            environment. You can extend this with authenticated views without affecting public visibility.
          </p>
        </div>
        <div id="highlights" className="pt-12">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">Highlights</h3>
          <ul className="list-disc pl-5 text-slate-600 dark:text-slate-300 text-sm space-y-1">
            <li>Fast, responsive layout powered by Tailwind CSS</li>
            <li>3D hero section built with Spline (non-blocking)</li>
            <li>Accessible, keyboard-friendly controls</li>
          </ul>
        </div>
        <div id="overview" className="pt-12 pb-16">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">Overview</h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            This app is ready for deployment. No external configuration is required for the current public
            experience. When you’re ready, we can enable the authenticated dashboard and persistent data.
          </p>
        </div>
      </div>
    </div>
  );
}
