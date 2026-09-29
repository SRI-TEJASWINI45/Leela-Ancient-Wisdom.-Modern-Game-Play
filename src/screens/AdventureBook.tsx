import { useState } from 'react';
import { adventureLevels } from '@/lib/gameData';
import { BookOpen, ChevronRight, ArrowLeft, CheckCircle2, XCircle, Sparkles, Lock } from 'lucide-react';
import GameHUD from '@/components/GameHUD';

interface AdventureBookProps {
  onBack: () => void;
}

export default function AdventureBook({ onBack }: AdventureBookProps) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [phase, setPhase] = useState<'story' | 'challenge' | 'result' | 'complete'>('story');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [unlockedLevels, setUnlockedLevels] = useState(1);
  const [score, setScore] = useState(0);

  const level = adventureLevels[currentLevel];
  const isLastLevel = currentLevel === adventureLevels.length - 1;

  const handleStartChallenge = () => setPhase('challenge');

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setPhase('result');
    if (index === level.challenge.correct) {
      setScore(score + 100);
    }
  };

  const handleNext = () => {
    if (isLastLevel) {
      setPhase('complete');
      return;
    }
    const nextLevel = currentLevel + 1;
    setCurrentLevel(nextLevel);
    setUnlockedLevels(Math.max(unlockedLevels, nextLevel + 1));
    setPhase('story');
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentLevel(0);
    setPhase('story');
    setSelectedAnswer(null);
    setUnlockedLevels(1);
    setScore(0);
  };

  const isCorrect = selectedAnswer === level.challenge.correct;

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4 pb-24 md:pb-8">
      {/* Themed background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
          style={{ background: level.themeColor }} />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
          style={{ background: level.themeColor }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{level.themeIcon}</span>
            <h1 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Serpent Saga</h1>
          </div>
        </div>

        {/* HUD */}
        <GameHUD
          level={currentLevel + 1}
          score={score}
          totalLevels={adventureLevels.length}
          gameTitle="Serpent Saga"
        />

        {/* Level progress */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
          {adventureLevels.map((l, i) => {
            const isUnlocked = i < unlockedLevels;
            const isCurrent = i === currentLevel;
            const isCompleted = i < currentLevel;
            return (
              <div key={i} className="flex items-center gap-1 flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: isCompleted
                      ? 'var(--color-success)'
                      : isCurrent
                      ? 'var(--color-primary)'
                      : isUnlocked
                      ? 'var(--color-surface-alt)'
                      : 'var(--color-surface)',
                    color: isCompleted || isCurrent ? 'var(--color-bg)' : 'var(--color-text-muted)',
                    border: isCurrent ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    opacity: isUnlocked ? 1 : 0.4,
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : isUnlocked ? i + 1 : <Lock size={14} />}
                </div>
                {i < adventureLevels.length - 1 && (
                  <ChevronRight size={14} className="text-muted flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Book content */}
        <div className="surface ornament-border overflow-hidden animate-scale-in" key={currentLevel}>
          {/* Book header with theme color accent */}
          <div className="px-6 py-4" style={{
            borderBottom: '1px solid var(--color-border)',
            background: `linear-gradient(135deg, ${level.themeColor}15, transparent)`,
          }}>
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              Chapter {level.id} • {level.subtitle}
            </span>
            <h2 className="text-xl font-bold mt-1 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              <span className="text-2xl">{level.themeIcon}</span>
              {level.title}
            </h2>
          </div>

          {/* Story phase */}
          {phase === 'story' && (
            <div className="p-6 animate-fade-in">
              <div className="text-6xl text-center mb-4 opacity-30">{level.themeIcon}</div>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-text)' }}>
                {level.story}
              </p>
              <button onClick={handleStartChallenge} className="btn-primary w-full justify-center">
                <Sparkles size={18} />
                Take the Challenge
              </button>
            </div>
          )}

          {/* Challenge phase */}
          {phase === 'challenge' && (
            <div className="p-6 animate-fade-in">
              <h3 className="text-base font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
                {level.challenge.question}
              </h3>
              <div className="space-y-2">
                {level.challenge.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] animate-fade-in-up"
                    style={{
                      background: 'var(--color-surface-alt)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                      animationDelay: `${i * 0.08}s`,
                    }}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg mr-3 text-xs font-bold"
                      style={{ background: 'var(--color-surface)', color: 'var(--color-primary)' }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result phase */}
          {phase === 'result' && (
            <div className="p-6 animate-fade-in">
              <div className="flex flex-col items-center text-center mb-6">
                {isCorrect ? (
                  <>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 animate-scale-in"
                      style={{ background: 'var(--color-success)' }}>
                      <CheckCircle2 size={32} style={{ color: 'var(--color-bg)' }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-success)' }}>
                      Correct! +100 points
                    </h3>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 animate-scale-in"
                      style={{ background: 'var(--color-error)' }}>
                      <XCircle size={32} style={{ color: 'var(--color-bg)' }} />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-error)' }}>
                      Not quite — but you learned something!
                    </h3>
                  </>
                )}
              </div>

              <div className="surface-alt p-4 rounded-xl mb-4">
                <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text)' }}>
                  {level.challenge.explanation}
                </p>
              </div>

              <div className="surface-alt p-4 rounded-xl mb-6">
                <p className="text-xs font-medium uppercase tracking-wider text-accent mb-1">
                  Historical Note
                </p>
                <p className="text-sm leading-relaxed text-muted">{level.historicalNote}</p>
              </div>

              <button onClick={handleNext} className="btn-primary w-full justify-center">
                {isLastLevel ? 'Complete the Saga' : 'Next Chapter'}
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Complete phase */}
          {phase === 'complete' && (
            <div className="p-8 text-center animate-scale-in">
              <div className="text-6xl mb-4 animate-float">🐍</div>
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
                style={{ background: 'var(--color-primary)' }}>
                <Sparkles size={36} style={{ color: 'var(--color-bg)' }} />
              </div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                Saga Complete!
              </h2>
              <p className="text-sm text-muted mb-2">Final Score: {score} points</p>
              <p className="text-sm text-muted mb-6 max-w-md mx-auto">
                You've journeyed through the serpent mythology of India — from Kaliya's poisoning of the
                Yamuna to the cosmic serpent Shesha and the Jain Naga protector Dharanendra. You now know
                the real history behind these legends.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleRestart} className="btn-ghost">
                  Play Again
                </button>
                <button onClick={onBack} className="btn-primary">
                  Back to Games
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
