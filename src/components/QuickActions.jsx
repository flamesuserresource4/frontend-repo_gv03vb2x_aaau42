import { HeartPulse, NotebookPen, Gamepad2, Bot, Activity, ShieldAlert } from 'lucide-react';

const actions = [
  { label: 'Log Mood', icon: HeartPulse, color: 'from-rose-500 to-pink-500' },
  { label: 'Journal', icon: NotebookPen, color: 'from-amber-500 to-orange-500' },
  { label: 'Mindful Zone', icon: Activity, color: 'from-emerald-500 to-teal-500' },
  { label: 'Games Hub', icon: Gamepad2, color: 'from-sky-500 to-blue-600' },
  { label: 'MentraBot', icon: Bot, color: 'from-violet-500 to-purple-600' },
  { label: 'Emergency', icon: ShieldAlert, color: 'from-red-600 to-red-700' },
];

export default function QuickActions({ onAction }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {actions.map(({ label, icon: Icon, color }) => (
        <button
          key={label}
          onClick={() => onAction?.(label)}
          className={`group relative overflow-hidden rounded-xl p-4 text-left bg-gradient-to-br ${color} text-white shadow hover:shadow-lg transition-shadow`}
        >
          <div className="relative z-10 flex items-center gap-3">
            <span className="p-2 rounded-lg bg-white/20 backdrop-blur">
              <Icon className="w-5 h-5" />
            </span>
            <span className="font-medium">{label}</span>
          </div>
          <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/10 blur-2xl" />
        </button>
      ))}
    </div>
  );
}
