import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { getAvatar } from '@/lib/avatars';
import { getAvatarStyle } from '@/lib/avatarStyles';
import { recommendGames, games, type GameInfo } from '@/lib/gameData';
import type { Page } from '@/App';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Swords, Puzzle, Sparkles, TrendingUp, Flame, ArrowRight, Trophy, Crown, Target, Gamepad2 } from 'lucide-react';

interface GameLibraryProps {
  onPlay: (gameId: string) => void;
  onNavigate: (page: Page) => void;
}

type GenreTab = 'trivia' | 'puzzle' | 'combat';

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen,
  Swords,
  Puzzle,
};

const gameThemeIcons: Record<string, string> = {
  'adventure-book': '🐍',
  'quiz-arena': '⚔️',
  'puzzle-match': '🧩',
};

interface ProgressData {
  level_reached: number;
  highest_score: number;
  total_plays: number;
  game_id: string;
}

export default function GameLibrary({ onPlay, onNavigate }: GameLibraryProps) {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const recommended = recommendGames(profile?.game_style || 'casual');
  const [progress, setProgress] = useState<ProgressData[]>([]);
  const [activeTab, setActiveTab] = useState<GenreTab>('trivia');

  useEffect(() => {
    if (!profile) return;
    const fetchProgress = async () => {
      const { data } = await supabase
        .from('game_progress')
        .select('level_reached, highest_score, total_plays, game_id')
        .eq('user_id', profile.id);
      if (data) setProgress(data as ProgressData[]);
    };
    fetchProgress();
  }, [profile]);

  const getProgress = (gameId: string) => progress.find((p) => p.game_id === gameId);
  const totalPlays = progress.reduce((sum, p) => sum + p.total_plays, 0);

  const triviaGames = games.filter((g) => g.id === 'quiz-arena' || g.id === 'adventure-book');
  const puzzleGames = games.filter((g) => g.id === 'puzzle-match');
  const combatGames: { id: string; title: string; desc: string; icon: string }[] = [
    { id: 'combat-arena', title: t('epicCombatArena'), desc: t('arjunasArcheryDesc'), icon: '⚔️' },
  ];

  const tabGames = activeTab === 'trivia' ? triviaGames : activeTab === 'puzzle' ? puzzleGames : [];
  const showCombat = activeTab === 'combat';

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 pb-24 md:pb-8">
      {/* Hero banner with avatar + level */}
      <div className="surface p-6 mb-6 ornament-border animate-fade-in-up">
        <div className="flex items-start gap-4">
          {profile && (
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                style={{ background: getAvatar(profile.avatar_id).gradient }}>
                {getAvatar(profile.avatar_id).emoji}
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ background: 'var(--color-primary)', color: 'var(--color-bg)', border: '2px solid var(--color-surface)' }}>
                L{profile.player_level || 1}
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
              {t('welcomeBack')}, {profile?.display_name || 'Explorer'}!
            </h1>
            <p className="text-sm text-muted">
              {profile?.onboarding_complete
                ? `${t('playerLevel')}: ${profile.player_level || 1} • ${t('totalPoints')}: ${profile.total_score || 0}`
                : 'Complete your chat with Mitra to get fully personalized recommendations.'}
            </p>
          </div>
          <button onClick={() => onNavigate('mitra')} className="btn-ghost text-sm flex-shrink-0">
            {t('updateWithMitra')}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Flame} label={t('dayStreak')} value={`${profile?.streak || 0}`} />
        <StatCard icon={Trophy} label={t('totalPoints')} value={`${profile?.total_score || 0}`} />
        <StatCard icon={Target} label={t('games')} value={`${totalPlays}`} />
        <StatCard icon={Sparkles} label={t('playerLevel')} value={`L${profile?.player_level || 1}`} />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button onClick={() => onNavigate('leaderboard')} className="surface p-4 flex items-center gap-3 transition-all hover:scale-[1.02] text-left">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 neon-border-gold"
            style={{ background: 'var(--color-surface-alt)' }}>
            <Trophy size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{t('leaderboard')}</p>
            <p className="text-xs text-muted">See your rank</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-muted" />
        </button>
        <button onClick={() => onNavigate('leagues')} className="surface p-4 flex items-center gap-3 transition-all hover:scale-[1.02] text-left">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 neon-border-indigo"
            style={{ background: 'var(--color-surface-alt)' }}>
            <Crown size={20} style={{ color: 'var(--color-accent)' }} />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{t('leagues')}</p>
            <p className="text-xs text-muted">{t('competeWin')}</p>
          </div>
          <ArrowRight size={16} className="ml-auto text-muted" />
        </button>
      </div>

      {/* Cultural Module tabs */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <button onClick={() => onNavigate('mahabharat' as Page)} className="surface-alt p-5 rounded-xl transition-all hover:scale-[1.03] text-left ornament-border">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3"
            style={{ background: 'linear-gradient(135deg, #8a5a2a, #5a3a1a)' }}>
            🤼
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {t('epicCombatArena')}
          </h3>
          <p className="text-xs text-muted">5 ancient combat games across 11 levels</p>
        </button>
        <button onClick={() => onNavigate('quran' as Page)} className="surface-alt p-5 rounded-xl transition-all hover:scale-[1.03] text-left">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3"
            style={{ background: 'linear-gradient(135deg, #4dbf8a, #2a8a5a)' }}>
            ☪️
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            Quran Stories
          </h3>
          <p className="text-xs text-muted">11 prophet stories with video summaries</p>
        </button>
        <button onClick={() => onNavigate('bible' as Page)} className="surface-alt p-5 rounded-xl transition-all hover:scale-[1.03] text-left">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3"
            style={{ background: 'linear-gradient(135deg, #d4d4e0, #8a8aa0)' }}>
            ✝️
          </div>
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            Bible Literature
          </h3>
          <p className="text-xs text-muted">11 levels of quizzes and scriptural trivia</p>
        </button>
      </div>

      {/* Genre tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: 'var(--color-surface-alt)' }}>
        <button
          onClick={() => setActiveTab('trivia')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={activeTab === 'trivia'
            ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
            : { color: 'var(--color-text-muted)' }}
        >
          <BookOpen size={16} />
          {t('triviaHub')}
        </button>
        <button
          onClick={() => setActiveTab('puzzle')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={activeTab === 'puzzle'
            ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
            : { color: 'var(--color-text-muted)' }}
        >
          <Puzzle size={16} />
          {t('puzzleQuests')}
        </button>
        <button
          onClick={() => setActiveTab('combat')}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
          style={activeTab === 'combat'
            ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
            : { color: 'var(--color-text-muted)' }}
        >
          <Swords size={16} />
          {t('epicCombat')}
        </button>
      </div>

      {/* Game cards based on active tab */}
      {showCombat ? (
        <div className="arcade-cabinet p-6 animate-fade-in-up">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3 animate-float">⚔️</div>
            <h2 className="text-lg font-bold glow-text-gold mb-1" style={{ color: 'var(--color-primary)' }}>
              {t('epicCombatArena')}
            </h2>
            <p className="text-sm text-muted">Two arcade mini-games await</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <button onClick={() => onNavigate('combat-arena' as Page)} className="surface-alt p-6 rounded-xl transition-all hover:scale-[1.03] neon-border-gold">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)' }}>
                🏹
              </div>
              <h3 className="text-base font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
                {t('arjunasArchery')}
              </h3>
              <p className="text-xs text-muted text-center mb-4">{t('arjunasArcheryDesc')}</p>
              <div className="btn-primary w-full justify-center text-sm">{t('playNow')}</div>
            </button>
            <button onClick={() => onNavigate('combat-arena' as Page)} className="surface-alt p-6 rounded-xl transition-all hover:scale-[1.03] neon-border-indigo">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #e85d5d, #8a2a2a)' }}>
                🤼
              </div>
              <h3 className="text-base font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
                {t('bheemasKusti')}
              </h3>
              <p className="text-xs text-muted text-center mb-4">{t('bheemasKustiDesc')}</p>
              <div className="btn-primary w-full justify-center text-sm">{t('playNow')}</div>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {tabGames.map((game, i) => {
            const prog = getProgress(game.id);
            return <GameCard key={game.id} game={game} index={i} onPlay={onPlay} progress={prog} />;
          })}
        </div>
      )}

      {/* Footer credit */}
      <div className="mt-12 pt-6 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-[10px] text-muted opacity-60 leading-relaxed">
          Ch Sri Tejaswini – Founder &amp; CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Flame; label: string; value: string }) {
  return (
    <div className="surface p-4 animate-fade-in-up">
      <Icon size={18} style={{ color: 'var(--color-primary)' }} className="mb-2" />
      <p className="text-xs text-muted mb-0.5">{label}</p>
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>{value}</p>
    </div>
  );
}

function GameCard({
  game,
  index,
  onPlay,
  progress,
}: {
  game: GameInfo;
  index: number;
  onPlay: (id: string) => void;
  progress?: ProgressData;
}) {
  const themeIcon = gameThemeIcons[game.id] || '🎮';
  return (
    <div
      className="surface p-6 ornament-border transition-transform hover:scale-[1.02] animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
          style={{ background: 'var(--color-surface-alt)' }}>
          {themeIcon}
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {game.title}
          </h3>
          <p className="text-xs font-medium uppercase tracking-wider text-accent capitalize">
            {game.style}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted mb-4 leading-relaxed">{game.description}</p>

      {progress && progress.total_plays > 0 ? (
        <div className="mb-4 p-3 rounded-xl" style={{ background: 'var(--color-surface-alt)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted">Your Progress</span>
            <span className="text-xs font-bold text-primary">Best: {progress.highest_score}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
              <div className="h-full rounded-full" style={{
                width: `${Math.min((progress.total_plays / 10) * 100, 100)}%`,
                background: 'var(--color-primary)',
              }} />
            </div>
            <span className="text-xs text-muted whitespace-nowrap">{progress.total_plays} plays</span>
          </div>
        </div>
      ) : null}

      <button onClick={() => onPlay(game.id)} className="btn-primary w-full justify-center text-sm">
        {progress && progress.total_plays > 0 ? 'Continue' : 'Play Now'}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
