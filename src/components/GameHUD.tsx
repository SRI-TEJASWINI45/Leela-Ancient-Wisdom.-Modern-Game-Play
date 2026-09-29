import { useAuth } from '@/context/AuthContext';
import { getAvatar } from '@/lib/avatars';
import { getLevelInfo } from '@/lib/avatarStyles';

interface GameHUDProps {
  level?: number;
  score?: number;
  totalLevels?: number;
  gameTitle?: string;
}

export default function GameHUD({ level, score, totalLevels, gameTitle }: GameHUDProps) {
  const { profile } = useAuth();
  const avatar = getAvatar(profile?.avatar_id || 'lotus');
  const playerLevel = profile?.player_level || 1;
  const levelInfo = getLevelInfo(playerLevel);

  return (
    <div className="flex items-center gap-3 mb-4 animate-fade-in">
      {/* Avatar with level badge + decoration */}
      <div className="relative flex-shrink-0">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
          style={{ background: avatar.gradient, border: '2px solid var(--color-primary)', boxShadow: '0 0 12px var(--color-primary-glow)' }}
        >
          {avatar.emoji}
        </div>
        {/* Level decoration from progression system */}
        {playerLevel >= 7 && (
          <div className="absolute -top-2 -right-1 text-xs animate-neon-pulse">
            {levelInfo.decoration}
          </div>
        )}
        <div
          className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: 'var(--color-primary)', color: 'var(--color-bg)', border: '2px solid var(--color-surface)' }}
        >
          L{playerLevel}
        </div>
      </div>

      {/* Player info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
          {profile?.display_name || 'Explorer'}
        </p>
        <p className="text-xs text-muted">
          {gameTitle ? gameTitle : 'Playing'}
          {totalLevels && level !== undefined ? ` • Level ${level}/${totalLevels}` : ''}
        </p>
      </div>

      {/* Score */}
      {score !== undefined && (
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
          style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}
        >
          <span className="text-xs text-muted">Score</span>
          <span className="text-lg font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {score}
          </span>
        </div>
      )}
    </div>
  );
}
