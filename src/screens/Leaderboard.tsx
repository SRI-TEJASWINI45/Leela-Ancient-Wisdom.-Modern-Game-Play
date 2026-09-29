import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { getAvatar } from '@/lib/avatars';
import type { Page } from '@/App';
import { Trophy, Crown, Medal, ArrowLeft, Flame, Sparkles } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  avatar_id: string;
  total_score: number;
  streak: number;
}

interface LeaderboardProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function Leaderboard({ onBack, onNavigate }: LeaderboardProps) {
  const { profile } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_id, total_score, streak')
        .order('total_score', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Leaderboard fetch error:', error.message);
        setLoading(false);
        return;
      }

      setEntries((data as LeaderboardEntry[]) || []);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const myRank = entries.findIndex((e) => e.id === profile?.id) + 1;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Trophy size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Leaderboard</h1>
        </div>
      </div>

      {/* Your rank card */}
      {profile && (
        <div className="surface p-4 mb-6 ornament-border animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: getAvatar(profile.avatar_id).gradient }}>
              {getAvatar(profile.avatar_id).emoji}
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted">Your Ranking</p>
              <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {myRank > 0 ? `#${myRank}` : 'Unranked — Play to rank!'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{profile.total_score || 0}</p>
              <p className="text-xs text-muted">Total Points</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 podium */}
      {!loading && entries.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* 2nd place */}
          <div className="surface p-4 text-center mt-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
              style={{ background: getAvatar(entries[1].avatar_id).gradient }}>
              {getAvatar(entries[1].avatar_id).emoji}
            </div>
            <Medal size={20} className="mx-auto mb-1" style={{ color: '#a8a8b8' }} />
            <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
              {entries[1].display_name}
            </p>
            <p className="text-xs text-muted">{entries[1].total_score} pts</p>
          </div>
          {/* 1st place */}
          <div className="surface p-4 text-center animate-fade-in-up ornament-border" style={{ animationDelay: '0s' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 animate-float"
              style={{ background: getAvatar(entries[0].avatar_id).gradient }}>
              {getAvatar(entries[0].avatar_id).emoji}
            </div>
            <Crown size={24} className="mx-auto mb-1" style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
              {entries[0].display_name}
            </p>
            <p className="text-xs text-primary font-semibold">{entries[0].total_score} pts</p>
          </div>
          {/* 3rd place */}
          <div className="surface p-4 text-center mt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
              style={{ background: getAvatar(entries[2].avatar_id).gradient }}>
              {getAvatar(entries[2].avatar_id).emoji}
            </div>
            <Medal size={20} className="mx-auto mb-1" style={{ color: '#cd7f32' }} />
            <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
              {entries[2].display_name}
            </p>
            <p className="text-xs text-muted">{entries[2].total_score} pts</p>
          </div>
        </div>
      )}

      {/* Full ranking list */}
      <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-3">
        All Rankings
      </h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 rounded-full animate-spin" style={{ borderTop: '2px solid var(--color-primary)' }} />
        </div>
      ) : entries.length === 0 ? (
        <div className="surface p-8 text-center">
          <Sparkles size={32} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-3" />
          <p className="text-sm text-muted mb-4">No rankings yet — be the first to play!</p>
          <button onClick={() => onNavigate('games')} className="btn-primary">
            Play a Game
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => {
            const isMe = entry.id === profile?.id;
            return (
              <div
                key={entry.id}
                className="surface p-3 flex items-center gap-3 transition-all animate-fade-in-up"
                style={{
                  borderColor: isMe ? 'var(--color-primary)' : 'var(--color-border)',
                  borderWidth: isMe ? '2px' : '1px',
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                <span className="w-8 text-center text-sm font-bold text-muted flex-shrink-0">
                  {i + 1}
                </span>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: getAvatar(entry.avatar_id).gradient }}>
                  {getAvatar(entry.avatar_id).emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                    {entry.display_name}
                    {isMe && <span className="text-xs text-primary ml-2">(You)</span>}
                  </p>
                  <div className="flex items-center gap-2">
                    {entry.streak > 0 && (
                      <span className="flex items-center gap-0.5 text-xs text-muted">
                        <Flame size={12} style={{ color: 'var(--color-accent)' }} />
                        {entry.streak}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm font-bold text-primary flex-shrink-0">
                  {entry.total_score}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
