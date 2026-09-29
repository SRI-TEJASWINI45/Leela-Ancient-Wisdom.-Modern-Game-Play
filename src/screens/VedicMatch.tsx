import { useState, useEffect } from 'react';
import { puzzleSets, type PuzzleSet } from '@/lib/gameData';
import { Puzzle, ArrowLeft, CheckCircle2, RotateCcw, Sparkles, Lightbulb } from 'lucide-react';
import GameHUD from '@/components/GameHUD';

interface VedicMatchProps {
  onBack: () => void;
}

interface Card {
  id: string;
  setId: number;
  text: string;
  type: 'term' | 'meaning';
  matched: boolean;
  pairIndex: number;
}

function buildCards(set: PuzzleSet): Card[] {
  const cards: Card[] = [];
  set.pairs.forEach((pair, i) => {
    cards.push({
      id: `term-${set.id}-${i}`,
      setId: set.id,
      text: pair.term,
      type: 'term',
      matched: false,
      pairIndex: i,
    });
    cards.push({
      id: `meaning-${set.id}-${i}`,
      setId: set.id,
      text: pair.meaning,
      type: 'meaning',
      matched: false,
      pairIndex: i,
    });
  });
  return cards.sort(() => Math.random() - 0.5);
}

const setEmojis: Record<number, string> = {
  1: '🛕',
  2: '🏹',
  3: '🌊',
  4: '🧑‍🏫',
};

export default function VedicMatch({ onBack }: VedicMatchProps) {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [mismatches, setMismatches] = useState(0);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [phase, setPhase] = useState<'intro' | 'playing' | 'complete'>('intro');

  const currentSet = puzzleSets[currentSetIndex];

  useEffect(() => {
    if (phase === 'playing') {
      setCards(buildCards(currentSet));
      setFlipped([]);
      setMoves(0);
      setMismatches(0);
      setShowHint(false);
    }
  }, [phase, currentSetIndex, currentSet]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstId, secondId] = flipped;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);

      if (first && second && first.pairIndex === second.pairIndex && first.type !== second.type) {
        // Match!
        setScore((s) => s + 50);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairIndex === first.pairIndex && c.setId === first.setId
                ? { ...c, matched: true }
                : c
            )
          );
          setFlipped([]);
        }, 600);
      } else {
        // Mismatch
        setMismatches((m) => m + 1);
        setTimeout(() => setFlipped([]), 1000);
      }
      setMoves((m) => m + 1);
    }
  }, [flipped, cards]);

  const allMatched = cards.length > 0 && cards.every((c) => c.matched);

  useEffect(() => {
    if (allMatched && phase === 'playing') {
      setTimeout(() => setPhase('complete'), 500);
    }
  }, [allMatched, phase]);

  const handleCardClick = (card: Card) => {
    if (card.matched || flipped.length >= 2 || flipped.includes(card.id)) return;
    setFlipped([...flipped, card.id]);
  };

  const handleStart = () => {
    setPhase('playing');
    setScore(0);
  };

  const handleNextSet = () => {
    if (currentSetIndex < puzzleSets.length - 1) {
      setCurrentSetIndex(currentSetIndex + 1);
      setPhase('playing');
    } else {
      setCurrentSetIndex(0);
      setPhase('intro');
    }
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={onBack} className="btn-ghost p-2">
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="surface p-8 ornament-border text-center animate-scale-in">
          <div className="text-6xl mb-4 animate-float">🧩</div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Vedic Match
          </h1>
          <p className="text-sm text-muted mb-6 max-w-md mx-auto">
            A relaxed matching puzzle. Pair sacred places, epic characters, rivers, and great teachers
            from across ALL Indian traditions — Hindu, Muslim, Sikh, Jain, Buddhist, and Christian.
          </p>
          <div className="surface-alt p-4 rounded-xl mb-6 text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
              Themes
            </p>
            {puzzleSets.map((s, i) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm"
                      style={{ background: 'var(--color-surface)' }}>
                  {setEmojis[i + 1] || '🧩'}
                </span>
                <span className="text-sm text-muted">{s.theme}</span>
              </div>
            ))}
          </div>
          <button onClick={handleStart} className="btn-primary w-full justify-center text-lg py-3">
            <Puzzle size={20} />
            Start Matching
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'complete') {
    const accuracy = moves > 0 ? Math.round(((moves - mismatches) / moves) * 100) : 100;
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8 flex flex-col justify-center">
        <div className="surface p-8 ornament-border text-center animate-scale-in">
          <div className="text-5xl mb-4 animate-float">{setEmojis[currentSet.id] || '🧩'}</div>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
            style={{ background: 'var(--color-primary)' }}>
            <Sparkles size={36} style={{ color: 'var(--color-bg)' }} />
          </div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
            Theme Complete!
          </h1>
          <p className="text-sm text-muted mb-2">Score: {score} points</p>
          <p className="text-sm text-muted mb-6">
            You matched all pairs in "{currentSet.theme}"
          </p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="surface-alt p-3 rounded-xl">
              <p className="text-2xl font-bold text-primary">{moves}</p>
              <p className="text-xs text-muted">Total Moves</p>
            </div>
            <div className="surface-alt p-3 rounded-xl">
              <p className="text-2xl font-bold text-primary">{accuracy}%</p>
              <p className="text-xs text-muted">Accuracy</p>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setPhase('playing')} className="btn-ghost">
              <RotateCcw size={18} />
              Replay
            </button>
            <button onClick={handleNextSet} className="btn-primary">
              {currentSetIndex < puzzleSets.length - 1 ? 'Next Theme' : 'Back to Start'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowHint(!showHint)} className="btn-ghost text-sm px-3 py-1.5">
            <Lightbulb size={16} />
            Hint
          </button>
        </div>
      </div>

      {/* HUD */}
      <GameHUD
        level={currentSetIndex + 1}
        score={score}
        totalLevels={puzzleSets.length}
        gameTitle={`Vedic Match — ${currentSet.theme}`}
      />

      {/* Theme & stats */}
      <div className="surface p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{setEmojis[currentSet.id] || '🧩'}</span>
          <div>
            <span className="text-xs font-medium uppercase tracking-wider text-accent">Theme</span>
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{currentSet.theme}</h2>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-lg font-bold text-primary">{moves}</p>
            <p className="text-xs text-muted">Moves</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary">
              {cards.filter((c) => c.matched).length / 2}/{currentSet.pairs.length}
            </p>
            <p className="text-xs text-muted">Matched</p>
          </div>
        </div>
      </div>

      {/* Hint */}
      {showHint && (
        <div className="surface-alt p-3 rounded-xl mb-4 animate-fade-in">
          <p className="text-xs text-muted">
            Match each <span className="text-primary font-medium">term</span> on one side with its
            <span className="text-primary font-medium"> meaning</span> on the other. Terms are names;
            meanings are descriptions.
          </p>
        </div>
      )}

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.matched || flipped.length >= 2}
              className="relative aspect-[3/4] rounded-xl overflow-hidden transition-all"
              style={{
                perspective: '800px',
                cursor: card.matched ? 'default' : 'pointer',
                opacity: card.matched ? 0.5 : 1,
              }}
            >
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                }}
              >
                {/* Back */}
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <Puzzle size={24} style={{ color: 'var(--color-primary)', opacity: 0.5 }} />
                </div>
                {/* Front */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-3 text-center rounded-xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: card.matched
                      ? 'rgba(107, 191, 89, 0.15)'
                      : 'var(--color-surface-alt)',
                    border: card.matched
                      ? '1px solid var(--color-success)'
                      : '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex flex-col items-center gap-1">
                    {card.matched && (
                      <CheckCircle2 size={16} style={{ color: 'var(--color-success)' }} />
                    )}
                    <p
                      className="text-xs font-medium leading-tight"
                      style={{
                        color: card.type === 'term' ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: card.type === 'term' ? 700 : 500,
                      }}
                    >
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
