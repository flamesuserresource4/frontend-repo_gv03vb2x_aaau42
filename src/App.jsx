import { useEffect, useState } from 'react';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';
import DailyMoodCard from './components/DailyMoodCard';
import PeerWallFeed from './components/PeerWallFeed';
import HeroScene from './components/HeroScene';
import JournalPanel from './components/JournalPanel';
import MindfulZone from './components/MindfulZone';
import GamesHub from './components/GamesHub';
import MentraBotChat from './components/MentraBotChat';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function App() {
  const [nickname] = useState('Mentra Explorer');
  const [stats, setStats] = useState({ streak: 5, xp: 720, badges: 4 });

  useEffect(() => {
    fetch(`${API_BASE}/`).catch(()=>{});
  }, []);

  const handleAction = (label) => {
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
    if (id) {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleMoodSubmit = async ({ mood, note }) => {
    setStats((s) => ({ ...s, xp: s.xp + 10 }));
    try {
      await fetch(`${API_BASE}/moods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo-user', mood, note }),
      });
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-6xl p-4 sm:p-6 space-y-6">
        <HeroScene />
        <GreetingHeader nickname={nickname} />
        <StatsStrip streak={stats.streak} xp={stats.xp} badges={stats.badges} />
        <QuickActions onAction={handleAction} />

        <section id="mood">
          <DailyMoodCard onSubmit={handleMoodSubmit} />
        </section>

        <section>
          <JournalPanel />
        </section>

        <section>
          <MindfulZone />
        </section>

        <section id="peer">
          <PeerWallFeed />
        </section>

        <section>
          <GamesHub />
        </section>

        <section>
          <MentraBotChat />
        </section>

        <footer className="text-center text-xs text-gray-500 py-6">
          MentraCare • A calm space for mindful growth
        </footer>
      </div>
    </div>
  );
}

export default App;
