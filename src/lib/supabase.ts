import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type GameStyle = 'competitive' | 'casual' | 'puzzle' | 'quiz' | 'adventure';
export type ThemeName = 'temple-gold' | 'forest-green' | 'midnight' | 'rose-dusk';

export interface Profile {
  id: string;
  display_name: string;
  reading_age: number;
  game_style: string;
  interests: string[];
  preferred_topics: string[];
  onboarding_complete: boolean;
  theme: string;
  streak: number;
  avatar_id: string;
  avatar_style: string;
  total_score: number;
  player_level: number;
  language: string;
  learning_preference: string;
  last_played: string | null;
  created_at: string;
  updated_at: string;
}

export interface GameProgress {
  id: string;
  user_id: string;
  game_id: string;
  level_reached: number;
  highest_score: number;
  total_plays: number;
  last_played: string | null;
  created_at: string;
}
