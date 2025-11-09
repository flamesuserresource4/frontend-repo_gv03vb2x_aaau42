import { useEffect, useState } from 'react';
import { api } from '../lib/supabaseClient';

export default function SupabaseBackedJournal({ user }) {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const data = await api.listJournal(user.id, 20);
    setEntries(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await api.addJournal(user.id, text.trim());
      setText('');
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="journal" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Journal</h2>
        <button onClick={load} className="text-xs text-indigo-600 hover:underline">Refresh</button>
      </div>

      <div className="space-y-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          placeholder="Write a quick reflection..."
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end">
          <button onClick={submit} disabled={loading} className="inline-flex items-center rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm shadow hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {entries.map((e) => (
          <div key={e.id} className="py-3">
            <div className="text-sm text-slate-800 whitespace-pre-wrap">{e.content}</div>
          </div>
        ))}
        {!entries.length && (
          <p className="py-4 text-sm text-slate-500">No entries yet. Your private space to reflect.</p>
        )}
      </div>
    </div>
  );
}
