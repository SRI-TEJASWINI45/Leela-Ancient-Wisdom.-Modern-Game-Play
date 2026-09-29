import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { themes, type ThemeConfig } from '@/lib/themes';
import type { ThemeName } from '@/lib/supabase';

interface ThemeContextValue {
  theme: ThemeConfig;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'leela-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('temple-gold');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && themes[stored]) {
      setThemeName(stored);
    }
  }, []);

  useEffect(() => {
    const t = themes[themeName];
    const root = document.documentElement;
    root.style.setProperty('--color-bg', t.bg);
    root.style.setProperty('--color-bg-gradient', t.bgGradient);
    root.style.setProperty('--color-surface', t.surface);
    root.style.setProperty('--color-surface-alt', t.surfaceAlt);
    root.style.setProperty('--color-border', t.border);
    root.style.setProperty('--color-text', t.text);
    root.style.setProperty('--color-text-muted', t.textMuted);
    root.style.setProperty('--color-primary', t.primary);
    root.style.setProperty('--color-primary-glow', t.primaryGlow);
    root.style.setProperty('--color-accent', t.accent);
    root.style.setProperty('--color-accent-soft', t.accentSoft);
    root.style.setProperty('--color-success', t.success);
    root.style.setProperty('--color-warning', t.warning);
    root.style.setProperty('--color-error', t.error);
    root.style.setProperty('--color-ring', t.ring);
  }, [themeName]);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    localStorage.setItem(STORAGE_KEY, name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
