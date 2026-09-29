import { useState } from 'react';
import { Crown, ArrowLeft, Swords, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ArcheryQuest from '@/screens/ArcheryQuest';
import KustiRumble from '@/screens/KustiRumble';

interface CombatArenaProps {
  onBack: () => void;
}

export default function CombatArena({ onBack }: CombatArenaProps) {
  const { t } = useLanguage();
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  if (selectedGame === 'archery') return <ArcheryQuest onBack={() => setSelectedGame(null)} />;
  if (selectedGame === 'kusti') return <KustiRumble onBack={() => setSelectedGame(null)} />;

  const games = [
    {
      id: 'archery',
      title: t('arjunasArchery'),
      desc: t('arjunasArcheryDesc'),
      icon: '🏹',
      gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)',
      borderClass: 'neon-border-gold',
    },
    {
      id: 'kusti',
      title: t('bheemasKusti'),
      desc: t('bheemasKustiDesc'),
      icon: '🤼',
      gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)',
      borderClass: 'neon-border-indigo',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Crown size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {t('epicCombatArena')}
          </h1>
        </div>
      </div>

      {/* Arcade cabinet container */}
      <div className="arcade-cabinet p-6 mb-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-3 animate-float">⚔️</div>
          <h2 className="text-lg font-bold glow-text-gold mb-1" style={{ color: 'var(--color-primary)' }}>
            {t('epicCombatArena')}
          </h2>
          <p className="text-sm text-muted">
            {t('epicCombat')} — Choose your battle
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {games.map((game, i) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              className={`surface-alt p-6 rounded-xl transition-all hover:scale-[1.03] animate-fade-in-up ${game.borderClass}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                style={{ background: game.gradient }}>
                {game.icon}
              </div>
              <h3 className="text-base font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
                {game.title}
              </h3>
              <p className="text-xs text-muted text-center mb-4">{game.desc}</p>
              <div className="btn-primary w-full justify-center text-sm">
                {t('playNow')}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
