import { useMemo } from 'react';
import { Sun, Moon, CloudSun } from 'lucide-react';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return { text: 'Good Night', icon: Moon };
  if (hour < 12) return { text: 'Good Morning', icon: Sun };
  if (hour < 18) return { text: 'Good Afternoon', icon: CloudSun };
  return { text: 'Good Evening', icon: Moon };
}

export default function GreetingHeader({ nickname = 'Explorer' }) {
  const { text, icon: Icon } = useMemo(() => getGreeting(), []);

  const quotes = [
    'Small steps today, strong mind tomorrow.',
    'Your feelings are valid. Your growth is real.',
    'Breathe in calm, breathe out stress.',
    'You are doing better than you think.',
  ];
  const quote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-lg">
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden>
        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-12 -left-6 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
      </div>
      <div className="relative flex items-start gap-4">
        <div className="shrink-0 p-3 rounded-xl bg-white/20 backdrop-blur">
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
            {text}, {nickname} 👋
          </h1>
          <p className="mt-1 text-white/90 max-w-2xl">
            {quote}
          </p>
        </div>
      </div>
    </div>
  );
}
