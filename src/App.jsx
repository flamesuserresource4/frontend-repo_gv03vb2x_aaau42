import { useState } from 'react';
import HeroScene from './components/HeroScene';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';

function App() {
  const [nickname] = useState('Mentra Explorer');
  const [stats, setStats] = useState({ streak: 3, xp: 420, badges: 2 });

  const handleAction = (label) => {
    // Lightweight demo actions so the page is interactive immediately
    if (label === 'Log Mood') {
      setStats((s) => ({ ...s, xp: s.xp + 10 }));
    }
    // Smooth scroll anchors if present
    const anchors = {
      'Log Mood': '#mood',
      'Journal': '#journal',
      'Mindful Zone': '#mindful',
      'Peer Wall': '#peer',
      'MentraBot': '#bot',
      'Games Hub': '#games',
      'Emergency': '#sos',
    };
    const id = anchors[label];
    if (id) document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 space-y-6">
        <HeroScene />
        <GreetingHeader nickname={nickname} />
        <StatsStrip streak={stats.streak} xp={stats.xp} badges={stats.badges} />
        <QuickActions onAction={handleAction} />

        <footer className="text-center text-xs text-gray-500 py-6">
          MentraCare • A calm space for mindful growth
        </footer>
      </div>
    </div>
  );
}

export default App;
