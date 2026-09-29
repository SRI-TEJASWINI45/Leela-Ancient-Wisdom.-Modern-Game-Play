import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Clock, ChevronLeft, ChevronRight, BookOpen, Moon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import { quranStories } from '@/lib/culturalContent';

interface QuranModuleProps {
  onBack: () => void;
}

export default function QuranModule({ onBack }: QuranModuleProps) {
  const { language, t } = useLanguage();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const story = quranStories.find((s) => s.level === currentLevel) || quranStories[0];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return p + (100 / (story.duration * 10));
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, story.duration]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleLevelChange = (level: number) => {
    setCurrentLevel(level);
    setIsPlaying(false);
    setProgress(0);
  };

  const handlePlayPause = () => {
    if (!isPlaying) {
      speak(language === 'te' ? story.titleTe : story.titleEn, language);
    }
    setIsPlaying((p) => !p);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2"><ArrowLeft size={20} /></button>
        <div className="flex items-center gap-2">
          <Moon size={24} style={{ color: 'var(--color-accent)' }} />
          <h1 className="text-xl font-bold glow-text-indigo" style={{ color: 'var(--color-accent)' }}>
            {language === 'te' ? 'ఖురాన్ కథా మాడ్యూల్' : 'Quran Story Module'}
          </h1>
        </div>
      </div>

      {/* Media player */}
      <div className="arcade-cabinet p-6 mb-6">
        {/* Video frame */}
        <div className="relative rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid var(--color-border)' }}>
          <div className="relative aspect-video flex items-center justify-center overflow-hidden"
            style={{ background: story.gradient }}>
            {/* Decorative Islamic pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.2) 0deg 10deg, transparent 10deg 20deg)',
                backgroundSize: '100px 100px',
              }} />

            {/* Floating emoji */}
            <div className={`text-7xl transition-transform duration-500 ${isPlaying ? 'animate-float' : ''}`}
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.4))' }}>
              {story.emoji}
            </div>

            {/* Play/pause */}
            <button onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center transition-opacity"
              style={{ opacity: isPlaying ? 0 : 1 }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                {isPlaying ? <Pause size={28} style={{ color: 'white' }} /> : <Play size={28} style={{ color: 'white' }} />}
              </div>
            </button>

            {/* Duration */}
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
              <Clock size={12} />
              {formatTime(story.duration)}
            </div>

            {/* Level badge */}
            <div className="absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-bold"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'var(--color-primary)' }}>
              {language === 'te' ? `స్థాయి ${story.level}/11` : `Level ${story.level}/11`}
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
              <div className="h-full transition-all duration-100"
                style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
            </div>
          </div>
        </div>

        {/* Story info + text sidebar */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
              {language === 'te' ? story.titleTe : story.titleEn}
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              {language === 'te' ? story.summaryTe : story.summaryEn}
            </p>
          </div>

          {/* Scrollable text translation sidebar */}
          <div className="surface-alt p-4 rounded-xl max-h-48 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={14} style={{ color: 'var(--color-primary)' }} />
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                {language === 'te' ? 'అనువాద సారాంశం' : 'Translation Summary'}
              </p>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              {language === 'te' ? story.summaryTe : story.summaryEn}
            </p>
          </div>
        </div>

        {/* Nav controls */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleLevelChange(Math.max(1, currentLevel - 1))}
            disabled={currentLevel === 1}
            className="btn-ghost text-sm disabled:opacity-30"
          >
            <ChevronLeft size={16} />
            {language === 'te' ? 'ముందు' : 'Previous'}
          </button>

          <div className="flex items-center gap-1">
            {quranStories.map((s) => (
              <button key={s.level} onClick={() => handleLevelChange(s.level)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: s.level === currentLevel ? 'var(--color-primary)' : 'var(--color-border)',
                  transform: s.level === currentLevel ? 'scale(1.4)' : 'scale(1)',
                }} />
            ))}
          </div>

          <button
            onClick={() => handleLevelChange(Math.min(11, currentLevel + 1))}
            disabled={currentLevel === 11}
            className="btn-ghost text-sm disabled:opacity-30"
          >
            {language === 'te' ? 'తర్వాత' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Level grid */}
      <div className="surface p-6 animate-fade-in-up">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
          {language === 'te' ? '11 స్థాయి ప్రవక్త కథలు' : '11 Level Prophet Stories'}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {quranStories.map((s) => (
            <button key={s.level} onClick={() => handleLevelChange(s.level)}
              className="surface-alt p-3 rounded-xl text-center transition-all hover:scale-[1.03]"
              style={{
                border: s.level === currentLevel ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                background: s.level === currentLevel ? 'var(--color-primary-glow)' : undefined,
              }}>
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--color-primary)' }}>L{s.level}</span>
              <p className="text-[10px] text-muted leading-tight mt-0.5">
                {language === 'te' ? s.titleTe : s.titleEn}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
