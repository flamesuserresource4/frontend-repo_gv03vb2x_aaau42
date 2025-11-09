import React from 'react';
import { Activity, Clock, Users } from 'lucide-react';

const items = [
  { label: 'Active Sessions', value: '12', icon: Activity, color: 'text-emerald-500' },
  { label: 'Avg. Response', value: '230ms', icon: Clock, color: 'text-amber-500' },
  { label: 'Community', value: '1,248', icon: Users, color: 'text-sky-500' },
];

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
