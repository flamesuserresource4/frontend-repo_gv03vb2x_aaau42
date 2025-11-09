import { useState } from 'react';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';
import DailyMoodCard from './components/DailyMoodCard';

function App() {
  const [nickname] = useState('Mentra Explorer');
  const [stats, setStats] = useState({ streak: 5, xp: 720, badges: 4 });

  const handleAction = (label) => {
    alert(`${label} coming soon in this sandbox demo!`);
  };

  const handleMoodSubmit = ({ mood, note }) => {
    // This demo just updates local XP; in the full app this would call backend
    setStats((s) => ({ ...s, xp: s.xp + 10 }));
    alert(`Saved mood: ${mood}${note ? ` — note: ${note}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 space-y-6">
        <GreetingHeader nickname={nickname} />
        <StatsStrip streak={stats.streak} xp={stats.xp} badges={stats.badges} />
        <QuickActions onAction={handleAction} />
        <DailyMoodCard onSubmit={handleMoodSubmit} />
        <footer className="text-center text-xs text-gray-500 py-6">
          MentraCare • A calm space for mindful growth
        </footer>
      </div>
    </div>
  );
}

export default App;
