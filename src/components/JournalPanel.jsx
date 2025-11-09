import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function JournalPanel() {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`${API_BASE}/journals?user_id=demo-user&limit=10`);
      const data = await res.json();
      setEntries(data?.items || data || []);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const submit = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/journals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo-user', content: text })
      });
      setText('');
      fetchEntries();
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="journal" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Journal</h2>
        <button onClick={fetchEntries} className="text-xs text-indigo-600 hover:underline">Refresh</button>
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
          <div key={e._id || e.id} className="py-3">
            <div className="text-sm text-slate-800 whitespace-pre-wrap">{e.content}</div>
            {e.sentiment && (
              <div className="mt-1 text-xs text-slate-500">Sentiment: {e.sentiment.label} ({Math.round((e.sentiment.score || 0) * 100)}%)</div>
            )}
          </div>
        ))}
        {!entries.length && (
          <p className="py-4 text-sm text-slate-500">No entries yet. Your private space to reflect.</p>
        )}
      </div>
    </div>
  );
}
