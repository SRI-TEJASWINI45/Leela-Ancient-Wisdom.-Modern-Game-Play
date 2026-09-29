import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import type { Page } from '@/App';
import { Sparkles, Gamepad2, MessageCircle, BookOpen, User, LogOut, Trophy, Crown, Globe, Compass } from 'lucide-react';

interface NavBarProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export default function NavBar({ current, onNavigate }: NavBarProps) {
  const { profile, signOut } = useAuth();
  const { theme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const navItems: { page: Page; label: string; icon: typeof Gamepad2 }[] = [
    { page: 'games', label: t('games'), icon: Gamepad2 },
    { page: 'discover', label: t('discover'), icon: Compass },
    { page: 'leagues', label: t('leagues'), icon: Crown },
    { page: 'subjects', label: t('subjects'), icon: BookOpen },
    { page: 'profile', label: t('profile'), icon: User },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return (
    <>
      {/* Desktop nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          background: 'color-mix(in srgb, var(--color-surface) 85%, transparent)',
          borderBottom: '1px solid var(--color-border)',
        }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => onNavigate('games')} className="flex items-center gap-2 group">
            <img src="/LOGO.jpeg" alt="Leela Logo"
              className="w-9 h-9 rounded-xl object-cover transition-transform group-hover:scale-110 neon-border-gold" />
            <span className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>Leela</span>
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={
                  current === item.page
                    ? { background: 'var(--color-surface-alt)', color: 'var(--color-primary)' }
                    : { color: 'var(--color-text-muted)' }
                }
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: 'var(--color-surface-alt)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}>
              <Globe size={14} style={{ color: 'var(--color-accent)' }} />
              {language === 'en' ? 'EN' : 'తె'}
            </button>

            <button onClick={signOut} className="btn-ghost text-sm px-3 py-1.5" title={t('signOut')}>
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('signOut')}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md"
        style={{
          background: 'color-mix(in srgb, var(--color-surface) 90%, transparent)',
          borderTop: '1px solid var(--color-border)',
        }}>
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg transition-all"
              style={
                current === item.page
                  ? { color: 'var(--color-primary)' }
                  : { color: 'var(--color-text-muted)' }
              }
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
