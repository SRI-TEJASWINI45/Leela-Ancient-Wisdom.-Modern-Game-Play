import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import NavBar from '@/components/NavBar';
import AuthScreen from '@/screens/AuthScreen';
import LandingPage from '@/screens/LandingPage';
import MitraChat from '@/screens/MitraChat';
import GameLibrary from '@/screens/GameLibrary';
import AdventureBook from '@/screens/AdventureBook';
import QuizArena from '@/screens/QuizArena';
import VedicMatch from '@/screens/VedicMatch';
import CombatArena from '@/screens/CombatArena';
import Subjects from '@/screens/Subjects';
import ProfileScreen from '@/screens/ProfileScreen';
import Leaderboard from '@/screens/Leaderboard';
import Leagues from '@/screens/Leagues';
import MahabharatModule from '@/screens/MahabharatModule';
import QuranModule from '@/screens/QuranModule';
import BibleModule from '@/screens/BibleModule';
import DiscoverScreen from '@/screens/DiscoverScreen';
import LevelUpNotification from '@/components/LevelUpNotification';
import type { ThemeName } from '@/lib/supabase';
import type { Language } from '@/lib/i18n';

export type Page = 'games' | 'mitra' | 'subjects' | 'profile' | 'leaderboard' | 'leagues' | 'combat-arena' | 'mahabharat' | 'quran' | 'bible' | 'discover';

function AppContent() {
  const { session, profile, loading } = useAuth();
  const { themeName, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [showLanding, setShowLanding] = useState(true);
  const [page, setPage] = useState<Page>('games');
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [levelUpLevel, setLevelUpLevel] = useState<number | null>(null);

  // Sync theme from user profile when it loads
  useEffect(() => {
    if (profile?.theme && profile.theme !== themeName) {
      setTheme(profile.theme as ThemeName);
    }
  }, [profile?.theme]);

  // Sync language from user profile
  useEffect(() => {
    if (profile?.language) {
      setLanguage(profile.language as Language);
    }
  }, [profile?.language]);

  // Auto-dismiss level-up notification
  useEffect(() => {
    if (levelUpLevel !== null) {
      const timer = setTimeout(() => setLevelUpLevel(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [levelUpLevel]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full animate-spin" style={{ borderTop: '2px solid var(--color-primary)' }} />
      </div>
    );
  }

  // Not signed in
  if (!session) {
    return showLanding ? (
      <LandingPage onGetStarted={() => setShowLanding(false)} />
    ) : (
      <AuthScreen />
    );
  }

  // Profile fetch in progress
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full animate-spin" style={{ borderTop: '2px solid var(--color-primary)' }} />
      </div>
    );
  }

  // Onboarding not complete — show Mitra chat
  if (!profile.onboarding_complete && page !== 'mitra') {
    return (
      <div className="min-h-screen">
        <MitraChat
          onComplete={() => setPage('games')}
          onSkip={() => setPage('games')}
        />
        {levelUpLevel && (
          <LevelUpNotification level={levelUpLevel} onClose={() => setLevelUpLevel(null)} />
        )}
      </div>
    );
  }

  // Active game
  if (activeGame) {
    const handleBack = () => setActiveGame(null);
    if (activeGame === 'adventure-book') return <AdventureBook onBack={handleBack} />;
    if (activeGame === 'quiz-arena') return <QuizArena onBack={handleBack} />;
    if (activeGame === 'puzzle-match') return <VedicMatch onBack={handleBack} />;
  }

  // Active cultural module
  if (activeModule) {
    const handleModuleBack = () => setActiveModule(null);
    if (activeModule === 'mahabharat') return <MahabharatModule onBack={handleModuleBack} />;
    if (activeModule === 'quran') return <QuranModule onBack={handleModuleBack} />;
    if (activeModule === 'bible') return <BibleModule onBack={handleModuleBack} />;
  }

  // Main app
  return (
    <div className="min-h-screen">
      <NavBar current={page} onNavigate={(p) => { setPage(p); setActiveGame(null); }} />

      {page === 'games' && (
        <GameLibrary
          onPlay={(gameId) => setActiveGame(gameId)}
          onNavigate={(p) => setPage(p)}
        />
      )}

      {page === 'mitra' && (
        <MitraChat
          onComplete={() => setPage('games')}
          onSkip={() => setPage('games')}
        />
      )}

      {page === 'subjects' && <Subjects onNavigate={(p) => setPage(p)} />}

      {page === 'leaderboard' && (
        <Leaderboard onBack={() => setPage('games')} onNavigate={(p) => setPage(p)} />
      )}

      {page === 'leagues' && (
        <Leagues onBack={() => setPage('games')} onNavigate={(p) => setPage(p)} />
      )}

      {page === 'combat-arena' && <CombatArena onBack={() => setPage('games')} />}

      {page === 'mahabharat' && <MahabharatModule onBack={() => setPage('games')} />}

      {page === 'quran' && <QuranModule onBack={() => setPage('games')} />}

      {page === 'bible' && <BibleModule onBack={() => setPage('games')} />}

      {page === 'profile' && <ProfileScreen onNavigate={(p) => setPage(p)} />}

      {page === 'discover' && <DiscoverScreen onBack={() => setPage('games')} onNavigate={(p) => setPage(p)} />}

      {/* Level-up notification overlay */}
      {levelUpLevel && (
        <LevelUpNotification level={levelUpLevel} onClose={() => setLevelUpLevel(null)} />
      )}

      {/* Footer credit */}
      <footer className="hidden md:block py-3 text-center border-t" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-[10px] text-muted opacity-60 leading-relaxed">
          Ch Sri Tejaswini – Founder &amp; CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
