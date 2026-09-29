import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { themeList } from '@/lib/themes';
import { getAvatar, avatars, avatarCategories, type AvatarCategory } from '@/lib/avatars';
import { getLevelInfo } from '@/lib/avatarStyles';
import AvatarInventory from '@/components/AvatarInventory';
import LearningCarousel from '@/components/LearningCarousel';
import type { ThemeName } from '@/lib/supabase';
import type { Page } from '@/App';
import { Palette, Sparkles, MessageCircle, Flame, Calendar, Check, Trophy, Globe, Star } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (page: Page) => void;
}

export default function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const { profile, session, updateProfile } = useAuth();
  const { themeName, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatarCategory, setAvatarCategory] = useState<AvatarCategory>('animals');

  const handleThemeChange = async (name: ThemeName) => {
    setTheme(name);
    if (profile) {
      await updateProfile({ theme: name });
    }
  };

  const handleAvatarChange = async (avatarId: string) => {
    if (profile) {
      await updateProfile({ avatar_id: avatarId });
      setShowAvatarPicker(false);
    }
  };

  const handleLanguageChange = async (lang: 'en' | 'te') => {
    setLanguage(lang);
    if (profile) {
      await updateProfile({ language: lang });
    }
  };

  const handleLearningPrefChange = async (pref: string) => {
    if (profile) {
      await updateProfile({ learning_preference: pref });
    }
  };

  const currentAvatar = getAvatar(profile?.avatar_id || 'lotus');
  const playerLevel = profile?.player_level || 1;
  const levelInfo = getLevelInfo(playerLevel);

  const interestLabels: Record<string, string> = {
    'mythology': language === 'te' ? 'పురాణాలు & ఇతిహాసాలు' : 'Mythology & Epics',
    'architecture': language === 'te' ? 'వాస్తుశిల్పం & దేవాలయాలు' : 'Architecture & Temples',
    'vedic-science': language === 'te' ? 'వేదిక్ సైన్స్' : 'Vedic Science',
    'snake-mythology': language === 'te' ? 'సర్ప పురాణాలు' : 'Snake Mythology',
    'history': language === 'te' ? 'ప్రాచీన చరిత్ర' : 'Ancient History',
    'culture': language === 'te' ? 'సంస్కృతి & సంప్రదాయాలు' : 'Culture & Traditions',
    'sufi-heritage': language === 'te' ? 'సూఫీ & ఇస్లామిక్ వారసత్వం' : 'Sufi & Islamic Heritage',
    'multi-faith': language === 'te' ? 'సిక్, జైన & బౌద్ధ' : 'Sikh, Jain & Buddhist',
  };

  const filteredAvatars = avatars.filter((a) => a.category === avatarCategory);

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4 pb-24 md:pb-8">
      {/* Profile header with avatar + level badge */}
      <div className="surface p-6 mb-6 ornament-border animate-fade-in-up">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="relative group flex-shrink-0"
          >
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-transform group-hover:scale-105"
              style={{ background: currentAvatar.gradient, border: '2px solid var(--color-primary)', boxShadow: '0 0 16px var(--color-primary-glow)' }}>
              {currentAvatar.emoji}
            </div>
            {/* Level decoration */}
            {playerLevel >= 7 && (
              <div className="absolute -top-3 -right-2 text-lg animate-neon-pulse">
                {levelInfo.decoration}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{ background: 'var(--color-primary)', color: 'var(--color-bg)', border: '2px solid var(--color-surface)' }}>
              L{playerLevel}
            </div>
            <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'rgba(0,0,0,0.4)' }}>
              <span className="text-xs font-medium text-white">{language === 'te' ? 'మార్చండి' : 'Change'}</span>
            </div>
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>
              {profile?.display_name || 'Explorer'}
            </h1>
            <p className="text-sm text-muted">{session?.user?.email}</p>
            <p className="text-xs text-muted mt-1">
              {language === 'te' ? 'అవతార్' : 'Avatar'}: {currentAvatar.label} • {language === 'te' ? levelInfo.titleTe : levelInfo.titleEn}
            </p>
          </div>
        </div>
      </div>

      {/* Avatar picker */}
      {showAvatarPicker && (
        <div className="surface p-4 mb-6 animate-fade-in-up">
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text)' }}>
            {language === 'te' ? 'మీ అవతార్ ఎంచుకోండి' : 'Choose Your Avatar'}
          </h3>
          <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
            {avatarCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setAvatarCategory(cat.key)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex-shrink-0"
                style={
                  avatarCategory === cat.key
                    ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
                    : { background: 'var(--color-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }
                }
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {filteredAvatars.map((av) => (
              <button
                key={av.id}
                onClick={() => handleAvatarChange(av.id)}
                className="relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all"
                style={{
                  background: av.id === profile?.avatar_id ? av.gradient : 'var(--color-surface)',
                  border: av.id === profile?.avatar_id
                    ? '2px solid var(--color-primary)'
                    : '1px solid var(--color-border)',
                  transform: av.id === profile?.avatar_id ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <span className="text-2xl mb-0.5">{av.emoji}</span>
                <span className="text-[10px] font-medium px-1 text-center leading-tight"
                  style={{ color: av.id === profile?.avatar_id ? 'var(--color-bg)' : 'var(--color-text-muted)' }}>
                  {av.label}
                </span>
                {av.id === profile?.avatar_id && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-primary)' }}>
                    <Check size={10} style={{ color: 'var(--color-bg)' }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="surface p-4 text-center">
          <Flame size={20} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-1" />
          <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{profile?.streak || 0}</p>
          <p className="text-xs text-muted">{t('dayStreak')}</p>
        </div>
        <div className="surface p-4 text-center">
          <Trophy size={20} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-1" />
          <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{profile?.total_score || 0}</p>
          <p className="text-xs text-muted">{t('totalPoints')}</p>
        </div>
        <div className="surface p-4 text-center">
          <Star size={20} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-1" />
          <p className="text-lg font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>L{playerLevel}</p>
          <p className="text-xs text-muted">{t('playerLevel')}</p>
        </div>
        <div className="surface p-4 text-center">
          <Calendar size={20} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-1" />
          <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {profile?.reading_age || 14}
          </p>
          <p className="text-xs text-muted">{t('readingAge')}</p>
        </div>
      </div>

      {/* 11-Level Avatar Inventory with layered visuals + speech level-up */}
      <AvatarInventory />

      {/* Language toggle */}
      <div className="surface p-6 mb-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            {language === 'te' ? 'భాష' : 'Language'}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleLanguageChange('en')}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={language === 'en'
              ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
              : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('te')}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={language === 'te'
              ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
              : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            తెలుగు
          </button>
        </div>
      </div>

      {/* Learning preference + media carousel */}
      <LearningCarousel />

      {/* Preferences */}
      <div className="surface p-6 mb-6 animate-fade-in-up">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">
          {t('preferences')}
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted mb-1.5">{t('gamingStyle')}</p>
            <p className="text-sm font-medium capitalize" style={{ color: 'var(--color-text)' }}>
              {profile?.game_style || (language === 'te' ? 'ఇంకా సెట్ చేయలేదు' : 'Not set yet')}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted mb-1.5">{t('interests')}</p>
            <div className="flex flex-wrap gap-2">
              {profile?.interests && profile.interests.length > 0 ? (
                profile.interests.map((interest) => (
                  <span key={interest} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'var(--color-surface-alt)',
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-border)',
                    }}>
                    {interestLabels[interest] || interest}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted">{language === 'te' ? 'ఇంకా సెట్ చేయలేదు' : 'Not set yet'}</p>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs text-muted mb-1.5">{t('preferredTopics')}</p>
            <div className="flex flex-wrap gap-2">
              {profile?.preferred_topics && profile.preferred_topics.length > 0 ? (
                profile.preferred_topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'var(--color-accent-soft)',
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border)',
                    }}>
                    {topic}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted">{language === 'te' ? 'ఇంకా సెట్ చేయలేదు' : 'Not set yet'}</p>
              )}
            </div>
          </div>
        </div>

        <button onClick={() => onNavigate('mitra')} className="btn-ghost w-full justify-center mt-4 text-sm">
          <MessageCircle size={16} />
          {t('updateWithMitra')}
        </button>
      </div>

      {/* Theme settings */}
      <div className="surface p-6 mb-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <Palette size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            {t('themeSettings')}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {themeList.map((th) => (
            <button
              key={th.name}
              onClick={() => handleThemeChange(th.name)}
              className="relative p-4 rounded-xl text-left transition-all"
              style={{
                background: th.bg,
                border: themeName === th.name
                  ? `2px solid ${th.primary}`
                  : '1px solid var(--color-border)',
              }}
            >
              {themeName === th.name && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: th.primary }}>
                  <Check size={12} style={{ color: th.bg }} />
                </div>
              )}
              <div className="flex gap-1.5 mb-2">
                <div className="w-6 h-6 rounded-lg" style={{ background: th.primary }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: th.accent }} />
                <div className="w-6 h-6 rounded-lg" style={{ background: th.surface }} />
              </div>
              <p className="text-sm font-bold" style={{ color: th.text }}>{th.label}</p>
              <p className="text-xs" style={{ color: th.textMuted }}>{th.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer credit */}
      <div className="pt-6 border-t text-center" style={{ borderColor: 'var(--color-border)' }}>
        <p className="text-[10px] text-muted opacity-60 leading-relaxed">
          Ch Sri Tejaswini – Founder &amp; CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO
        </p>
      </div>
    </div>
  );
}
