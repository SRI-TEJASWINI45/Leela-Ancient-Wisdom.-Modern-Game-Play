import { useState, useEffect, useCallback } from 'react';
import { quizQuestions } from '@/lib/gameData';
import { Swords, ArrowLeft, Clock, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import GameHUD from '@/components/GameHUD';

interface QuizArenaProps {
  onBack: () => void;
}

const QUESTION_TIME = 15;

const religionEmojis: Record<string, string> = {
  Hindu: '🕉️',
  Muslim: '🌙',
  Sikh: '⚔️',
  Jain: '🧘',
  Buddhist: '☸️',
  Christian: '✝️',
  'Pan-Indian': '🇮🇳',
};

export default function QuizArena({ onBack }: QuizArenaProps) {
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizQuestions[currentQ];

  const handleTimeout = useCallback(() => {
    if (!answered) {
      setAnswered(true);
      setShowFeedback(true);
      setSelectedAnswer(null);
    }
  }, [answered]);

  useEffect(() => {
    if (phase !== 'playing' || answered) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, phase, answered, handleTimeout]);

  const handleStart = () => {
    setPhase('playing');
    setCurrentQ(0);
    setScore(0);
    setTimeLeft(QUESTION_TIME);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
  };

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    setShowFeedback(true);
    if (index === question.correct) {
      const timeBonus = Math.floor(timeLeft * 10);
      setScore(score + 100 + timeBonus);
    }
  };

  const handleNext = () => {
    if (currentQ === quizQuestions.length - 1) {
      setPhase('result');
      return;
    }
    setCurrentQ(currentQ + 1);
    setTimeLeft(QUESTION_TIME);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswered(false);
  };

  const timePercent = (timeLeft / QUESTION_TIME) * 100;
  const isLowTime = timeLeft <= 5;

  if (phase === 'intro') {
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="surface p-8 ornament-border text-center animate-scale-in">
          <div className="text-6xl mb-4 animate-float">⚔️</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Heritage Arena
          </h1>
          <p className="text-sm text-muted mb-6 max-w-md mx-auto">
            Test your knowledge of India's incredible diversity — Hindu, Muslim, Sikh, Jain, Buddhist,
            and Christian heritage. You'll have {QUESTION_TIME} seconds per question. Answer fast for bonus points!
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="surface-alt p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-primary">{quizQuestions.length}</p>
              <p className="text-xs text-muted">Questions</p>
            </div>
            <div className="surface-alt p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-primary">{QUESTION_TIME}s</p>
              <p className="text-xs text-muted">Per Question</p>
            </div>
            <div className="surface-alt p-3 rounded-xl text-center">
              <p className="text-2xl font-bold text-primary">🏆</p>
              <p className="text-xs text-muted">Glory</p>
            </div>
          </div>
          <button onClick={handleStart} className="btn-primary w-full justify-center text-lg py-3">
            <Swords size={20} />
            Enter the Arena
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const percent = Math.round((score / (quizQuestions.length * 250)) * 100);
    const isHighScore = percent >= 60;
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8 flex flex-col justify-center">
        <div className="surface p-8 ornament-border text-center animate-scale-in">
          <div className="text-5xl mb-4 animate-float">{isHighScore ? '🏆' : '🎯'}</div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
            style={{ background: isHighScore ? 'var(--color-primary)' : 'var(--color-surface-alt)' }}>
            <Trophy size={36} style={{ color: isHighScore ? 'var(--color-bg)' : 'var(--color-primary)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            {isHighScore ? 'Champion!' : 'Well Played!'}
          </h1>
          <p className="text-sm text-muted mb-2">Final Score: {score} points</p>
          <p className="text-sm text-muted mb-6">
            {quizQuestions.filter((q) => q.correct === 0).length} correct out of {quizQuestions.length}
          </p>
          <div className="surface-alt p-4 rounded-xl mb-6">
            <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'var(--color-surface)' }}>
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${Math.min(percent, 100)}%`,
                  background: isHighScore ? 'var(--color-success)' : 'var(--color-primary)',
                }} />
            </div>
            <p className="text-xs text-muted">
              {isHighScore
                ? 'Outstanding! You truly know the diversity of Indian heritage.'
                : 'Keep exploring — every game makes you stronger.'}
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={handleStart} className="btn-ghost">
              <RotateCcw size={18} />
              Play Again
            </button>
            <button onClick={onBack} className="btn-primary">
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8">
      {/* Themed background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl animate-float"
          style={{ background: 'var(--color-accent)' }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--color-surface-alt)' }}>
            <Trophy size={16} style={{ color: 'var(--color-primary)' }} />
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>{score}</span>
          </div>
        </div>

        {/* HUD */}
        <GameHUD
          level={currentQ + 1}
          score={score}
          totalLevels={quizQuestions.length}
          gameTitle="Heritage Arena"
        />

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted">
              Question {currentQ + 1} of {quizQuestions.length}
            </span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} style={{ color: isLowTime ? 'var(--color-error)' : 'var(--color-text-muted)' }} />
              <span className="text-sm font-bold" style={{ color: isLowTime ? 'var(--color-error)' : 'var(--color-text)' }}>
                {timeLeft}s
              </span>
            </div>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000 ease-linear"
              style={{
                width: `${timePercent}%`,
                background: isLowTime ? 'var(--color-error)' : 'var(--color-primary)',
              }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="surface ornament-border p-6 animate-scale-in" key={currentQ}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{religionEmojis[question.religion] || '🇮🇳'}</span>
            <span className="text-xs font-medium uppercase tracking-wider text-accent">
              {question.category} • {question.religion}
            </span>
          </div>
          <h2 className="text-lg font-bold mt-2 mb-6" style={{ color: 'var(--color-text)' }}>
            {question.question}
          </h2>

          <div className="space-y-2">
            {question.options.map((opt, i) => {
              const isCorrect = i === question.correct;
              const isSelected = i === selectedAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showWrong = showFeedback && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3"
                  style={{
                    background: showCorrect
                      ? 'rgba(107, 191, 89, 0.15)'
                      : showWrong
                      ? 'rgba(232, 93, 93, 0.15)'
                      : 'var(--color-surface-alt)',
                    border: showCorrect
                      ? '1px solid var(--color-success)'
                      : showWrong
                      ? '1px solid var(--color-error)'
                      : '1px solid var(--color-border)',
                    color: 'var(--color-text)',
                    cursor: answered ? 'default' : 'pointer',
                  }}
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold flex-shrink-0"
                    style={{
                      background: showCorrect
                        ? 'var(--color-success)'
                        : showWrong
                        ? 'var(--color-error)'
                        : 'var(--color-surface)',
                      color: showCorrect || showWrong ? 'var(--color-bg)' : 'var(--color-primary)',
                    }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {showCorrect && <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} />}
                  {showWrong && <XCircle size={18} style={{ color: 'var(--color-error)' }} />}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className="mt-4 animate-fade-in">
              <div className="surface-alt p-4 rounded-xl">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  {question.explanation}
                </p>
              </div>
              <button onClick={handleNext} className="btn-primary w-full justify-center mt-4">
                {currentQ === quizQuestions.length - 1 ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
