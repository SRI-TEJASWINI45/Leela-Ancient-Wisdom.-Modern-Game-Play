import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { avatars, avatarCategories, type AvatarCategory } from '@/lib/avatars';
import { speak, stopSpeaking, isSpeechSupported } from '@/lib/speech';
import { Sparkles, Bot, User, Check, Volume2, VolumeX, Globe } from 'lucide-react';
import type { Language } from '@/lib/i18n';

interface Message {
  role: 'mitra' | 'user';
  text: string;
}

interface MitraChatProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface ConversationStep {
  mitraTextEn: string;
  mitraTextTe: string;
  options: { labelEn: string; labelTe: string; value: string }[];
  extract: (value: string) => { gameStyle?: string; interests?: string[]; topics?: string[]; readingAge?: number };
}

const conversationSteps: ConversationStep[] = [
  {
    mitraTextEn: "Namaste! I'm Mitra, your AI guide. I'm here to learn what excites you so I can craft the perfect learning adventure. Let's start simple — what kind of games do you usually play?",
    mitraTextTe: "నమస్తే! నేను మిత్ర, మీ ఏఐ గైడ్. మీకు ఏది ఆసక్తికరంగా ఉందో తెలుసుకుని మీకు సరైన ఆటను సిఫారసు చేస్తాను. మీరు సాధారణంగా ఏ రకం ఆటలు ఆడతారు?",
    options: [
      { labelEn: 'Shooting & competitive (like BGMI)', labelTe: 'షూటింగ్ & పోటీ (BGMI లాగా)', value: 'competitive' },
      { labelEn: 'Fighting & action games', labelTe: 'ఫైటింగ్ & యాక్షన్ ఆటలు', value: 'competitive' },
      { labelEn: 'Puzzles & brain teasers', labelTe: 'పజిల్స్ & బ్రెయిన్ టీజర్లు', value: 'puzzle' },
      { labelEn: 'Quizzes & trivia', labelTe: 'క్విజ్ & ట్రివియా', value: 'quiz' },
      { labelEn: 'Casual & relaxed (like Bubble Shooter)', labelTe: 'క్యాజువల్ & రిలాక్స్డ్', value: 'casual' },
      { labelEn: 'Adventure & story games', labelTe: 'అడ్వెంచర్ & స్టోరీ ఆటలు', value: 'adventure' },
    ],
    extract: (value) => ({ gameStyle: value }),
  },
  {
    mitraTextEn: "Wonderful choice! Now, what areas of Indian heritage spark your curiosity? India has so much to explore — from every faith and tradition. Pick whatever calls to you.",
    mitraTextTe: "అద్భుతమైన ఎంపిక! ఇప్పుడు, భారతీయ వారసత్వంలో ఏ అంశాలు మీకు ఆసక్తి కలిగిస్తాయి? ప్రతి మతం మరియు సంప్రదాయం నుండి ఎంచుకోండి.",
    options: [
      { labelEn: 'Mythology & epics (Mahabharata, Ramayana)', labelTe: 'పురాణాలు & ఇతిహాసాలు (మహాభారత, రామాయణ)', value: 'mythology' },
      { labelEn: 'Architecture & temples (Chola, Mughal)', labelTe: 'వాస్తుశిల్పం & దేవాలయాలు', value: 'architecture' },
      { labelEn: 'Vedic science & mathematics', labelTe: 'వేదిక్ సైన్స్ & గణితం', value: 'vedic-science' },
      { labelEn: 'Snake mythology & Naga legends', labelTe: 'సర్ప పురాణాలు & నాగ కథలు', value: 'snake-mythology' },
      { labelEn: 'Sufi & Islamic heritage', labelTe: 'సూఫీ & ఇస్లామిక్ వారసత్వం', value: 'sufi-heritage' },
      { labelEn: 'Sikh, Jain & Buddhist traditions', labelTe: 'సిక్, జైన & బౌద్ధ సంప్రదాయాలు', value: 'multi-faith' },
    ],
    extract: (value) => ({ interests: [value] }),
  },
  {
    mitraTextEn: "Fascinating! Let me dig a little deeper. Which specific topics would you love to explore first? I'll make sure your games focus on these.",
    mitraTextTe: "ఆసక్తికరం! ఇంకా లోతుగా, మీరు ఏ అంశాలను ముందుగా అన్వేషించాలనుకుంటున్నారు?",
    options: [
      { labelEn: 'Bhagavad Gita & Mahabharata', labelTe: 'భగవద్గీత & మహాభారత', value: 'Bhagavad Gita' },
      { labelEn: 'Bible stories & teachings', labelTe: 'బైబిల్ కథలు & బోధనలు', value: 'Bible stories' },
      { labelEn: 'Quran stories & prophets', labelTe: 'ఖురాన్ కథలు & ప్రవక్తలు', value: 'Quran stories' },
      { labelEn: 'Sufi saints & their teachings', labelTe: 'సూఫీ సాధువులు & వారి బోధనలు', value: 'Sufi saints' },
      { labelEn: 'Sikh Gurus & the Khalsa', labelTe: 'సిక్ గురువులు & ఖల్సా', value: 'Sikh Gurus' },
      { labelEn: 'Buddha & Jain Tirthankaras', labelTe: 'బుద్ధ & జైన తీర్థంకరులు', value: 'Buddha journey' },
    ],
    extract: (value) => ({ topics: [value] }),
  },
  {
    mitraTextEn: "Perfect! One last thing — what's your reading age? This helps me adjust the difficulty so the games feel just right — not too easy, not too hard.",
    mitraTextTe: "సరే! చివరిగా — మీ చదివే వయస్సు ఎంత? దీనివల్ల ఆటల కష్టతరం సర్దుబాటు చేయగలను.",
    options: [
      { labelEn: '10-12 years (simpler language)', labelTe: '10-12 సంవత్సరాలు (సులభ భాష)', value: '10' },
      { labelEn: '13-15 years (balanced)', labelTe: '13-15 సంవత్సరాలు (సమతుల్య)', value: '13' },
      { labelEn: '16-18 years (more detail)', labelTe: '16-18 సంవత్సరాలు (ఎక్కువ వివరాలు)', value: '16' },
      { labelEn: 'Adult learner', labelTe: 'వయస్కుడు', value: '18' },
    ],
    extract: (value) => ({ readingAge: parseInt(value) }),
  },
];

export default function MitraChat({ onComplete, onSkip }: MitraChatProps) {
  const { updateProfile } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [step, setStep] = useState(-1); // -1 = language selection, 0+ = conversation steps
  const [phase, setPhase] = useState<'language' | 'chat' | 'avatar' | 'saving'>('language');
  const [messages, setMessages] = useState<Message[]>([]);
  const [readingAge, setReadingAge] = useState(14);
  const [extractedData, setExtractedData] = useState<{
    gameStyle?: string;
    interests?: string[];
    topics?: string[];
    readingAge?: number;
  }>({});
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [avatarCategory, setAvatarCategory] = useState<AvatarCategory>('animals');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const speechSupported = isSpeechSupported();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const speakMitra = (textEn: string, textTe: string) => {
    if (speechEnabled && speechSupported) {
      speak(language === 'te' ? textTe : textEn, language);
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setPhase('chat');
    setStep(0);
    const firstMsg = language === 'te' ? conversationSteps[0].mitraTextTe : conversationSteps[0].mitraTextEn;
    setMessages([{ role: 'mitra', text: firstMsg }]);
    setTimeout(() => speakMitra(conversationSteps[0].mitraTextEn, conversationSteps[0].mitraTextTe), 300);
  };

  const handleOptionSelect = async (option: { labelEn: string; labelTe: string; value: string }) => {
    const currentStep = conversationSteps[step];
    const extracted = currentStep.extract(option.value);
    const userLabel = language === 'te' ? option.labelTe : option.labelEn;

    setMessages((prev) => [...prev, { role: 'user', text: userLabel }]);
    stopSpeaking();

    const newExtractedData = { ...extractedData, ...extracted };
    setExtractedData(newExtractedData);

    if (step < conversationSteps.length - 1) {
      setIsTyping(true);
      setTimeout(() => {
        const nextStep = step + 1;
        const nextText = language === 'te' ? conversationSteps[nextStep].mitraTextTe : conversationSteps[nextStep].mitraTextEn;
        setMessages((prev) => [...prev, { role: 'mitra', text: nextText }]);
        setIsTyping(false);
        setStep(nextStep);
        setTimeout(() => speakMitra(conversationSteps[nextStep].mitraTextEn, conversationSteps[nextStep].mitraTextTe), 200);
      }, 800);
    } else {
      setIsTyping(true);
      setReadingAge(extracted.readingAge || readingAge);
      setTimeout(() => {
        const avatarMsgEn = "Wonderful! Now, let's pick your avatar — this is how other players will see you in the games and leaderboards. Choose from animals, flowers, warriors, or symbols!";
        const avatarMsgTe = "అద్భుతం! ఇప్పుడు, మీ అవతార్‌ను ఎంచుకోండి — ఆటలు మరియు లీడర్‌బోర్డ్‌లో ఇతర ఆటగాళ్లు మిమ్మల్ని ఇలా చూస్తారు. జంతువులు, పువ్వులు, యోధులు లేదా చిహ్నాలలో నుండి ఎంచుకోండి!";
        setMessages((prev) => [...prev, { role: 'mitra', text: language === 'te' ? avatarMsgTe : avatarMsgEn }]);
        setIsTyping(false);
        setPhase('avatar');
        setTimeout(() => speakMitra(avatarMsgEn, avatarMsgTe), 200);
      }, 800);
    }
  };

  const handleAvatarConfirm = async () => {
    if (!selectedAvatar) return;
    setPhase('saving');
    stopSpeaking();

    await updateProfile({
      game_style: extractedData.gameStyle || 'casual',
      interests: extractedData.interests || [],
      preferred_topics: extractedData.topics || [],
      reading_age: extractedData.readingAge || readingAge,
      avatar_id: selectedAvatar,
      language,
      onboarding_complete: true,
    });

    const finalMsgEn = "Your profile is ready! I've crafted your personalized game track. Head to the Games page to begin your adventure. I'll be here whenever you want to update your preferences!";
    const finalMsgTe = "మీ ప్రొఫైల్ సిద్ధం! నేను మీ వ్యక్తిగత ఆట మార్గాన్ని సిద్ధం చేశాను. ఆటల పేజీకి వెళ్లి మీ సాహసాన్ని ప్రారంభించండి!";
    setMessages((prev) => [...prev, { role: 'mitra', text: language === 'te' ? finalMsgTe : finalMsgEn }]);
    speakMitra(finalMsgEn, finalMsgTe);

    setTimeout(() => onComplete(), 3000);
  };

  const toggleSpeech = () => {
    if (speechEnabled) {
      stopSpeaking();
      setSpeechEnabled(false);
    } else {
      setSpeechEnabled(true);
    }
  };

  const filteredAvatars = avatars.filter((a) => a.category === avatarCategory);

  // Language selection phase
  if (phase === 'language') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="surface p-8 max-w-md w-full ornament-border animate-scale-in text-center">
          {/* Mitra floating orb */}
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{ background: 'radial-gradient(circle, var(--color-primary-glow), transparent 70%)' }} />
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center animate-float"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                boxShadow: '0 0 30px var(--color-primary-glow)',
              }}>
              <Bot size={40} style={{ color: 'var(--color-bg)' }} />
            </div>
          </div>

          <h1 className="text-2xl font-bold glow-text-gold mb-2" style={{ color: 'var(--color-primary)' }}>
            Mitra AI
          </h1>
          <p className="text-sm text-muted mb-6">
            {language === 'te' ? 'దయచేసి మీ భాషను ఎంచుకోండి' : 'Please select your language'}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => handleLanguageSelect('en')}
              className="w-full surface-alt p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-[1.02] neon-border-gold"
            >
              <Globe size={24} style={{ color: 'var(--color-primary)' }} />
              <div className="text-left">
                <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>English</p>
                <p className="text-xs text-muted">Continue in English</p>
              </div>
            </button>
            <button
              onClick={() => handleLanguageSelect('te')}
              className="w-full surface-alt p-4 rounded-xl flex items-center gap-3 transition-all hover:scale-[1.02] neon-border-indigo"
            >
              <Globe size={24} style={{ color: 'var(--color-accent)' }} />
              <div className="text-left">
                <p className="text-base font-bold" style={{ color: 'var(--color-text)' }}>తెలుగు</p>
                <p className="text-xs text-muted">తెలుగులో కొనసాగండి</p>
              </div>
            </button>
          </div>

          {speechSupported && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
              <Volume2 size={14} style={{ color: 'var(--color-success)' }} />
              <span>{language === 'te' ? 'మిత్ర మీతో మాట్లాడుతుంది' : 'Mitra will speak to you'}</span>
            </div>
          )}

          <button onClick={onSkip} className="mt-4 text-xs text-muted hover:underline">
            {language === 'te' ? 'ఇప్పుడే దాటవేయి' : 'Skip for now'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col max-w-2xl mx-auto p-4 pb-24 md:pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 animate-fade-in">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
          style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)' }}>
          <Bot size={24} style={{ color: 'var(--color-primary)' }} />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
            style={{ background: 'var(--color-success)', border: '2px solid var(--color-surface)' }} />
        </div>
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>Mitra</h2>
          <p className="text-xs text-muted">
            {language === 'te' ? 'మీ ఏఐ గైడ్ — ఆన్‌లైన్' : 'Your AI Guide — Online'}
          </p>
        </div>

        {/* Speech toggle + Language toggle */}
        <div className="ml-auto flex items-center gap-2">
          {speechSupported && (
            <button onClick={toggleSpeech} className="btn-ghost p-2" title="Toggle speech">
              {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          )}
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'var(--color-surface-alt)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          >
            <Globe size={12} />
            {language === 'en' ? 'EN' : 'తె'}
          </button>
          <button onClick={onSkip} className="text-xs text-muted hover:underline">
            {language === 'te' ? 'దాటవేయి' : 'Skip'}
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: msg.role === 'mitra' ? 'var(--color-surface-alt)' : 'var(--color-primary)',
              }}
            >
              {msg.role === 'mitra' ? (
                <Bot size={16} style={{ color: 'var(--color-primary)' }} />
              ) : (
                <User size={16} style={{ color: 'var(--color-bg)' }} />
              )}
            </div>
            <div
              className="max-w-[80%] px-4 py-3 rounded-2xl"
              style={{
                background: msg.role === 'mitra' ? 'var(--color-surface)' : 'var(--color-primary)',
                color: msg.role === 'mitra' ? 'var(--color-text)' : 'var(--color-bg)',
                borderRadius: msg.role === 'mitra' ? '0 1rem 1rem 1rem' : '1rem 0 1rem 1rem',
              }}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--color-surface-alt)' }}>
              <Bot size={16} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div className="px-4 py-3 rounded-2xl flex gap-1" style={{ background: 'var(--color-surface)' }}>
              <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-primary)', animationDelay: '0s' }} />
              <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-primary)', animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--color-primary)', animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Avatar selection phase */}
      {phase === 'avatar' && !isTyping && (
        <div className="animate-fade-in-up">
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

          <div className="grid grid-cols-4 gap-2 mb-4">
            {filteredAvatars.map((av) => (
              <button
                key={av.id}
                onClick={() => setSelectedAvatar(av.id)}
                className="relative aspect-square rounded-xl flex flex-col items-center justify-center transition-all"
                style={{
                  background: selectedAvatar === av.id ? av.gradient : 'var(--color-surface)',
                  border: selectedAvatar === av.id
                    ? '2px solid var(--color-primary)'
                    : '1px solid var(--color-border)',
                  transform: selectedAvatar === av.id ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <span className="text-2xl mb-0.5">{av.emoji}</span>
                <span
                  className="text-[10px] font-medium px-1 text-center leading-tight"
                  style={{ color: selectedAvatar === av.id ? 'var(--color-bg)' : 'var(--color-text-muted)' }}
                >
                  {av.label}
                </span>
                {selectedAvatar === av.id && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--color-primary)' }}>
                    <Check size={10} style={{ color: 'var(--color-bg)' }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleAvatarConfirm}
            disabled={!selectedAvatar}
            className="btn-primary w-full justify-center"
          >
            <Sparkles size={18} />
            {language === 'te' ? 'నా అవతార్ నిర్ధారించండి' : 'Confirm My Avatar'}
          </button>
        </div>
      )}

      {/* Chat options */}
      {phase === 'chat' && !isTyping && step >= 0 && step < conversationSteps.length && (
        <div className="space-y-2 animate-fade-in">
          {conversationSteps[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(opt)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:scale-[1.01] animate-fade-in-up"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {language === 'te' ? opt.labelTe : opt.labelEn}
            </button>
          ))}
        </div>
      )}

      {/* Saving indicator */}
      {phase === 'saving' && (
        <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted animate-fade-in">
          <Sparkles size={16} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
          {language === 'te' ? 'మిత్ర మీ ఆట మార్గాన్ని సిద్ధం చేస్తోంది...' : 'Mitra is crafting your personalized game track...'}
        </div>
      )}
    </div>
  );
}
