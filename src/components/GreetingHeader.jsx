import React from 'react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function GreetingHeader({ name = 'Explorer' }) {
  const greeting = getGreeting();
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          {greeting}, <span className="text-emerald-300">{name}</span>
        </h2>
        <p className="text-white/60 text-sm">Here’s a quick look at what’s happening today.</p>
      </div>
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/80 text-xs ring-1 ring-white/10">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        Status: All systems operational
      </div>
    </div>
  );
}
