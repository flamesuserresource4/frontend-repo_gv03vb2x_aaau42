import { useState } from 'react';

const moods = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😕', label: 'Meh' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😤', label: 'Stressed' },
];

export default function DailyMoodCard({ onSubmit }) {
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (!selected) return;
    onSubmit?.({ mood: selected.label, note });
    setSelected(null);
    setNote('');
  };

  return (
    <div className="rounded-2xl p-6 bg-white shadow border border-gray-100">
      <h3 className="text-lg font-semibold mb-3">How are you feeling today?</h3>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {moods.map((m) => (
          <button
            key={m.label}
            className={`flex flex-col items-center gap-1 rounded-xl p-2 border transition-colors ${
              selected?.label === m.label ? 'bg-indigo-50 border-indigo-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => setSelected(m)}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-xs text-gray-600">{m.label}</span>
          </button>
        ))}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a quick note (optional)"
        className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
        >
          Save Mood
        </button>
      </div>
    </div>
  );
}
