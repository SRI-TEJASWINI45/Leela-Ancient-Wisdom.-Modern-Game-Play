import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import {
  characters, temples, factsAndMyths, hiddenStories, getQuoteForDay,
} from '@/lib/culturalContent';
import type { Page } from '@/App';
import {
  ArrowLeft, MapPin, Quote, Lightbulb, BookOpen, Sparkles, Volume2,
  ChevronRight, Star, Heart, Shield,
} from 'lucide-react';

interface DiscoverScreenProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

type Tab = 'characters' | 'temples' | 'quotes' | 'facts' | 'stories';

export default function DiscoverScreen({ onBack }: DiscoverScreenProps) {
  const { language, t } = useLanguage();
  const [tab, setTab] = useState<Tab>('characters');
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<number | null>(null);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  const isTe = language === 'te';
  const quote = getQuoteForDay(language);

  const tabs: { key: Tab; label: string; icon: typeof Star }[] = [
    { key: 'characters', label: t('cinematicCharacters'), icon: Star },
    { key: 'temples', label: t('exploreTemples'), icon: MapPin },
    { key: 'quotes', label: t('quoteOfTheDay'), icon: Quote },
    { key: 'facts', label: t('factsAndMyths'), icon: Lightbulb },
    { key: 'stories', label: t('hiddenStories'), icon: BookOpen },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {t('discover')}
          </h1>
        </div>
      </div>

      {/* Quote of the Day — always visible at top */}
      <div className="surface p-5 mb-6 ornament-border animate-fade-in-up"
        style={{ background: 'linear-gradient(135deg, var(--color-primary-glow), transparent)' }}>
        <div className="flex items-start gap-3">
          <Quote size={24} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-primary)' }}>
              {t('quoteOfTheDay')}
            </p>
            <p className="text-sm italic leading-relaxed mb-2" style={{ color: 'var(--color-text)' }}>
              "{isTe ? quote.textTe : quote.textEn}"
            </p>
            <p className="text-xs text-muted">
              — {isTe ? quote.authorTe : quote.authorEn}, {isTe ? quote.sourceTe : quote.sourceEn}
            </p>
          </div>
          <button
            onClick={() => speak(isTe ? quote.textTe : quote.textEn, language)}
            className="btn-ghost p-2 flex-shrink-0"
          >
            <Volume2 size={16} />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {tabs.map((tb) => {
          const Icon = tb.icon;
          const active = tab === tb.key;
          return (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all flex-shrink-0"
              style={active
                ? { background: 'var(--color-primary)', color: 'var(--color-bg)' }
                : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
            >
              <Icon size={14} />
              {tb.label}
            </button>
          );
        })}
      </div>

      {/* ===== CHARACTERS TAB ===== */}
      {tab === 'characters' && (
        <div className="space-y-3">
          {characters.map((char, i) => (
            <div key={char.id}>
              <button
                onClick={() => setSelectedCharacter(selectedCharacter === i ? null : i)}
                className="surface p-4 w-full text-left transition-all hover:scale-[1.01] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: char.gradient }}>
                    {char.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                      {isTe ? char.nameTe : char.nameEn}
                    </h3>
                    <p className="text-xs text-muted">{isTe ? char.titleTe : char.titleEn}</p>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{ color: 'var(--color-text-muted)' }}
                    className={`transition-transform ${selectedCharacter === i ? 'rotate-90' : ''}`}
                  />
                </div>
              </button>

              {selectedCharacter === i && (
                <div className="surface p-5 mt-2 animate-fade-in-up" style={{ background: 'var(--color-surface-alt)' }}>
                  {/* Cinematic description */}
                  <div className="flex items-start gap-2 mb-4">
                    <button
                      onClick={() => speak(isTe ? char.cinematicTe : char.cinematicEn, language)}
                      className="btn-ghost p-2 flex-shrink-0"
                    >
                      <Volume2 size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                      {isTe ? char.cinematicTe : char.cinematicEn}
                    </p>
                  </div>

                  {/* Traits */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(isTe ? char.traitsTe : char.traitsEn).map((trait, ti) => (
                      <span key={ti} className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ background: 'var(--color-primary-glow)', color: 'var(--color-primary)', border: '1px solid var(--color-border)' }}>
                        {char.icon} {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== TEMPLES TAB ===== */}
      {tab === 'temples' && (
        <div className="space-y-3">
          {temples.map((temple, i) => (
            <div key={temple.id}>
              <button
                onClick={() => setSelectedTemple(selectedTemple === i ? null : i)}
                className="surface p-4 w-full text-left transition-all hover:scale-[1.01] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: temple.gradient }}>
                    {temple.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                      {isTe ? temple.nameTe : temple.nameEn}
                    </h3>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} style={{ color: 'var(--color-text-muted)' }} />
                      <p className="text-xs text-muted">{isTe ? temple.locationTe : temple.locationEn}</p>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{ color: 'var(--color-text-muted)' }}
                    className={`transition-transform ${selectedTemple === i ? 'rotate-90' : ''}`}
                  />
                </div>
              </button>

              {selectedTemple === i && (
                <div className="surface p-5 mt-2 animate-fade-in-up" style={{ background: 'var(--color-surface-alt)' }}>
                  {/* Map-style gradient banner */}
                  <div className="rounded-xl h-24 mb-4 flex items-center justify-center"
                    style={{ background: temple.gradient }}>
                    <span className="text-5xl">{temple.emoji}</span>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <button
                      onClick={() => speak(isTe ? temple.descTe : temple.descEn, language)}
                      className="btn-ghost p-2 flex-shrink-0"
                    >
                      <Volume2 size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
                      {isTe ? temple.descTe : temple.descEn}
                    </p>
                  </div>

                  {/* Did you know fact */}
                  <div className="surface p-3 rounded-xl" style={{ background: 'var(--color-surface)' }}>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-accent)' }}>
                      {t('templeFact')}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>
                      {isTe ? temple.factTe : temple.factEn}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== QUOTES TAB ===== */}
      {tab === 'quotes' && (
        <div className="grid gap-3">
          {[
            ...Array.from({ length: 7 }, (_, i) => getQuoteForDay(language === 'en' ? 'en' : 'te')),
          ].slice(0, 1).map((_, idx) => (
            <div key={idx} className="surface p-6 animate-fade-in-up ornament-border"
              style={{ background: 'linear-gradient(135deg, var(--color-primary-glow), transparent)' }}>
              <div className="flex items-start gap-3">
                <Quote size={28} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-base italic leading-relaxed mb-3" style={{ color: 'var(--color-text)' }}>
                    "{isTe ? quote.textTe : quote.textEn}"
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted">
                      — {isTe ? quote.authorTe : quote.authorEn}
                      <br />
                      <span className="text-[10px]">{isTe ? quote.sourceTe : quote.sourceEn}</span>
                    </p>
                    <button
                      onClick={() => speak(isTe ? quote.textTe : quote.textEn, language)}
                      className="btn-ghost p-2"
                    >
                      <Volume2 size={18} style={{ color: 'var(--color-primary)' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== FACTS & MYTHS TAB ===== */}
      {tab === 'facts' && (
        <div className="space-y-3">
          {factsAndMyths.map((fm, i) => {
            const isExpanded = expandedFact === i;
            const isFact = fm.type === 'fact';
            return (
              <div key={i} className="surface p-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s`, borderLeft: `3px solid ${isFact ? 'var(--color-success)' : 'var(--color-warning)'}` }}>
                <button
                  onClick={() => setExpandedFact(isExpanded ? null : i)}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{fm.emoji}</span>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider mb-1 inline-block px-2 py-0.5 rounded-full"
                        style={{
                          background: isFact ? 'var(--color-success)' : 'var(--color-warning)',
                          color: 'var(--color-bg)',
                        }}>
                        {isFact ? t('fact') : t('myth')}
                      </span>
                      <p className="text-sm font-medium mt-1" style={{ color: 'var(--color-text)' }}>
                        {isTe ? fm.textTe : fm.textEn}
                      </p>
                    </div>
                    <ChevronRight
                      size={16}
                      style={{ color: 'var(--color-text-muted)' }}
                      className={`transition-transform flex-shrink-0 mt-1 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </div>
                </button>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-start gap-2">
                      <button
                        onClick={() => speak(isTe ? fm.detailTe : fm.detailEn, language)}
                        className="btn-ghost p-1.5 flex-shrink-0"
                      >
                        <Volume2 size={14} style={{ color: 'var(--color-primary)' }} />
                      </button>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                        {isTe ? fm.detailTe : fm.detailEn}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ===== HIDDEN STORIES TAB ===== */}
      {tab === 'stories' && (
        <div className="space-y-3">
          {hiddenStories.map((story, i) => (
            <div key={story.id}>
              <button
                onClick={() => setSelectedStory(selectedStory === i ? null : i)}
                className="surface p-4 w-full text-left transition-all hover:scale-[1.01] animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: story.gradient }}>
                    {story.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                      {isTe ? story.titleTe : story.titleEn}
                    </h3>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{ color: 'var(--color-text-muted)' }}
                    className={`transition-transform ${selectedStory === i ? 'rotate-90' : ''}`}
                  />
                </div>
              </button>

              {selectedStory === i && (
                <div className="surface p-5 mt-2 animate-fade-in-up" style={{ background: 'var(--color-surface-alt)' }}>
                  {/* Story banner */}
                  <div className="rounded-xl h-20 mb-4 flex items-center justify-center"
                    style={{ background: story.gradient }}>
                    <span className="text-4xl">{story.emoji}</span>
                  </div>

                  {/* Story text with narration */}
                  <div className="flex items-start gap-2 mb-4">
                    <button
                      onClick={() => speak(isTe ? story.storyTe : story.storyEn, language)}
                      className="btn-ghost p-2 flex-shrink-0"
                    >
                      <Volume2 size={16} style={{ color: 'var(--color-primary)' }} />
                    </button>
                    <div className="flex-1 max-h-64 overflow-y-auto no-scrollbar">
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--color-text)' }}>
                        {isTe ? story.storyTe : story.storyEn}
                      </p>
                    </div>
                  </div>

                  {/* Moral */}
                  <div className="surface p-3 rounded-xl flex items-start gap-2"
                    style={{ background: 'var(--color-primary-glow)' }}>
                    <Heart size={16} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                        {t('storyMoral')}
                      </span>
                      <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--color-text)' }}>
                        {isTe ? story.moralTe : story.moralEn}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
