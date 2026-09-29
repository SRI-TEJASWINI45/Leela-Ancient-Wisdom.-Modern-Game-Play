import { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, Eye, Check } from 'lucide-react';
import GameHUD from '@/components/GameHUD';
import { useLanguage } from '@/context/LanguageContext';

interface AstroTricksProps {
  onBack: () => void;
}

interface Symbol {
  id: number;
  emoji: string;
  nameEn: string;
  nameTe: string;
}

const symbols: Symbol[] = [
  { id: 0, emoji: '♈', nameEn: 'Aries', nameTe: 'మేషం' },
  { id: 1, emoji: '♉', nameEn: 'Taurus', nameTe: 'వృషభం' },
  { id: 2, emoji: '♊', nameEn: 'Gemini', nameTe: 'మిథునం' },
  { id: 3, emoji: '♋', nameEn: 'Cancer', nameTe: 'కటకం' },
  { id: 4, emoji: '♌', nameEn: 'Leo', nameTe: 'సింహం' },
  { id: 5, emoji: '♍', nameEn: 'Virgo', nameTe: 'కన్య' },
];

const MAX_LEVELS = 11;

export default function AstroTricks({ onBack }: AstroTricksProps) {
  const { t, language } = useLanguage();
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userGuess, setUserGuess] = useState<number[]>([]);
  const [showPattern, setShowPattern] = useState(true);
  const [message, setMessage] = useState('');
  const [correct, setCorrect] = useState<boolean | null>(null);

  const patternLength = Math.min(2 + Math.floor(level / 2), 6);

  const generatePattern = () => {
    const p: number[] = [];
    for (let i = 0; i < patternLength; i++) {
      p.push(Math.floor(Math.random() * symbols.length));
    }
    setPattern(p);
    setUserGuess([]);
    setShowPattern(true);
    setMessage('');
    setCorrect(null);

    // Show pattern for a duration based on level
    const showDuration = Math.max(2000 - level * 100, 1000);
    setTimeout(() => {
      setShowPattern(false);
    }, showDuration);
  };

  useEffect(() => {
    generatePattern();
  }, [level]);

  const handleSymbolClick = (id: number) => {
    if (showPattern || correct !== null) return;
    const newGuess = [...userGuess, id];
    setUserGuess(newGuess);

    // Check if this guess is wrong
    if (newGuess[newGuess.length - 1] !== pattern[newGuess.length - 1]) {
      setCorrect(false);
      setMessage(language === 'te' ? 'తప్పు! మళ్లీ ప్రయత్నించండి.' : 'Wrong! Try again.');
      return;
    }

    // Check if complete
    if (newGuess.length === pattern.length) {
      setCorrect(true);
      const points = level * 100;
      setScore((s) => s + points);
      setMessage(language === 'te' ? `సరైనది! +${points}` : `Correct! +${points}`);

      setTimeout(() => {
        if (level >= MAX_LEVELS) {
          setGameOver(true);
        } else {
          setLevel((l) => l + 1);
        }
      }, 1500);
    }
  };

  const reset = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    setCorrect(null);
    setMessage('');
  };

  if (gameOver) {
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 flex items-center justify-center">
        <div className="surface p-8 text-center ornament-border animate-scale-in">
          <div className="text-5xl mb-3">🔮</div>
          <h2 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
            {language === 'te' ? 'భవిష్యద్రష్ట!' : 'Seer of Stars!'}
          </h2>
          <p className="text-sm text-muted mb-4">{t('score')}: {score}</p>
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
      <GameHUD level={level} score={score} gameTitle={language === 'te' ? 'జ్యోతిష్య తంత్రాలు' : 'Astrological Tricks'} />

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{score}</p>
          <p className="text-[10px] text-muted">{t('score')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-accent">{level}/{MAX_LEVELS}</p>
          <p className="text-[10px] text-muted">{language === 'te' ? 'స్థాయి' : 'Level'}</p>
        </div>
      </div>

      <div className="arcade-cabinet p-4">
        {/* Sahadeva avatar */}
        <div className="text-center mb-4">
          <div className="text-4xl mb-1 animate-float">🔮</div>
          <p className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>Sahadeva</p>
        </div>

        {/* Pattern display */}
        <div className="surface-alt p-4 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Eye size={16} style={{ color: 'var(--color-primary)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
              {showPattern
                ? (language === 'te' ? 'నమూనాన్ని గుర్తుంచుకోండి...' : 'Memorize the pattern...')
                : (language === 'te' ? 'నమూనాను పునరావృత్తం చేయండి' : 'Repeat the pattern')}
            </p>
          </div>

          {/* Pattern symbols */}
          <div className="flex items-center justify-center gap-2 flex-wrap min-h-[48px]">
            {showPattern ? (
              pattern.map((id, i) => (
                <div key={i} className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl animate-scale-in"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-primary)', animationDelay: `${i * 0.15}s` }}>
                  {symbols[id].emoji}
                </div>
              ))
            ) : (
              userGuess.map((id, i) => (
                <div key={i} className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl animate-scale-in"
                  style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
                  {symbols[id].emoji}
                </div>
              )).concat(
                Array.from({ length: pattern.length - userGuess.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: 'var(--color-surface)', border: '1px dashed var(--color-border)' }}>
                    <span className="text-xs text-muted">?</span>
                  </div>
                ))
              )
            )}
          </div>

          {message && (
            <p className="text-center text-sm mt-3 animate-fade-in" style={{
              color: correct ? 'var(--color-success)' : 'var(--color-error)',
            }}>
              {message}
            </p>
          )}
        </div>

        {/* Symbol grid */}
        <div className="grid grid-cols-3 gap-2">
          {symbols.map((sym) => (
            <button
              key={sym.id}
              onClick={() => handleSymbolClick(sym.id)}
              disabled={showPattern || correct !== null}
              className="surface-alt p-4 rounded-xl flex flex-col items-center transition-all hover:scale-[1.05] disabled:opacity-50"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <span className="text-3xl mb-1">{sym.emoji}</span>
              <span className="text-[10px] text-muted">{language === 'te' ? sym.nameTe : sym.nameEn}</span>
            </button>
          ))}
        </div>

        {correct === false && (
          <button onClick={generatePattern} className="btn-ghost w-full justify-center mt-4 text-sm">
            {language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : 'Try Again'}
          </button>
        )}
      </div>
    </div>
  );
}
