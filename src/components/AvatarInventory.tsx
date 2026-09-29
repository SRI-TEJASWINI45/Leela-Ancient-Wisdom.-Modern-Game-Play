import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import { levelSystem, getLevelInfo, type LevelInfo } from '@/lib/avatarStyles';
import { getAvatar } from '@/lib/avatars';
import { Star, Crown, Sparkles, Volume2, Lock, ChevronRight } from 'lucide-react';

interface AvatarInventoryProps {
  onLevelUp?: (level: number) => void;
}

// Tier definitions for layered decorations
const TIERS = {
  ornaments: { range: [1, 4], labelEn: 'Glowing Ornaments', labelTe: 'ప్రకాశించే ఆభరణాలు', icon: '✨' },
  attire: { range: [5, 8], labelEn: 'Traditional Attire', labelTe: 'సాంప్రదాయ వస్త్రం', icon: '👘' },
  crown: { range: [9, 11], labelEn: 'Royal Crown', labelTe: 'రాచు కిరీటం', icon: '👑' },
};

function getTier(level: number): keyof typeof TIERS {
  if (level <= 4) return 'ornaments';
  if (level <= 8) return 'attire';
  return 'crown';
}

// Ornament layers per level (1-4)
const ornamentLayers: Record<number, string[]> = {
  1: [],
  2: ['🌿'],
  3: ['🌿', '🍃'],
  4: ['🌿', '🍃', '⚔️'],
};
// Attire layers per level (5-8)
const attireLayers: Record<number, string[]> = {
  5: ['🛡️'],
  6: ['🛡️', '🏅'],
  7: ['🛡️', '🏅', '✨'],
  8: ['🛡️', '🏅', '✨', '👑'],
};
// Crown layers per level (9-11)
const crownLayers: Record<number, string[]> = {
  9: ['👑'],
  10: ['👑', '🌟'],
  11: ['👑', '🌟', '🌌'],
};

function getLayersForLevel(level: number): { ornaments: string[]; attire: string[]; crown: string[] } {
  return {
    ornaments: level >= 4 ? ornamentLayers[4] : ornamentLayers[level] || [],
    attire: level >= 8 ? attireLayers[8] : level >= 5 ? attireLayers[level] || [] : [],
    crown: level >= 11 ? crownLayers[11] : level >= 9 ? crownLayers[level] || [] : [],
  };
}

export default function AvatarInventory({ onLevelUp }: AvatarInventoryProps) {
  const { profile, updateProfile } = useAuth();
  const { language, t } = useLanguage();
  const [selectedLevel, setSelectedLevel] = useState<number>(profile?.player_level || 1);
  const [isLeveling, setIsLeveling] = useState(false);
  const [showLevelUpFx, setShowLevelUpFx] = useState(false);

  const currentLevel = profile?.player_level || 1;
  const avatar = getAvatar(profile?.avatar_id || 'lotus');
  const displayLevel = selectedLevel;
  const layers = getLayersForLevel(displayLevel);
  const levelInfo = getLevelInfo(displayLevel);
  const currentTier = getTier(displayLevel);

  const handleSimulateLevelUp = async () => {
    if (currentLevel >= 11) return;
    const newLevel = currentLevel + 1;
    setIsLeveling(true);
    setShowLevelUpFx(true);

    // Speak the congratulatory message
    const msgEn = 'Hey! You have been leveled up! Congratulations!';
    const msgTe = 'హేయ్! మీరు లెవెల్ అప్ అయ్యారు! అభినందనలు!';
    speak(language === 'te' ? msgTe : msgEn, language);

    // Update profile
    await updateProfile({ player_level: newLevel });
    setSelectedLevel(newLevel);

    // Notify parent
    onLevelUp?.(newLevel);

    setTimeout(() => {
      setShowLevelUpFx(false);
      setIsLeveling(false);
    }, 2500);
  };

  const isUnlocked = (level: number) => level <= currentLevel;

  return (
    <div className="surface p-6 mb-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={18} style={{ color: 'var(--color-primary)' }} />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          {language === 'te' ? 'అవతార్ ఇన్వెంటరీ' : 'Avatar Inventory'}
        </h2>
      </div>

      {/* Active avatar showcase with layered decorations */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Avatar canvas */}
        <div className="relative flex-shrink-0 mx-auto">
          <div className="relative w-40 h-40 rounded-3xl flex items-center justify-center overflow-hidden"
            style={{
              background: avatar.gradient,
              border: '3px solid var(--color-primary)',
              boxShadow: `0 0 30px var(--color-primary-glow), inset 0 0 20px rgba(0,0,0,0.3)`,
            }}>
            {/* Base avatar */}
            <div className="text-7xl animate-float">{avatar.emoji}</div>

            {/* Layered ornaments (levels 1-4) */}
            {layers.ornaments.map((orn, i) => (
              <div key={`orn-${i}`} className="absolute text-2xl animate-neon-pulse"
                style={{
                  top: `${10 + i * 8}%`,
                  left: `${5 + i * 10}%`,
                  filter: 'drop-shadow(0 0 4px var(--color-primary-glow))',
                  animationDelay: `${i * 0.3}s`,
                }}>
                {orn}
              </div>
            ))}

            {/* Layered attire (levels 5-8) */}
            {layers.attire.map((att, i) => (
              <div key={`att-${i}`} className="absolute text-2xl"
                style={{
                  bottom: `${10 + i * 12}%`,
                  right: `${5 + i * 8}%`,
                  filter: 'drop-shadow(0 0 6px var(--color-accent-glow))',
                }}>
                {att}
              </div>
            ))}

            {/* Crown layers (levels 9-11) */}
            {layers.crown.map((cr, i) => (
              <div key={`cr-${i}`} className="absolute text-3xl animate-neon-pulse"
                style={{
                  top: `${-5 + i * 5}%`,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  filter: 'drop-shadow(0 0 8px var(--color-primary-glow))',
                  animationDelay: `${i * 0.2}s`,
                }}>
                {cr}
              </div>
            ))}

            {/* Level-up burst effect */}
            {showLevelUpFx && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 animate-level-up-burst rounded-3xl"
                  style={{ background: 'radial-gradient(circle, var(--color-primary-glow), transparent 70%)' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl animate-level-up-burst">
                  ⭐
                </div>
              </div>
            )}
          </div>

          {/* Level badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
            style={{ background: 'var(--color-primary)', color: 'var(--color-bg)', border: '2px solid var(--color-surface)' }}>
            L{displayLevel} • {language === 'te' ? levelInfo.titleTe : levelInfo.titleEn}
          </div>
        </div>

        {/* Active tier info + level-up button */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-2"
              style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)' }}>
              <span>{TIERS[currentTier].icon}</span>
              {language === 'te' ? TIERS[currentTier].labelTe : TIERS[currentTier].labelEn}
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text)' }}>
              {language === 'te' ? levelInfo.unlockTe : levelInfo.unlockEn}
            </p>
          </div>

          {/* Active layers display */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...layers.ornaments, ...layers.attire, ...layers.crown].map((item, i) => (
              <div key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-primary)' }}>
                {item}
              </div>
            ))}
            {layers.ornaments.length === 0 && layers.attire.length === 0 && layers.crown.length === 0 && (
              <p className="text-xs text-muted">{language === 'te' ? 'ఇంకా ఆభరణాలు లేవు' : 'No ornaments yet'}</p>
            )}
          </div>

          {/* Simulate Level Up button */}
          {currentLevel < 11 ? (
            <button
              onClick={handleSimulateLevelUp}
              disabled={isLeveling}
              className="btn-primary text-sm self-start"
            >
              <Volume2 size={16} />
              {language === 'te' ? 'లెవెల్ అప్ సిమ్యులేట్' : 'Simulate Level Up'}
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
              style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)' }}>
              <Crown size={16} />
              {language === 'te' ? 'గరిష్ట స్థాయి చేరుకున్నారు!' : 'Maximum level reached!'}
            </div>
          )}
        </div>
      </div>

      {/* 11-level progression grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
        {levelSystem.map((lvl: LevelInfo) => {
          const unlocked = isUnlocked(lvl.level);
          const isActive = lvl.level === displayLevel;
          const tier = getTier(lvl.level);
          return (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevel(lvl.level)}
              disabled={!unlocked}
              className="relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all"
              style={{
                background: isActive ? 'var(--color-primary)' : unlocked ? 'var(--color-surface-alt)' : 'var(--color-surface)',
                border: isActive ? '2px solid var(--color-accent)' : unlocked ? '1px solid var(--color-border)' : '1px solid var(--color-border)',
                opacity: unlocked ? 1 : 0.4,
                cursor: unlocked ? 'pointer' : 'not-allowed',
                boxShadow: isActive ? '0 0 12px var(--color-primary-glow)' : 'none',
              }}
            >
              {!unlocked && <Lock size={12} style={{ color: 'var(--color-text-muted)' }} />}
              {unlocked && (
                <>
                  <span className="text-lg">{lvl.decoration}</span>
                  <span className="text-[9px] font-bold" style={{ color: isActive ? 'var(--color-bg)' : 'var(--color-text-muted)' }}>
                    L{lvl.level}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>

      {/* Tier legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs text-muted">
        {Object.entries(TIERS).map(([key, tier]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="text-base">{tier.icon}</span>
            <span>{language === 'te' ? tier.labelTe : tier.labelEn}</span>
            <span className="opacity-60">L{tier.range[0]}-{tier.range[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
