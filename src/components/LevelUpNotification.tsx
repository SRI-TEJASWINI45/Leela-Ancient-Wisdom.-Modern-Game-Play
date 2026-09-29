import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import { getLevelInfo } from '@/lib/avatarStyles';
import { Sparkles, X } from 'lucide-react';

interface LevelUpNotificationProps {
  level: number;
  onClose: () => void;
}

export default function LevelUpNotification({ level, onClose }: LevelUpNotificationProps) {
  const { language } = useLanguage();
  const [show, setShow] = useState(true);
  const levelInfo = getLevelInfo(level);

  useEffect(() => {
    const message = language === 'te'
      ? `హేయ్! మీరు లెవెల్ అప్ అయ్యారు! అభినందనలు!`
      : `Hey! You have been leveled up! Congratulations!`;
    speak(message, language);

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [language, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
      {/* Backdrop burst */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at center, rgba(232,176,77,0.2), transparent 60%)',
      }} />

      {/* Level up card */}
      <div className="relative pointer-events-auto animate-level-up-burst">
        <div className="arcade-cabinet p-8 max-w-sm text-center">
          <button onClick={() => { setShow(false); onClose(); }}
            className="absolute top-2 right-2 p-1 rounded-lg opacity-60 hover:opacity-100"
            style={{ color: 'var(--color-text-muted)' }}>
            <X size={16} />
          </button>

          <div className="text-6xl mb-3 animate-float">{levelInfo.decoration}</div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: 'var(--color-primary-glow)' }}>
            <Sparkles size={14} style={{ color: 'var(--color-primary)' }} />
            <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>
              LEVEL UP!
            </span>
          </div>

          <h2 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
            Level {level}
          </h2>
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
            {language === 'te' ? levelInfo.titleTe : levelInfo.titleEn}
          </p>
          <p className="text-sm text-muted mb-4">
            {language === 'te' ? levelInfo.unlockTe : levelInfo.unlockEn}
          </p>

          {/* Progression bar */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-all"
                style={{
                  background: i < level ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: i < level ? '0 0 6px var(--color-primary-glow)' : 'none',
                }} />
            ))}
          </div>

          <p className="text-xs text-muted">
            {language === 'te'
              ? 'మీ అవతార్ కొత్త ఆభరణాలు పొందింది!'
              : 'Your avatar has gained new decorations!'}
          </p>
        </div>
      </div>
    </div>
  );
}
