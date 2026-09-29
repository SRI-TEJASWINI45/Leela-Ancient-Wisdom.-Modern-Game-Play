import { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Target, Zap } from 'lucide-react';
import GameHUD from '@/components/GameHUD';
import { useLanguage } from '@/context/LanguageContext';

interface ArcheryQuestProps {
  onBack: () => void;
}

interface TargetObj {
  x: number;
  y: number;
  vx: number;
  emoji: string;
  hit: boolean;
  size: number;
  points: number;
}

interface ArrowObj {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const TARGET_EMOJIS = ['🎯', '🏹', '🪵', '🕉️', '⚔️', '🛡️', '👑', '🦁'];
const CANVAS_W = 800;
const CANVAS_H = 500;
const BOW_Y = CANVAS_H - 60;
const GRAVITY = 0.35;

export default function ArcheryQuest({ onBack }: ArcheryQuestProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [arrowsLeft, setArrowsLeft] = useState(15);
  const [targetsHit, setTargetsHit] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const targetsRef = useRef<TargetObj[]>([]);
  const arrowsRef = useRef<ArrowObj[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const bowXRef = useRef(CANVAS_W / 2);
  const animFrameRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const streakRef = useRef(0);
  const arrowsRef2 = useRef(15);
  const targetsHitRef = useRef(0);

  const spawnTarget = useCallback(() => {
    const emoji = TARGET_EMOJIS[Math.floor(Math.random() * TARGET_EMOJIS.length)];
    targetsRef.current.push({
      x: Math.random() * (CANVAS_W - 80) + 40,
      y: Math.random() * 200 + 40,
      vx: (Math.random() - 0.5) * 2,
      emoji,
      hit: false,
      size: 36,
      points: emoji === '👑' ? 200 : emoji === '🛡️' ? 150 : 100,
    });
  }, []);

  const addParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * (2 + Math.random() * 3),
        vy: Math.sin(angle) * (2 + Math.random() * 3),
        life: 1,
        color,
      });
    }
  };

  const shoot = useCallback((targetX: number, targetY: number) => {
    if (arrowsRef2.current <= 0 || gameOver) return;
    const dx = targetX - bowXRef.current;
    const dy = targetY - BOW_Y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const speed = 12;
    arrowsRef.current.push({
      x: bowXRef.current,
      y: BOW_Y,
      vx: (dx / dist) * speed,
      vy: (dy / dist) * speed,
      active: true,
    });
    arrowsRef2.current--;
    setArrowsLeft(arrowsRef2.current);
  }, [gameOver]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const scaleY = CANVAS_H / rect.height;
    let clientX: number, clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    shoot(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    bowXRef.current = Math.max(40, Math.min(CANVAS_W - 40, (e.clientX - rect.left) * scaleX));
  };

  const reset = useCallback(() => {
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setArrowsLeft(15);
    setTargetsHit(0);
    setGameOver(false);
    scoreRef.current = 0;
    streakRef.current = 0;
    arrowsRef2.current = 15;
    targetsHitRef.current = 0;
    targetsRef.current = [];
    arrowsRef.current = [];
    particlesRef.current = [];
    for (let i = 0; i < 5; i++) spawnTarget();
  }, [spawnTarget]);

  useEffect(() => {
    reset();
    const interval = setInterval(() => {
      if (targetsRef.current.length < 8 && !gameOver) spawnTarget();
    }, 2000);

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear with dark gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      bgGrad.addColorStop(0, '#0d1a10');
      bgGrad.addColorStop(0.5, '#16291a');
      bgGrad.addColorStop(1, '#0d1a10');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw forest silhouette
      ctx.fillStyle = 'rgba(46, 90, 58, 0.3)';
      for (let i = 0; i < 8; i++) {
        const x = i * 100;
        ctx.beginPath();
        ctx.moveTo(x, CANVAS_H - 80);
        ctx.lineTo(x + 30, CANVAS_H - 130);
        ctx.lineTo(x + 60, CANVAS_H - 80);
        ctx.fill();
      }

      // Update and draw targets
      targetsRef.current.forEach((target) => {
        if (target.hit) return;
        target.x += target.vx;
        if (target.x < 20 || target.x > CANVAS_W - 20) target.vx *= -1;
        ctx.font = `${target.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(target.emoji, target.x, target.y);
      });

      // Remove hit targets after delay
      targetsRef.current = targetsRef.current.filter((t) => !t.hit || t.size > 0);

      // Update and draw arrows
      arrowsRef.current.forEach((arrow) => {
        if (!arrow.active) return;
        arrow.vy += GRAVITY;
        arrow.x += arrow.vx;
        arrow.y += arrow.vy;

        // Draw arrow
        const angle = Math.atan2(arrow.vy, arrow.vx);
        ctx.save();
        ctx.translate(arrow.x, arrow.y);
        ctx.rotate(angle);
        ctx.strokeStyle = '#e8b04d';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(5, -4);
      ctx.lineTo(5, 4);
      ctx.fill();
      // Fletching
      ctx.fillStyle = '#ff7a3d';
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(-20, -4);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-20, 4);
      ctx.fill();
      ctx.restore();

        // Check collisions
        targetsRef.current.forEach((target) => {
          if (target.hit) return;
          const dx = arrow.x - target.x;
          const dy = arrow.y - target.y;
          if (Math.sqrt(dx * dx + dy * dy) < target.size / 2 + 5) {
            target.hit = true;
            target.size = 0;
            arrow.active = false;
            scoreRef.current += target.points;
            streakRef.current += 1;
            targetsHitRef.current += 1;
            setScore(scoreRef.current);
            setStreak(streakRef.current);
            setMaxStreak((m) => Math.max(m, streakRef.current));
            setTargetsHit(targetsHitRef.current);
            addParticles(target.x, target.y, '#ffd700');
          }
        });

        // Remove off-screen arrows
        if (arrow.y > CANVAS_H || arrow.x < 0 || arrow.x > CANVAS_W) {
          arrow.active = false;
          streakRef.current = 0;
          setStreak(0);
        }
      });
      arrowsRef.current = arrowsRef.current.filter((a) => a.active);

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.02;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Draw bow at bottom
      const bowX = bowXRef.current;
      ctx.strokeStyle = '#e8b04d';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(bowX, BOW_Y, 25, -Math.PI / 2.5, Math.PI / 2.5);
      ctx.stroke();
      // Bow string
      ctx.strokeStyle = '#f5e6c8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(bowX - 20, BOW_Y - 20);
      ctx.lineTo(bowX, BOW_Y);
      ctx.lineTo(bowX + 20, BOW_Y - 20);
      ctx.stroke();

      // Check game over
      if (arrowsRef2.current <= 0 && arrowsRef.current.length === 0 && !gameOver) {
        setGameOver(true);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearInterval(interval);
    };
  }, [spawnTarget, reset, gameOver]);

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
      </div>

      <GameHUD level={1} score={score} gameTitle={t('arjunasArchery')} />

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="surface-alt p-2 text-center">
          <Target size={14} className="mx-auto mb-1" style={{ color: 'var(--color-primary)' }} />
          <p className="text-lg font-bold text-primary">{score}</p>
          <p className="text-[10px] text-muted">{t('score')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <Zap size={14} className="mx-auto mb-1" style={{ color: 'var(--color-accent)' }} />
          <p className="text-lg font-bold text-accent">{streak}x</p>
          <p className="text-[10px] text-muted">{t('streak')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{targetsHit}</p>
          <p className="text-[10px] text-muted">{t('targetsHit')}</p>
        </div>
        <div className="surface-alt p-2 text-center">
          <p className="text-lg font-bold text-primary">{arrowsLeft}</p>
          <p className="text-[10px] text-muted">{t('arrows')}</p>
        </div>
      </div>

      {/* Canvas in arcade cabinet */}
      <div className="arcade-cabinet p-3">
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onTouchStart={handleCanvasClick}
            className="w-full rounded-xl cursor-crosshair"
            style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}`, touchAction: 'none' }}
          />

          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl"
              style={{ background: 'rgba(10,10,20,0.85)' }}>
              <div className="text-center animate-scale-in">
                <div className="text-5xl mb-3">{score > 500 ? '🏆' : '🎯'}</div>
                <h2 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
                  {score > 500 ? 'Archer Master!' : 'Quest Complete'}
                </h2>
                <p className="text-sm text-muted mb-1">Final Score: {score}</p>
                <p className="text-sm text-muted mb-4">Max Streak: {maxStreak}x • Targets: {targetsHit}</p>
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

          {!gameOver && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs text-muted"
              style={{ background: 'rgba(10,10,20,0.7)' }}>
              {t('tapToShoot')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
