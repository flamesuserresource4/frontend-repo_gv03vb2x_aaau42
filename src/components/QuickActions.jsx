import React from 'react';
import { Rocket, Star, Home } from 'lucide-react';

const actions = [
  { label: 'Get Started', icon: Rocket },
  { label: 'Highlights', icon: Star },
  { label: 'Overview', icon: Home },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur px-4 py-3 text-left shadow-sm hover:shadow md:hover:-translate-y-0.5 transition-all"
          onClick={() => {
            const id = label.toLowerCase().replace(/\s+/g, '-');
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-600">
              <Icon className="h-5 w-5" />
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
