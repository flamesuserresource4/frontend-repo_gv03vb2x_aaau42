import React from 'react';
import { Rocket, Star, Home } from 'lucide-react';

const ActionButton = ({ icon: Icon, label, href }) => (
  <a
    href={href}
    onClick={(e) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }}
    className="group flex items-center gap-3 p-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-white hover:bg-white/10 transition-colors"
  >
    <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center group-hover:bg-white/15">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-white/60">Jump to section</div>
    </div>
  </a>
);

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <ActionButton icon={Rocket} label="Get Started" href="#get-started" />
      <ActionButton icon={Star} label="Highlights" href="#highlights" />
      <ActionButton icon={Home} label="Overview" href="#overview" />
    </div>
  );
}
