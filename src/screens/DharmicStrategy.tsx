import { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Check, X } from 'lucide-react';
import GameHUD from '@/components/GameHUD';
import { useLanguage } from '@/context/LanguageContext';

interface DharmicStrategyProps {
  onBack: () => void;
}

const GRID_SIZE = 4;
const MAX_LEVELS = 11;

export default function DharmicStrategy({ onBack }: DharmicStrategyProps) {
  const { t, language } = useLanguage();
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [target, setTarget] = useState<(string | null)[][]>([]);
  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');

  const SYMBOLS = ['🪷', '⚔️', '🛡️', '👑'];
  const maxMoves = Math.max(30 - level * 2, 10);

  const generateTarget = (): (string | null)[][] => {
    const g: (string | null)[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      const row: (string | null)[] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        // Create patterns: rows, columns, or diagonals of same symbols
        if (level <= 3) row.push(SYMBOLS[r % SYMBOLS.length]);
        else if (level <= 6) row.push(SYMBOLS[c % SYMBOLS.length]);
        else if (level <= 8) row.push(SYMBOLS[(r + c) % SYMBOLS.length]);
        else row.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
      }
      g.push(row);
    }
    return g;
  };

  const shuffleGrid = (target: (string | null)[][]): (string | null)[][] => {
    // Copy and shuffle
    const flat = target.flat();
    for (let i = flat.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flat[i], flat[j]] = [flat[j], flat[i]];
    }
    const g: (string | null)[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      g.push(flat.slice(r * GRID_SIZE, (r + 1) * GRID_SIZE));
    }
    return g;
  };

  const initLevel = () => {
    const tgt = generateTarget();
    setTarget(tgt);
    setGrid(shuffleGrid(tgt));
    setMoves(0);
    setSelected(null);
    setWon(false);
    setMessage('');
  };

  useEffect(() => {
    initLevel();
  }, [level]);

  const handleCellClick = (row: number, col: number) => {
    if (won || gameOver || moves >= maxMoves) return;

    if (!selected) {
      setSelected({ row, col });
    } else {
      // Swap
      const newGrid = grid.map((r) => [...r]);
      const tmp = newGrid[row][col];
      newGrid[row][col] = newGrid[selected.row][selected.col];
      newGrid[selected.row][selected.col] = tmp;
      setGrid(newGrid);
      setSelected(null);
      const newMoves = moves + 1;
      setMoves(newMoves);

      // Check win
      const isMatch = newGrid.every((r, ri) =>
        r.every((cell, ci) => cell === target[ri][ci])
      );

      if (isMatch) {
        setWon(true);
        const points = level * 150 + Math.max(0, (maxMoves - newMoves) * 20);
        setScore((s) => s + points);
        setMessage(language === 'te' ? `విజయం! +${points}` : `Victory! +${points}`);

        setTimeout(() => {
          if (level >= MAX_LEVELS) {
            setGameOver(true);
          } else {
            setLevel((l) => l + 1);
          }
        }, 2000);
      } else if (newMoves >= maxMoves) {
        setMessage(language === 'te' ? 'అవకాశాలు అయిపోయాయి!' : 'Out of moves!');
      }
    }
  };

  const reset = () => {
    setLevel(1);
    setScore(0);
    setGameOver(false);
    initLevel();
  };

  if (gameOver) {
    return (
      <div className="min-h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4 flex items-center justify-center">
        <div className="surface p-8 text-center ornament-border animate-scale-in">
          <div className="text-5xl mb-3">♟️</div>
          <h2 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
            {language === 'te' ? 'ధర్మ విజేత!' : 'Dharmic Victor!'}
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
      <GameHUD level={level} score={score} gameTitle={language === 'te' ? 'ధార్మిక వ్యూహం' : 'Dharmic Strategy'} />

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{score}</p>
          <p className="text-[10px] text-muted">{t('score')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-accent">{moves}/{maxMoves}</p>
          <p className="text-[10px] text-muted">{language === 'te' ? 'ఎత్తులు' : 'Moves'}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{level}/{MAX_LEVELS}</p>
          <p className="text-[10px] text-muted">{language === 'te' ? 'స్థాయి' : 'Level'}</p>
        </div>
      </div>

      <div className="arcade-cabinet p-4">
        {/* Krishna vs Shakuni */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div className="text-3xl">🪈</div>
            <p className="text-[10px] font-bold" style={{ color: 'var(--color-primary)' }}>Krishna</p>
          </div>
          <div className="text-2xl font-bold text-muted">VS</div>
          <div className="text-center">
            <div className="text-3xl">🎲</div>
            <p className="text-[10px] font-bold" style={{ color: 'var(--color-error)' }}>Shakuni</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Target grid */}
          <div className="flex-1">
            <p className="text-[10px] text-muted text-center mb-2">{language === 'te' ? 'లక్ష్యం' : 'Target'}</p>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
              {target.map((row, ri) =>
                row.map((cell, ci) => (
                  <div key={`t-${ri}-${ci}`} className="aspect-square rounded-lg flex items-center justify-center text-lg"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    {cell}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Playable grid */}
          <div className="flex-1">
            <p className="text-[10px] text-muted text-center mb-2">{language === 'te' ? 'మీ బోర్డు' : 'Your Board'}</p>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
              {grid.map((row, ri) =>
                row.map((cell, ci) => {
                  const isSelected = selected?.row === ri && selected?.col === ci;
                  const isCorrect = cell === target[ri][ci];
                  return (
                    <button
                      key={`g-${ri}-${ci}`}
                      onClick={() => handleCellClick(ri, ci)}
                      className="aspect-square rounded-lg flex items-center justify-center text-lg transition-all hover:scale-105"
                      style={{
                        background: isSelected ? 'var(--color-primary-glow)' : 'var(--color-surface-alt)',
                        border: isSelected ? '2px solid var(--color-primary)' : isCorrect ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                      }}
                    >
                      {cell}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {message && (
          <p className="text-center text-sm mt-4 animate-fade-in" style={{
            color: won ? 'var(--color-success)' : 'var(--color-error)',
          }}>
            {message}
          </p>
        )}

        {!won && moves < maxMoves && (
          <p className="text-center text-xs text-muted mt-3">
            {language === 'te' ? 'రెండు గడలను ఎంచుకుని మార్పించండి' : 'Select two tiles to swap them'}
          </p>
        )}
      </div>
    </div>
  );
}
