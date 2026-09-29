import type { ThemeName } from './supabase';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  description: string;
  bg: string;
  bgGradient: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryGlow: string;
  accent: string;
  accentSoft: string;
  success: string;
  warning: string;
  error: string;
  ring: string;
}

export const themes: Record<ThemeName, ThemeConfig> = {
  'temple-gold': {
    name: 'temple-gold',
    label: 'Temple Gold',
    description: 'Warm sandstone & gold — classic South Indian temple',
    bg: '#1a1208',
    bgGradient: 'linear-gradient(135deg, #1a1208 0%, #2a1d0e 40%, #1a1208 100%)',
    surface: '#2a1d0e',
    surfaceAlt: '#3a2a16',
    border: '#5c4220',
    text: '#f5e6c8',
    textMuted: '#c4a878',
    primary: '#e8b04d',
    primaryGlow: 'rgba(232, 176, 77, 0.35)',
    accent: '#ff7a3d',
    accentSoft: 'rgba(255, 122, 61, 0.15)',
    success: '#6bbf59',
    warning: '#e8b04d',
    error: '#e85d5d',
    ring: '#e8b04d',
  },
  'forest-green': {
    name: 'forest-green',
    label: 'Forest Sage',
    description: 'Deep forest greens — Vedic ashram vibes',
    bg: '#0d1a10',
    bgGradient: 'linear-gradient(135deg, #0d1a10 0%, #16291a 40%, #0d1a10 100%)',
    surface: '#16291a',
    surfaceAlt: '#1f3a26',
    border: '#2e5a3a',
    text: '#d8e8d0',
    textMuted: '#8fb89a',
    primary: '#4dbf8a',
    primaryGlow: 'rgba(77, 191, 138, 0.35)',
    accent: '#e8b04d',
    accentSoft: 'rgba(232, 176, 77, 0.15)',
    success: '#6bbf59',
    warning: '#e8b04d',
    error: '#e85d5d',
    ring: '#4dbf8a',
  },
  midnight: {
    name: 'midnight',
    label: 'Cosmic Indigo',
    description: 'Starry night sky — astronomy & Vedic cosmos',
    bg: '#0a0a1a',
    bgGradient: 'linear-gradient(135deg, #0a0a1a 0%, #12122a 40%, #0a0a1a 100%)',
    surface: '#12122a',
    surfaceAlt: '#1c1c3e',
    border: '#2e2e5c',
    text: '#e0e0f5',
    textMuted: '#9090b8',
    primary: '#7d8aff',
    primaryGlow: 'rgba(125, 138, 255, 0.35)',
    accent: '#5dccc7',
    accentSoft: 'rgba(93, 204, 199, 0.15)',
    success: '#6bbf59',
    warning: '#e8b04d',
    error: '#e85d5d',
    ring: '#7d8aff',
  },
  'rose-dusk': {
    name: 'rose-dusk',
    label: 'Rose Dusk',
    description: 'Sunset rose & sandstone — Rajput palace',
    bg: '#1a0d12',
    bgGradient: 'linear-gradient(135deg, #1a0d12 0%, #2a1620 40%, #1a0d12 100%)',
    surface: '#2a1620',
    surfaceAlt: '#3a212e',
    border: '#5c2e3e',
    text: '#f5d8d0',
    textMuted: '#c49098',
    primary: '#e85d7a',
    primaryGlow: 'rgba(232, 93, 122, 0.35)',
    accent: '#e8b04d',
    accentSoft: 'rgba(232, 176, 77, 0.15)',
    success: '#6bbf59',
    warning: '#e8b04d',
    error: '#e85d5d',
    ring: '#e85d7a',
  },
};

export const themeList = Object.values(themes);
