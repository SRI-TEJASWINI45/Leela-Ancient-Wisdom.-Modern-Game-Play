import { useState } from 'react';
import { ArrowLeft, BookOpen, Check, X, ChevronLeft, ChevronRight, Church } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import { bibleQuizzes } from '@/lib/culturalContent';

interface BibleModuleProps {
  onBack: () => void;
}

export default function BibleModule({ onBack }: BibleModuleProps) {
  const { language, t } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const quiz = bibleQuizzes.find((q) => q.level === currentLevel) || bibleQuizzes[0];
  const options = language === 'te' ? quiz.optionsTe : quiz.optionsEn;
  const question = language === 'te' ? quiz.questionTe : quiz.questionEn;
  const context = language === 'te' ? quiz.contextTe : quiz.contextEn;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === quiz.answer) {
      const points = currentLevel * 100;
      setScore((s) => s + points);
      speak(language === 'te' ? 'సరైనది!' : 'Correct!', language);
    } else {
      speak(language === 'te' ? 'తప్పు!' : 'Incorrect!', language);
    }
  };

  const handleLevelChange = (level: number) => {
    setCurrentLevel(level);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const nextLevel = () => {
    if (currentLevel < 11) handleLevelChange(currentLevel + 1);
  };

  const prevLevel = () => {
    if (currentLevel > 1) handleLevelChange(currentLevel - 1);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2"><ArrowLeft size={20} /></button>
        <div className="flex items-center gap-2">
          <Church size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {language === 'te' ? 'బైబిల్ సాహిత్య మాడ్యూల్' : 'Bible Literature Module'}
          </h1>
        </div>
      </div>

      {/* Stone-pillar architecture background */}
      <div className="relative arcade-cabinet p-6 mb-6">
        {/* Decorative stone pillars */}
        <div className="absolute left-0 top-0 bottom-0 w-8 opacity-20 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(180deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 44px)',
          }} />
        <div className="absolute right-0 top-0 bottom-0 w-8 opacity-20 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(180deg, transparent, transparent 40px, rgba(255,255,255,0.1) 40px, rgba(255,255,255,0.1) 44px)',
          }} />

        {/* Score + level */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{quiz.emoji}</span>
            <div>
              <p className="text-xs text-muted">{language === 'te' ? 'స్థాయి' : 'Level'} {currentLevel}/11</p>
              <p className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{t('score')}: {score}</p>
            </div>
          </div>
          <div className="flex gap-1">
            {bibleQuizzes.map((q) => (
              <button key={q.level} onClick={() => handleLevelChange(q.level)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all"
                style={{
                  background: q.level === currentLevel ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                  color: q.level === currentLevel ? 'var(--color-bg)' : 'var(--color-text-muted)',
                  border: q.level === currentLevel ? '2px solid var(--color-accent)' : '1px solid var(--color-border)',
                }}>
                {q.level}
              </button>
            ))}
          </div>
        </div>

        {/* Question card */}
        <div className="surface-alt p-5 rounded-xl mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-bold uppercase tracking-wider text-muted">
              {language === 'te' ? 'ప్రశ్న' : 'Question'}
            </span>
          </div>
          <p className="text-base font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            {question}
          </p>

          {/* Options */}
          <div className="grid gap-2">
            {options.map((opt, i) => {
              const isCorrect = i === quiz.answer;
              const isSelected = i === selectedAnswer;
              const showResult = answered && (isCorrect || isSelected);

              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className="surface p-3 rounded-xl flex items-center justify-between text-left transition-all"
                  style={{
                    border: showResult
                      ? isCorrect
                        ? '2px solid var(--color-success)'
                        : isSelected
                          ? '2px solid var(--color-error)'
                          : '1px solid var(--color-border)'
                      : '1px solid var(--color-border)',
                    background: showResult
                      ? isCorrect
                        ? 'rgba(77, 217, 127, 0.1)'
                        : isSelected
                          ? 'rgba(255, 85, 102, 0.1)'
                          : undefined
                      : undefined,
                    opacity: answered && !showResult ? 0.5 : 1,
                  }}
                >
                  <span className="text-sm" style={{ color: 'var(--color-text)' }}>{opt}</span>
                  {answered && isCorrect && <Check size={18} style={{ color: 'var(--color-success)' }} />}
                  {answered && isSelected && !isCorrect && <X size={18} style={{ color: 'var(--color-error)' }} />}
                </button>
              );
            })}
          </div>

          {/* Context reveal */}
          {answered && (
            <div className="mt-4 p-3 rounded-xl animate-fade-in" style={{ background: 'var(--color-surface)' }}>
              <p className="text-xs text-muted leading-relaxed">
                <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
                  {language === 'te' ? 'సందర్భం: ' : 'Context: '}
                </span>
                {context}
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between">
          <button onClick={prevLevel} disabled={currentLevel === 1}
            className="btn-ghost text-sm disabled:opacity-30">
            <ChevronLeft size={16} />
            {language === 'te' ? 'ముందు' : 'Previous'}
          </button>

          {answered && (
            <p className="text-sm font-bold" style={{
              color: selectedAnswer === quiz.answer ? 'var(--color-success)' : 'var(--color-error)',
            }}>
              {selectedAnswer === quiz.answer
                ? (language === 'te' ? `సరైనది! +${currentLevel * 100}` : `Correct! +${currentLevel * 100}`)
                : (language === 'te' ? 'తప్పు!' : 'Incorrect!')}
            </p>
          )}

          <button onClick={nextLevel} disabled={currentLevel === 11}
            className="btn-primary text-sm disabled:opacity-30">
            {language === 'te' ? 'తర్వాత' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Level grid */}
      <div className="surface p-6 animate-fade-in-up">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
          {language === 'te' ? '11 స్థాయి సాహిత్య క్విజ్‌లు' : '11 Level Literature Quizzes'}
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {bibleQuizzes.map((q) => (
            <button key={q.level} onClick={() => handleLevelChange(q.level)}
              className="surface-alt p-3 rounded-xl text-center transition-all hover:scale-[1.03]"
              style={{
                border: q.level === currentLevel ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: q.level === currentLevel ? 'var(--color-primary-glow)' : undefined,
              }}>
              <span className="text-2xl block mb-1">{q.emoji}</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--color-primary)' }}>L{q.level}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
