import React from 'react';
import { Activity, Brain, MessageSquare, Gamepad } from 'lucide-react';

function Card({ title, description, children }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 ring-1 ring-white/10 text-white">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-xs text-white/60">private</span>
      </div>
      <p className="text-sm text-white/70 mb-4">{description}</p>
      {children}
    </div>
  );
}

export default function PrivateDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card title="Focus Session" description="Start a 25‑minute Pomodoro with a single click.">
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500">
          <Activity className="h-4 w-4" /> Start Focus
        </button>
      </Card>

      <Card title="Mindfulness" description="Quick breathing exercise to reset your mind.">
        <div className="flex items-center gap-2 text-sm">
          <Brain className="h-4 w-4" /> 4‑7‑8 Breathing • 1 min
        </div>
      </Card>

      <Card title="Peer Wall" description="Post a short update to your private circle.">
        <div className="flex items-center gap-2 text-sm">
          <MessageSquare className="h-4 w-4" /> Share something positive today
        </div>
      </Card>

      <Card title="Mini Games" description="Take a tiny break and recharge.">
        <div className="flex items-center gap-2 text-sm">
          <Gamepad className="h-4 w-4" /> Memory Flip, Quick Math
        </div>
      </Card>
    </div>
  );
}
