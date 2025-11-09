import { Flame, Star, Medal } from 'lucide-react';

export default function StatsStrip({ streak = 3, xp = 420, badges = 2 }) {
  const items = [
    { label: 'Streak', value: `${streak} days`, icon: Flame, color: 'bg-orange-100 text-orange-700' },
    { label: 'XP', value: xp, icon: Star, color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Badges', value: badges, icon: Medal, color: 'bg-indigo-100 text-indigo-700' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className={`flex items-center gap-3 rounded-xl p-4 ${color}`}>
          <span className="p-2 rounded-lg bg-white/60">
            <Icon className="w-5 h-5" />
          </span>
          <div>
            <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
            <div className="text-sm font-semibold">{value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
