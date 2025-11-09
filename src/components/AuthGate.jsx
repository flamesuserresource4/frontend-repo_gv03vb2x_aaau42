import { useEffect, useState } from 'react';
import { api } from '../lib/supabaseClient';

export default function AuthGate({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('demo@mentra.care');
  const [password, setPassword] = useState('demo-demo');
  const [error, setError] = useState('');

  useEffect(() => {
    let unsub = { data: { subscription: { unsubscribe: () => {} } } };
    (async () => {
      const s = await api.getSession();
      setSession(s);
      setLoading(false);
      unsub = await api.onAuthStateChange(setSession);
    })();
    return () => unsub?.data?.subscription?.unsubscribe?.();
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await api.signInWithEmail(email, password);
    if (error) setError(error.message);
  };

  const signUp = async (e) => {
    e.preventDefault();
    setError('');
    const { error } = await api.signUp(email, password);
    if (error) setError(error.message);
  };

  const signOut = async () => {
    await api.signOut();
  };

  if (loading) return <div className="p-6 text-sm text-slate-600">Loading...</div>;
  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 p-4">
        <form onSubmit={signIn} className="w-full max-w-sm bg-white rounded-2xl p-6 shadow border border-slate-200 space-y-3">
          <h1 className="text-xl font-semibold text-slate-800">Welcome to MentraCare</h1>
          <p className="text-sm text-slate-600">Sign in or create an account to continue.</p>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-2">
            <button onClick={signIn} className="flex-1 rounded-lg bg-indigo-600 text-white px-4 py-2 text-sm">Sign In</button>
            <button onClick={signUp} type="button" className="flex-1 rounded-lg bg-white border border-slate-200 text-slate-800 px-4 py-2 text-sm">Sign Up</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="text-sm text-slate-700">Signed in as {session.user.email || session.user.id}</div>
        <button onClick={signOut} className="text-xs text-indigo-600">Sign out</button>
      </div>
      {children(session.user)}
    </div>
  );
}
