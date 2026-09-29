import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Swords, Zap, Target } from 'lucide-react';
import GameHUD from '@/components/GameHUD';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';

interface SwordClashProps {
  onBack: () => void;
}

export default function SwordClash({ onBack }: SwordClashProps) {
  const { t, language } = useLanguage();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [phase, setPhase] = useState<'waiting' | 'strike' | 'result'>('waiting');
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [popup, setPopup] = useState<{ text: string; color: string } | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const MAX_ROUNDS = 11;

  const startRound = useCallback(() => {
    if (round > MAX_ROUNDS) {
      setGameOver(true);
      return;
    }
    setPhase('waiting');
    const delay = 1000 + Math.random() * 2500;
    timeoutRef.current = window.setTimeout(() => {
      setPhase('strike');
      startTimeRef.current = performance.now();
      setFlash(true);
      setTimeout(() => setFlash(false), 150);
    }, delay);
  }, [round]);

  useEffect(() => {
    startRound();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startRound]);

  const handleStrike = () => {
    if (phase === 'strike') {
      const elapsed = performance.now() - startTimeRef.current;
      setReactionTime(elapsed);
      setPhase('result');

      if (elapsed < 500) {
        const points = Math.round(1000 - elapsed);
        setScore((s) => s + points);
        setStreak((s) => s + 1);
        setPopup({ text: `+${points}!`, color: 'var(--color-success)' });
        setShake(true);
        speak(language === 'te' ? 'బలమైన కొట్టు!' : 'Strong strike!', language);
        setTimeout(() => setShake(false), 400);
        if (bestTime === null || elapsed < bestTime) setBestTime(elapsed);
      } else if (elapsed < 800) {
        const points = Math.round(500 - elapsed / 2);
        setScore((s) => s + points);
        setStreak((s) => s + 1);
        setPopup({ text: `+${points}`, color: 'var(--color-warning)' });
      } else {
        setStreak(0);
        setPopup({ text: language === 'te' ? 'మిస్!' : 'Miss!', color: 'var(--color-error)' });
      }

      setTimeout(() => {
        setPopup(null);
        setRound((r) => r + 1);
        startRound();
      }, 1500);
    } else if (phase === 'waiting') {
      // Too early — penalty
      setStreak(0);
      setPopup({ text: language === 'te' ? 'త్వరపడ్డారు!' : 'Too early!', color: 'var(--color-error)' });
      setPhase('result');
      setTimeout(() => {
        setPopup(null);
        setRound((r) => r + 1);
        startRound();
      }, 1200);
    }
  };

  const reset = () => {
    setScore(0);
    setStreak(0);
    setRound(1);
    setGameOver(false);
    setBestTime(null);
    setReactionTime(0);
    startRound();
  };

  if (gameOver) {
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 flex items-center justify-center">
        <div className="surface p-8 text-center ornament-border animate-scale-in">
          <div className="text-5xl mb-3">{score > 5000 ? '🏆' : '⚔️'}</div>
          <h2 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
            {language === 'te' ? 'ఖడ్గ యోధుడు!' : 'Sword Warrior!'}
          </h2>
          <p className="text-sm text-muted mb-1">{t('score')}: {score}</p>
          <p className="text-sm text-muted mb-1">{language === 'te' ? 'ఉత్తమ సమయం' : 'Best Time'}: {bestTime ? `${Math.round(bestTime)}ms` : 'N/A'}</p>
          <p className="text-sm text-muted mb-4">{language === 'te' ? 'గరిష్ట స్ట్రీక్' : 'Max Streak'}: {streak}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={reset} className="btn-primary">{t('playAgain')}</button>
            <button onClick={onBack} className="btn-ghost">{t('backToArena')}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8">
      <button onClick={onBack} className="btn-ghost p-2 mb-4"><ArrowLeft size={20} /></button>
      <GameHUD level={round} score={score} gameTitle={language === 'te' ? 'ఖడ్గ సంఘర్షణ' : 'Sword Clash'} />

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{score}</p>
          <p className="text-[10px] text-muted">{t('score')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-accent">{streak}x</p>
          <p className="text-[10px] text-muted">{t('streak')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{round}/{MAX_ROUNDS}</p>
          <p className="text-[10px] text-muted">{language === 'te' ? 'రౌండ్' : 'Round'}</p>
        </div>
      </div>

      {/* Arena */}
      <div className="arcade-cabinet p-4">
        <div
          className={`relative rounded-xl overflow-hidden flex flex-col items-center justify-center cursor-pointer ${shake ? 'animate-impact-shake' : ''}`}
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #0a0a14 100%)',
            minHeight: '320px',
          }}
          onClick={handleStrike}
        >
          {/* Flash overlay */}
          {flash && (
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.3)', animation: 'strikeFlash 0.15s ease' }} />
          )}

          {/* Combatants */}
          <div className="flex items-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-5xl mb-1">🛡️</div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>Nakula</p>
            </div>
            <div className="text-4xl font-bold animate-neon-pulse" style={{ color: phase === 'strike' ? 'var(--color-error)' : 'var(--color-text-muted)' }}>
              {phase === 'strike' ? '⚔️' : '🤺'}
            </div>
            <div className="text-center">
              <div className="text-5xl mb-1">👹</div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-error)' }}>Dushasana</p>
            </div>
          </div>

          {/* Phase indicator */}
          <div className="text-center">
            {phase === 'waiting' && (
              <p className="text-sm text-muted animate-pulse">
                {language === 'te' ? 'ఖడ్గం కొట్టడానికి సిద్ధం...' : 'Wait for the strike signal...'}
              </p>
            )}
            {phase === 'strike' && (
              <div className="animate-scale-in">
                <p className="text-2xl font-bold glow-text-gold animate-neon-pulse" style={{ color: 'var(--color-error)' }}>
                  {language === 'te' ? 'ఇప్పుడు కొట్టు!' : 'STRIKE NOW!'}
                </p>
              </div>
            )}
            {phase === 'result' && reactionTime > 0 && (
              <p className="text-sm" style={{ color: 'var(--color-primary)' }}>
                {Math.round(reactionTime)}ms
              </p>
            )}
          </div>

          {/* Popup */}
          {popup && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold animate-combat-popup"
              style={{ color: popup.color, textShadow: '0 0 10px currentColor' }}>
              {popup.text}
            </div>
          )}
        </div>

        {bestTime !== null && (
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted">
            <Zap size={12} style={{ color: 'var(--color-primary)' }} />
            {language === 'te' ? 'ఉత్తమ సమయం' : 'Best Time'}: {Math.round(bestTime)}ms
          </div>
        )}
      </div>
    </div>
  );
}
