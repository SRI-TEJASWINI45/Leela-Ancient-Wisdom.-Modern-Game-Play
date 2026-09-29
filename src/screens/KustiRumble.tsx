import { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, Swords, Shield, Zap, Heart, Sparkles } from 'lucide-react';
import GameHUD from '@/components/GameHUD';
import { useLanguage } from '@/context/LanguageContext';

interface KustiRumbleProps {
  onBack: () => void;
}

interface CombatPopup {
  id: number;
  text: string;
  color: string;
  x: number;
}

interface ActionCard {
  id: string;
  name: string;
  nameTe: string;
  icon: typeof Swords;
  damage: number;
  color: string;
  desc: string;
}

const actionCards: ActionCard[] = [
  { id: 'mace', name: 'Mace Strike', nameTe: 'గదా దాడి', icon: Swords, damage: 25, color: '#e85d5d', desc: 'Heavy blow with Bhima\'s mace' },
  { id: 'slam', name: 'Power Slam', nameTe: 'పవర్ స్లామ్', icon: Zap, damage: 35, color: '#e8b04d', desc: 'Devastating full-body slam' },
  { id: 'shield', name: 'Dharmic Shield', nameTe: 'ధర్మ డాలు', icon: Shield, damage: 0, color: '#6d7dff', desc: 'Block and heal 15 HP' },
];

const AI_ACTIONS = [
  { name: 'Duryodhana strikes!', damage: 18 },
  { name: 'Duryodhana grapples!', damage: 22 },
  { name: 'Duryodhana taunts!', damage: 10 },
  { name: 'Duryodhana charges!', damage: 28 },
];

let popupId = 0;

export default function KustiRumble({ onBack }: KustiRumbleProps) {
  const { t, language } = useLanguage();
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [score, setScore] = useState(0);
  const [turn, setTurn] = useState<'player' | 'opponent' | 'idle'>('player');
  const [popups, setPopups] = useState<CombatPopup[]>([]);
  const [shakeTarget, setShakeTarget] = useState<'player' | 'opponent' | null>(null);
  const [flashEffect, setFlashEffect] = useState(false);
  const [gameOver, setGameOver] = useState<'victory' | 'defeat' | null>(null);
  const [round, setRound] = useState(1);

  const addPopup = (text: string, color: string) => {
    const id = ++popupId;
    const x = 30 + Math.random() * 40;
    setPopups((prev) => [...prev, { id, text, color, x }]);
    setTimeout(() => {
      setPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  const triggerShake = (target: 'player' | 'opponent') => {
    setShakeTarget(target);
    setTimeout(() => setShakeTarget(null), 500);
  };

  const triggerFlash = () => {
    setFlashEffect(true);
    setTimeout(() => setFlashEffect(false), 200);
  };

  const handlePlayerAction = (card: ActionCard) => {
    if (turn !== 'player' || gameOver) return;

    if (card.id === 'shield') {
      const heal = Math.min(15, 100 - playerHP);
      setPlayerHP((hp) => Math.min(100, hp + 15));
      addPopup(`+${heal} HP`, '#6d7dff');
      triggerShake('player');
    } else {
      const dmg = card.damage + Math.floor(Math.random() * 8);
      setOpponentHP((hp) => Math.max(0, hp - dmg));
      setScore((s) => s + dmg * 10);
      addPopup(`-${dmg}!`, card.color);
      triggerShake('opponent');
      triggerFlash();
    }

    setTurn('idle');

    setTimeout(() => {
      if (opponentHP - (card.damage + 7) <= 0) {
        setGameOver('victory');
        return;
      }
      // AI turn
      setTurn('opponent');
      setTimeout(() => {
        const aiAction = AI_ACTIONS[Math.floor(Math.random() * AI_ACTIONS.length)];
        const aiDmg = aiAction.damage + Math.floor(Math.random() * 6);
        setPlayerHP((hp) => Math.max(0, hp - aiDmg));
        addPopup(aiAction.name, '#e85d5d');
        triggerShake('player');
        triggerFlash();

        setTimeout(() => {
          if (playerHP - aiDmg <= 0) {
            setGameOver('defeat');
            return;
          }
          setTurn('player');
          setRound((r) => r + 1);
        }, 800);
      }, 600);
    }, 600);
  };

  const reset = () => {
    setPlayerHP(100);
    setOpponentHP(100);
    setScore(0);
    setTurn('player');
    setGameOver(null);
    setRound(1);
    setPopups([]);
  };

  const hpColor = (hp: number) => {
    if (hp > 60) return 'var(--color-success)';
    if (hp > 30) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
      </div>

      <GameHUD level={round} score={score} gameTitle={t('bheemasKusti')} />

      {/* Combat arena */}
      <div className="arcade-cabinet p-4 mb-4">
        {/* Arena background */}
        <div className="relative rounded-xl overflow-hidden mb-4"
          style={{
            background: 'linear-gradient(180deg, #3a2818 0%, #2a1a0e 50%, #1a0e08 100%)',
            minHeight: '280px',
          }}>
          {/* Sand texture */}
          <div className="absolute inset-0 opacity-20"
            style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,200,100,0.05) 2px, rgba(255,200,100,0.05) 4px)' }} />

          {/* Spectators */}
          <div className="absolute top-0 left-0 right-0 h-8 flex justify-around opacity-30">
            {['👤', '👤', '👤', '👤', '👤', '👤', '👤', '👤', '👤', '👤'].map((s, i) => (
              <span key={i} className="text-xs">{s}</span>
            ))}
          </div>

          {/* Combatants */}
          <div className="absolute inset-0 flex items-center justify-between px-8 pt-8">
            {/* Player - Bhima */}
            <div className={`flex flex-col items-center ${shakeTarget === 'player' ? 'animate-impact-shake' : ''}`}>
              <div className="text-5xl mb-1 animate-float" style={{ filter: 'drop-shadow(0 0 8px rgba(232,176,77,0.5))' }}>🤼</div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>Bhima</p>
              <div className="w-24 mt-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <Heart size={10} style={{ color: hpColor(playerHP) }} />
                  <span className="text-[10px] text-muted">{playerHP}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${playerHP}%`, background: hpColor(playerHP) }} />
                </div>
              </div>
            </div>

            {/* VS */}
            <div className="text-2xl font-bold glow-text-gold animate-neon-pulse" style={{ color: 'var(--color-primary)' }}>
              VS
            </div>

            {/* Opponent - Duryodhana */}
            <div className={`flex flex-col items-center ${shakeTarget === 'opponent' ? 'animate-impact-shake' : ''}`}>
              <div className="text-5xl mb-1 animate-float" style={{ filter: 'drop-shadow(0 0 8px rgba(232,93,93,0.5))', animationDelay: '0.5s' }}>👹</div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-error)' }}>Duryodhana</p>
              <div className="w-24 mt-1">
                <div className="flex items-center gap-1 mb-0.5">
                  <Heart size={10} style={{ color: hpColor(opponentHP) }} />
                  <span className="text-[10px] text-muted">{opponentHP}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${opponentHP}%`, background: hpColor(opponentHP) }} />
                </div>
              </div>
            </div>
          </div>

          {/* Combat popups */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {popups.map((popup) => (
              <div key={popup.id}
                className="absolute text-xl font-bold animate-combat-popup"
                style={{ left: `${popup.x}%`, color: popup.color, textShadow: '0 0 10px currentColor' }}>
                {popup.text}
              </div>
            ))}
          </div>

          {/* Flash effect */}
          {flashEffect && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.15)', animation: 'strikeFlash 0.2s ease' }} />
          )}

          {/* Game over modal */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{ background: 'rgba(10,10,20,0.9)' }}>
              <div className="text-center animate-scale-in">
                <div className="text-5xl mb-3">{gameOver === 'victory' ? '🏆' : '💀'}</div>
                <h2 className={`text-2xl font-bold mb-2 ${gameOver === 'victory' ? 'glow-text-gold' : ''}`}
                  style={{ color: gameOver === 'victory' ? 'var(--color-primary)' : 'var(--color-error)' }}>
                  {gameOver === 'victory' ? t('victory') : t('defeat')}
                </h2>
                <p className="text-sm text-muted mb-4">Score: {score} • Rounds: {round}</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={reset} className="btn-primary">
                    {t('playAgain')}
                  </button>
                  <button onClick={onBack} className="btn-ghost">
                    {t('backToArena')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Turn indicator */}
        <div className="text-center mb-3">
          <span className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: turn === 'player' ? 'var(--color-primary-glow)' : 'var(--color-surface-alt)',
              color: turn === 'player' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            }}>
            {turn === 'player' ? (language === 'te' ? 'మీ వంతు' : 'Your Turn') : turn === 'opponent' ? (language === 'te' ? 'ప్రత్యర్థి వంతు' : 'Opponent Turn') : '...'}
          </span>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-3 gap-3">
          {actionCards.map((card) => {
            const Icon = card.icon;
            const disabled = turn !== 'player' || !!gameOver;
            return (
              <button
                key={card.id}
                onClick={() => handlePlayerAction(card)}
                disabled={disabled}
                className="relative surface-alt p-4 rounded-xl transition-all hover:scale-[1.03]"
                style={{
                  borderColor: disabled ? 'var(--color-border)' : card.color,
                  borderWidth: '2px',
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2"
                  style={{ background: card.color + '20' }}>
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <p className="text-sm font-bold text-center" style={{ color: 'var(--color-text)' }}>
                  {language === 'te' ? card.nameTe : card.name}
                </p>
                <p className="text-[10px] text-muted text-center mt-1">
                  {card.damage > 0 ? `${card.damage}-${card.damage + 7} DMG` : '+15 HP'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
