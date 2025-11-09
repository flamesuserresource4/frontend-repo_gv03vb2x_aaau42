import { useEffect, useState } from 'react';
import GreetingHeader from './components/GreetingHeader';
import StatsStrip from './components/StatsStrip';
import QuickActions from './components/QuickActions';
import DailyMoodCard from './components/DailyMoodCard';
import HeroScene from './components/HeroScene';
import MindfulZone from './components/MindfulZone';
import GamesHub from './components/GamesHub';
import AuthGate from './components/AuthGate';
import SupabaseBackedPeerWall from './components/SupabaseBackedPeerWall';
import SupabaseBackedJournal from './components/SupabaseBackedJournal';
import { supabase } from './lib/supabaseClient';

function App() {
  const [nickname] = useState('Mentra Explorer');
  const [stats, setStats] = useState({ streak: 5, xp: 720, badges: 4 });

  // Warm up (no-op if not using backend)
  useEffect(() => {
    // If you want realtime in Peer Wall with Supabase, you could add it here
    if (!supabase) return;
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
    // Optionally: write mood to Supabase via RPC/table
  };

  return (
    <AuthGate>
      {(user) => (
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
              <SupabaseBackedJournal user={user} />
            </section>

            <section id="peer">
              <SupabaseBackedPeerWall user={user} />
            </section>

            <section>
              <MindfulZone />
            </section>

            <section>
              <GamesHub />
            </section>

            <footer className="text-center text-xs text-gray-500 py-6">
              MentraCare • A calm space for mindful growth
            </footer>
          </div>
        </div>
      )}
    </AuthGate>
  );
}

export default App;
