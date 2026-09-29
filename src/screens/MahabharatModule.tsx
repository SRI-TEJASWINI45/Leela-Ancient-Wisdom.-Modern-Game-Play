import { useState, useEffect } from 'react';
import { ArrowLeft, Crown, ChevronRight, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { speak } from '@/lib/speech';
import { mahabharatGames, mahabharatLore, getLoreForLevel } from '@/lib/culturalContent';
import KustiRumble from '@/screens/KustiRumble';
import ArcheryQuest from '@/screens/ArcheryQuest';
import SwordClash from '@/screens/SwordClash';
import AstroTricks from '@/screens/AstroTricks';
import DharmicStrategy from '@/screens/DharmicStrategy';

interface MahabharatModuleProps {
  onBack: () => void;
}

export default function MahabharatModule({ onBack }: MahabharatModuleProps) {
  const { language, t } = useLanguage();
  const { profile } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLore, setShowLore] = useState(true);

  const playerLevel = profile?.player_level || 1;
  const lore = getLoreForLevel(currentLevel, language);

  // Speak lore when level changes
  useEffect(() => {
    if (showLore) {
      speak(lore.text, language);
    }
  }, [currentLevel, language, showLore]);

  // Render active game
  if (activeGame === 'matti-kusti') return <KustiRumble onBack={() => { setActiveGame(null); setShowLore(true); }} />;
  if (activeGame === 'divine-archery') return <ArcheryQuest onBack={() => { setActiveGame(null); setShowLore(true); }} />;
  if (activeGame === 'sword-clash') return <SwordClash onBack={() => { setActiveGame(null); setShowLore(true); }} />;
  if (activeGame === 'astro-tricks') return <AstroTricks onBack={() => { setActiveGame(null); setShowLore(true); }} />;
  if (activeGame === 'dharmic-strategy') return <DharmicStrategy onBack={() => { setActiveGame(null); setShowLore(true); }} />;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2"><ArrowLeft size={20} /></button>
        <div className="flex items-center gap-2">
          <Crown size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {language === 'te' ? 'మహాభారత యుద్ధ అరేనాలు' : 'Mahabharat Combat Arenas'}
          </h1>
        </div>
      </div>

      {/* Lore dialogue card */}
      {showLore && (
        <div className="arcade-cabinet p-6 mb-6 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <Volume2 size={16} style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {language === 'te' ? `స్థాయి ${currentLevel} — యుద్ధభూమి సంభాషణ` : `Level ${currentLevel} — Battlefield Dialogue`}
            </span>
          </div>

          {/* Dialogue card */}
          <div className="surface-alt p-5 rounded-xl mb-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-primary)' }}>
                {lore.emoji}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                  {lore.speaker}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  "{lore.text}"
                </p>
              </div>
            </div>
          </div>

          {/* Level progression dots */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <button key={i} onClick={() => setCurrentLevel(i + 1)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all"
                style={{
                  background: i + 1 === currentLevel ? 'var(--color-primary)' : i + 1 <= currentLevel ? 'var(--color-surface-alt)' : 'var(--color-surface)',
                  color: i + 1 === currentLevel ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  border: i + 1 === currentLevel ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                }}>
                {i + 1}
              </button>
            ))}
          </div>

          <button onClick={() => setShowLore(false)} className="btn-primary w-full justify-center text-sm">
            <ChevronRight size={16} />
            {language === 'te' ? 'ఆటల వైపు వెళ్లండి' : 'Proceed to Games'}
          </button>
        </div>
      )}

      {/* Game tabs */}
      {!showLore && (
        <div className="animate-fade-in-up">
          {/* Level indicator */}
          <div className="surface-alt p-3 rounded-xl mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{lore.emoji}</span>
              <div>
                <p className="text-xs text-muted">{language === 'te' ? 'ప్రస్తుత స్థాయి' : 'Current Level'}</p>
                <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>
                  L{currentLevel} — {lore.speaker}
                </p>
              </div>
            </div>
            <button onClick={() => setShowLore(true)} className="btn-ghost text-xs px-3 py-1.5">
              <Volume2 size={14} />
              {language === 'te' ? 'కథ వినండి' : 'Hear Lore'}
            </button>
          </div>

          {/* Game grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {mahabharatGames.map((game, i) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="surface-alt p-6 rounded-xl transition-all hover:scale-[1.03] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                  style={{ background: game.gradient }}>
                  {game.emoji}
                </div>
                <h3 className="text-base font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
                  {language === 'te' ? game.titleTe : game.titleEn}
                </h3>
                <p className="text-xs text-muted text-center mb-4">
                  {language === 'te' ? game.descTe : game.descEn}
                </p>
                <div className="btn-primary w-full justify-center text-sm">
                  {t('playNow')}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
