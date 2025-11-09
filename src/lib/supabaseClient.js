import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// Fallback local storage utilities for demo mode
const DEMO_USER = { id: 'demo-user', email: 'demo@mentra.care' };

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

export const api = {
  // Auth
  async getSession() {
    if (supabase) {
      const { data } = await supabase.auth.getSession();
      return data.session;
    }
    // demo
    const demo = lsGet('mentra_demo_session', { user: DEMO_USER });
    return { user: demo.user };
  },
  async onAuthStateChange(callback) {
    if (supabase) {
      return supabase.auth.onAuthStateChange((_event, session) => callback(session));
    }
    // demo: no-op subscription
    callback({ user: DEMO_USER });
    return { data: { subscription: { unsubscribe: () => {} } } };
  },
  async signInWithEmail(email, password) {
    if (supabase) {
      return supabase.auth.signInWithPassword({ email, password });
    }
    lsSet('mentra_demo_session', { user: DEMO_USER });
    return { data: { user: DEMO_USER }, error: null };
  },
  async signUp(email, password) {
    if (supabase) {
      return supabase.auth.signUp({ email, password });
    }
    lsSet('mentra_demo_session', { user: DEMO_USER });
    return { data: { user: DEMO_USER }, error: null };
  },
  async signOut() {
    if (supabase) {
      return supabase.auth.signOut();
    }
    lsSet('mentra_demo_session', null);
    return { error: null };
  },

  // Journal
  async listJournal(userId, limit = 20) {
    if (supabase) {
      const { data, error } = await supabase
        .from('journal')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    }
    const items = lsGet('mentra_journal', []);
    return items.filter(i => i.user_id === userId).sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);
  },
  async addJournal(userId, content) {
    const entry = { id: crypto.randomUUID(), user_id: userId, content, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('journal').insert(entry).select('*').single();
      if (error) throw error;
      return data;
    }
    const list = lsGet('mentra_journal', []);
    list.unshift(entry);
    lsSet('mentra_journal', list);
    return entry;
  },

  // Peer wall
  async listPeerPosts(limit = 30) {
    if (supabase) {
      const { data, error } = await supabase
        .from('peer_post')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      if (error) throw error;
      return data;
    }
    const posts = lsGet('mentra_peer_posts', []);
    return posts.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);
  },
  async addPeerPost(userId, display_name, message) {
    const post = { id: crypto.randomUUID(), user_id: userId, display_name, message, created_at: new Date().toISOString() };
    if (supabase) {
      const { data, error } = await supabase.from('peer_post').insert(post).select('*').single();
      if (error) throw error;
      return data;
    }
    const list = lsGet('mentra_peer_posts', []);
    list.unshift(post);
    lsSet('mentra_peer_posts', list);
    return post;
  },
};

export { supabase };