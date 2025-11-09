import { useEffect, useRef, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function MentraBotChat() {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi, I’m MentraBot. How are you feeling today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/mentrabot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo-user', message: userMsg.content })
      });
      const data = await res.json();
      const reply = data?.reply || 'Thanks for sharing. I’m here to listen.';
      setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', content: 'I’m having trouble connecting right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="bot" className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">MentraBot</h2>
      </div>
      <div ref={listRef} className="h-56 overflow-auto rounded-lg border border-slate-100 p-3 space-y-2 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`${m.role === 'assistant' ? 'bg-white' : 'bg-indigo-600 text-white'} rounded-lg px-3 py-2 text-sm max-w-[80%] ${m.role === 'assistant' ? '' : 'ml-auto'}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button onClick={send} disabled={loading} className="rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm shadow hover:bg-indigo-700 disabled:opacity-50">Send</button>
      </div>
    </div>
  );
}
