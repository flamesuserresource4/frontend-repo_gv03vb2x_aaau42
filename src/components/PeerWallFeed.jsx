import { useEffect, useState } from 'react';
import { Send, MessageCircle, ThumbsUp } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

export default function PeerWallFeed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const [moodTag, setMoodTag] = useState('');
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    try {
      const res = await fetch(`${API_BASE}/peer-wall`);
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      // ignore in demo
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const submitPost = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      await fetch(`${API_BASE}/peer-wall`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_text: text.trim(), mood_tag: moodTag || undefined }),
      });
      setText('');
      setMoodTag('');
      await loadPosts();
    } catch (e) {
      // ignore in demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white shadow border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><MessageCircle className="w-5 h-5"/> Anonymous Peer Wall</h3>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share a thought, encouragement, or feeling..."
          className="flex-1 rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          value={moodTag}
          onChange={(e) => setMoodTag(e.target.value)}
          placeholder="Mood tag (optional)"
          className="w-40 rounded-lg border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={submitPost}
          disabled={loading || !text.trim()}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm disabled:opacity-50"
        >
          <Send className="w-4 h-4"/> Post
        </button>
      </div>
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p._id} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
            <div className="text-sm text-gray-800">{p.post_text}</div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <span>{p.mood_tag ? `#${p.mood_tag}` : 'anonymous'}</span>
              <span className="inline-flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5"/> {p.likes || 0}</span>
            </div>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="text-sm text-gray-500">No posts yet. Be the first to share something kind.</div>
        )}
      </div>
    </div>
  );
}
