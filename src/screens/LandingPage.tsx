import { useState } from 'react';
import { Sparkles, ArrowRight, Gamepad2, Swords, Puzzle, Volume2 } from 'lucide-react';
import { avatarStyles, type AvatarStyle } from '@/lib/avatarStyles';
import { speak } from '@/lib/speech';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('fusion-anime');

  const handleSelect = (style: AvatarStyle, name: string) => {
    setSelectedStyle(style);
    speak(`${name} selected`, 'en');
  };

  const gamePreviews = [
    { icon: Gamepad2, title: 'Trivia Hub', desc: 'Test your knowledge across all Indian traditions' },
    { icon: Puzzle, title: 'Puzzle Quests', desc: 'Match sacred places, characters, and teachings' },
    { icon: Swords, title: 'Epic Combat', desc: 'Archery, wrestling, and tactical combat games' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Starfield + decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="starfield w-full h-full" />
        <div className="mandala-bg w-full h-full" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 blur-3xl animate-float"
          style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl animate-float"
          style={{ background: 'var(--color-accent)', animationDelay: '1s' }} />
      </div>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 animate-fade-in"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
          <span className="text-xs font-medium text-muted">AI-Powered Gamified Cultural Learning</span>
        </div>

        {/* Logo */}
        <div className="mb-4 animate-fade-in-up">
          <img src="/LOGO.jpeg" alt="Leela Logo"
            className="w-24 h-24 rounded-2xl object-cover mx-auto neon-border-gold animate-pulse-glow" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 animate-fade-in-up glow-text-gold"
          style={{ color: 'var(--color-primary)' }}>
          Leela
        </h1>
        <p className="text-xl sm:text-2xl font-medium mb-3 animate-fade-in-up glow-text-indigo"
          style={{ color: 'var(--color-accent)', animationDelay: '0.1s' }}>
          Ancient Heritage. Modern Gameplay.
        </p>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted mb-8 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}>
          An immersive 3D-styled cultural gaming ecosystem that transforms Indian heritage into
          personalized interactive experiences. Meet Mitra — your AI guide who speaks to you,
          learns how you play, and crafts your perfect learning adventure.
        </p>

        <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-3 animate-fade-in-up animate-pulse-glow"
          style={{ animationDelay: '0.3s' }}>
          Start Your Journey
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Dynamic Avatar Selector */}
      <section className="relative max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-6 justify-center">
          <Volume2 size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-xl sm:text-2xl font-bold text-center" style={{ color: 'var(--color-text)' }}>
            Choose Your Avatar Style
          </h2>
        </div>
        <p className="text-center text-sm text-muted mb-8 max-w-lg mx-auto">
          Select your preferred visual aesthetic. This defines how your avatar looks throughout the game.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {avatarStyles.map((style, i) => (
            <button
              key={style.id}
              onClick={() => handleSelect(style.id, style.labelEn)}
              className={`surface p-6 rounded-2xl transition-all hover:scale-[1.03] animate-fade-in-up ${
                selectedStyle === style.id ? 'neon-border-gold' : ''
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4"
                style={{ background: style.gradient }}>
                {style.preview}
              </div>
              <h3 className="text-base font-bold text-center mb-1" style={{ color: 'var(--color-text)' }}>
                {style.labelEn}
              </h3>
              <p className="text-xs text-muted text-center">{style.descEn}</p>
              {selectedStyle === style.id && (
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold mx-auto"
                  style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)' }}>
                  <Sparkles size={10} />
                  SELECTED
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Genre tabs preview */}
      <section className="relative max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: 'var(--color-text)' }}>
          Multi-Genre Gaming
        </h2>
        <p className="text-center text-muted mb-8 max-w-xl mx-auto">
          Three distinct game genres, each crafted with authentic cultural content.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {gamePreviews.map((g, i) => (
            <div key={i} className="surface p-6 ornament-border transition-transform hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'var(--color-surface-alt)' }}>
                <g.icon size={28} style={{ color: 'var(--color-primary)' }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
                {g.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 glow-text-gold" style={{ color: 'var(--color-primary)' }}>
          Ready to Meet Mitra?
        </h2>
        <p className="text-muted mb-8">
          Sign up and let our AI guide craft your personalized learning adventure.
        </p>
        <button onClick={onGetStarted} className="btn-primary text-lg px-8 py-3">
          Begin Your Journey
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Footer */}
      <footer className="relative border-t py-6 text-center" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-sm text-muted mb-1">
          Leela — Immersive Cultural Gaming Ecosystem
        </p>
        <p className="text-[10px] text-muted opacity-60 leading-relaxed">
          Ch Sri Tejaswini – Founder &amp; CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO
        </p>
      </footer>
    </div>
  );
}
