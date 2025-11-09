import React from 'react';
import { Activity, Clock, Users } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, delta, trend = 'up' }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-white">
    <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center">
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
    {delta && (
      <span className={`text-xs px-2 py-1 rounded-md ${trend === 'up' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-rose-400/15 text-rose-300'}`}>
        {trend === 'up' ? '▲' : '▼'} {delta}
      </span>
    )}
  </div>
);

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <StatCard icon={Activity} label="Active Sessions" value="128" delta="4%" trend="up" />
      <StatCard icon={Clock} label="Avg. Response" value="182 ms" delta="-2%" trend="down" />
      <StatCard icon={Users} label="Community" value="3,942" delta="+38" trend="up" />
    </div>
  );
}
