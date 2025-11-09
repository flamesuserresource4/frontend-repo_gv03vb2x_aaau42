import React from 'react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function GreetingHeader({ name = 'Explorer' }) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {getGreeting()}, {name}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm">Here’s what’s happening today.</p>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/50 dark:border-slate-700 px-2 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Status: Online
        </span>
      </div>
    </div>
  );
}
