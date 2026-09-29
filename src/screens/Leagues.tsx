import { useState, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getAvatar } from '@/lib/avatars';
import type { Page } from '@/App';
import { ArrowLeft, Crown, Trophy, Medal, ChevronDown, Flame, Star, Sparkles, Shield, Award } from 'lucide-react';

interface LeaguesProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

type TopicKey = 'bhagavadGita' | 'mahabharatEpics' | 'bibleHistory' | 'quranNarratives';
type TierId = 'bronze' | 'silver' | 'gold';

interface MockPlayer {
  name: string;
  nameTe: string;
  avatarId: string;
  icon: string;
  level: number;
  xp: number;
}

const topicPlayers: Record<TopicKey, MockPlayer[]> = {
  bhagavadGita: [
    { name: 'ArjunaDev', nameTe: 'అర్జునదేవ్', avatarId: 'lotus', icon: '🏹', level: 11, xp: 9800 },
    { name: 'KrishnaDas', nameTe: 'కృష్ణదాస్', avatarId: 'conch', icon: '🪈', level: 10, xp: 8650 },
    { name: 'DharmPal', nameTe: 'ధర్మపాల్', avatarId: 'mace', icon: '⚔️', level: 9, xp: 7200 },
    { name: 'ViduraJn', nameTe: 'విదురజ్ఞ్', avatarId: 'lotus', icon: '📜', level: 8, xp: 6100 },
    { name: 'GitaRatna', nameTe: 'గీతరత్న', avatarId: 'conch', icon: '🕉️', level: 8, xp: 5500 },
    { name: 'BhishmaGr', nameTe: 'భీష్మగ్ర్', avatarId: 'mace', icon: '🛡️', level: 7, xp: 4800 },
    { name: 'YudhiRaj', nameTe: 'యుధిరాజ్', avatarId: 'lotus', icon: '👑', level: 6, xp: 3900 },
    { name: 'KarnaSen', nameTe: 'కర్ణసేన్', avatarId: 'conch', icon: '🎯', level: 5, xp: 3100 },
    { name: 'SanjayV', nameTe: 'సంజయ్‌వి', avatarId: 'mace', icon: '📖', level: 4, xp: 2200 },
    { name: 'DronaAch', nameTe: 'ద్రోణాచ్', avatarId: 'lotus', icon: '🏹', level: 3, xp: 1500 },
  ],
  mahabharatEpics: [
    { name: 'BhimaKusti', nameTe: 'భీమకుస్తీ', avatarId: 'mace', icon: '🤼', level: 11, xp: 9200 },
    { name: 'DuryoRaj', nameTe: 'దుర్యోరాజ్', avatarId: 'conch', icon: '⚔️', level: 10, xp: 8100 },
    { name: 'NakulaSen', nameTe: 'నకులసేన్', avatarId: 'lotus', icon: '🗡️', level: 9, xp: 7300 },
    { name: 'SahadevJ', nameTe: 'సహదేవ్‌జె', avatarId: 'conch', icon: '🔮', level: 8, xp: 6400 },
    { name: 'ShakuniV', nameTe: 'శకునివి', avatarId: 'mace', icon: '🎲', level: 7, xp: 5200 },
    { name: 'Abhimanyu', nameTe: 'అభిమన్యు', avatarId: 'lotus', icon: '🛡️', level: 6, xp: 4100 },
    { name: 'Ghatotkach', nameTe: 'ఘటోత్కచ్', avatarId: 'conch', icon: '👹', level: 5, xp: 3300 },
    { name: 'DrishtaD', nameTe: 'దృష్టద్', avatarId: 'mace', icon: '🏹', level: 4, xp: 2400 },
    { name: 'Yuyutsu', nameTe: 'యుయుత్సు', avatarId: 'lotus', icon: '📜', level: 3, xp: 1600 },
    { name: 'UttaraP', nameTe: 'ఉత్తరప్', avatarId: 'conch', icon: '⚔️', level: 2, xp: 900 },
  ],
  bibleHistory: [
    { name: 'SamuelW', nameTe: 'సాముయెల్‌డబ్', avatarId: 'lotus', icon: '✝️', level: 11, xp: 9500 },
    { name: 'DavidPs', nameTe: 'డేవిడ్‌పిఎస్', avatarId: 'conch', icon: '📜', level: 10, xp: 8400 },
    { name: 'MaryGd', nameTe: 'మేరీగ్డ్', avatarId: 'mace', icon: '🙏', level: 9, xp: 7500 },
    { name: 'PeterRk', nameTe: 'పీటర్‌ఆర్‌కె', avatarId: 'lotus', icon: '🔑', level: 8, xp: 6200 },
    { name: 'PaulJn', nameTe: 'పాల్‌జెన్', avatarId: 'conch', icon: '📖', level: 7, xp: 5300 },
    { name: 'RuthFth', nameTe: 'రుత్‌ఫై', avatarId: 'mace', icon: '🌾', level: 6, xp: 4200 },
    { name: 'EstherQn', nameTe: 'ఎస్తేర్‌క్యూ', avatarId: 'lotus', icon: '👑', level: 5, xp: 3400 },
    { name: 'JobStead', nameTe: 'జాబ్‌స్టీడ్', avatarId: 'conch', icon: '🛡️', level: 4, xp: 2500 },
    { name: 'NoahArk', nameTe: 'నోవాఆర్క్', avatarId: 'mace', icon: '🚢', level: 3, xp: 1700 },
    { name: 'MosesLdr', nameTe: 'మోసెస్‌ఎల్', avatarId: 'lotus', icon: '📜', level: 2, xp: 1000 },
  ],
  quranNarratives: [
    { name: 'YusufSabr', nameTe: 'యూసుఫ్‌సబ్ర్', avatarId: 'lotus', icon: '🌙', level: 11, xp: 9700 },
    { name: 'IbrahimK', nameTe: 'ఇబ్రాహింకె', avatarId: 'conch', icon: '☪️', level: 10, xp: 8600 },
    { name: 'MusaImam', nameTe: 'మూసాఇమామ్', avatarId: 'mace', icon: '📖', level: 9, xp: 7400 },
    { name: 'NuhNab', nameTe: 'నూహ్‌నబ్', avatarId: 'lotus', icon: '🚢', level: 8, xp: 6300 },
    { name: 'IsaRuh', nameTe: 'ఈసారుహ్', avatarId: 'conch', icon: '🕊️', level: 7, xp: 5200 },
    { name: 'DawudZab', nameTe: 'దావూద్‌జాబ్', avatarId: 'mace', icon: '📜', level: 6, xp: 4100 },
    { name: 'SulaimW', nameTe: 'సులైమ్‌డబ్', avatarId: 'lotus', icon: '👑', level: 5, xp: 3300 },
    { name: 'YunusW', nameTe: 'యూనుస్‌డబ్', avatarId: 'conch', icon: '🐋', level: 4, xp: 2400 },
    { name: 'Zakariya', nameTe: 'జకారియా', avatarId: 'mace', icon: '🕌', level: 3, xp: 1600 },
    { name: 'HudRasul', nameTe: 'హుద్‌రసుల్', avatarId: 'lotus', icon: '🌙', level: 2, xp: 900 },
  ],
};

const tiers: { id: TierId; nameKey: 'bronzeLeague' | 'silverLeague' | 'dharmicGoldLeague'; descKey: 'bronzeLeagueDesc' | 'silverLeagueDesc' | 'dharmicGoldLeagueDesc'; gradient: string; icon: typeof Medal; glow: string; minXP: number; maxXP: number }[] = [
  { id: 'bronze', nameKey: 'bronzeLeague', descKey: 'bronzeLeagueDesc', gradient: 'linear-gradient(135deg, #cd7f32, #8a4f1a)', icon: Medal, glow: 'rgba(205,127,50,0.3)', minXP: 0, maxXP: 3000 },
  { id: 'silver', nameKey: 'silverLeague', descKey: 'silverLeagueDesc', gradient: 'linear-gradient(135deg, #c0c0c0, #8a8a8a)', icon: Shield, glow: 'rgba(192,192,192,0.3)', minXP: 3000, maxXP: 7000 },
  { id: 'gold', nameKey: 'dharmicGoldLeague', descKey: 'dharmicGoldLeagueDesc', gradient: 'linear-gradient(135deg, #ffd700, #c4a000)', icon: Crown, glow: 'rgba(255,215,0,0.4)', minXP: 7000, maxXP: 100000 },
];

const topics: { key: TopicKey; icon: string }[] = [
  { key: 'bhagavadGita', icon: '🕉️' },
  { key: 'mahabharatEpics', icon: '⚔️' },
  { key: 'bibleHistory', icon: '✝️' },
  { key: 'quranNarratives', icon: '☪️' },
];

export default function Leagues({ onBack, onNavigate }: LeaguesProps) {
  const { profile } = useAuth();
  const { language, t } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<TopicKey>('bhagavadGita');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<TierId>('bronze');

  const userXP = profile?.total_score || 0;
  const userLevel = profile?.player_level || 1;

  const userTier: TierId = useMemo(() => {
    if (userXP >= 7000) return 'gold';
    if (userXP >= 3000) return 'silver';
    return 'bronze';
  }, [userXP]);

  const leaderboard = useMemo(() => {
    const basePlayers = topicPlayers[selectedTopic];
    const userName = profile?.display_name || 'You';

    const userEntry: MockPlayer = {
      name: userName,
      nameTe: userName,
      avatarId: profile?.avatar_id || 'lotus',
      icon: getAvatar(profile?.avatar_id || 'lotus').emoji,
      level: userLevel,
      xp: userXP > 0 ? userXP : 1200,
    };

    const allPlayers = [...basePlayers, userEntry];
    allPlayers.sort((a, b) => b.xp - a.xp);
    return allPlayers.slice(0, 10);
  }, [selectedTopic, profile, userXP, userLevel]);

  const tierData = tiers.find((t2) => t2.id === selectedTier) || tiers[0];
  const TierIcon = tierData.icon;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown size={18} style={{ color: '#ffd700' }} />;
    if (rank === 2) return <Medal size={18} style={{ color: '#c0c0c0' }} />;
    if (rank === 3) return <Award size={18} style={{ color: '#cd7f32' }} />;
    return <span className="text-sm font-bold text-muted">{rank}</span>;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-4xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="btn-ghost p-2">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Trophy size={24} style={{ color: 'var(--color-primary)' }} />
          <h1 className="text-xl font-bold glow-text-gold" style={{ color: 'var(--color-primary)' }}>
            {t('globalLeagues')}
          </h1>
        </div>
      </div>

      {/* Tier hierarchy */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {tiers.map((tier, i) => {
          const TierI = tier.icon;
          const isActive = selectedTier === tier.id;
          const isUserTier = userTier === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className="relative surface-alt p-4 rounded-2xl transition-all hover:scale-[1.03] animate-fade-in-up text-center"
              style={{
                background: isActive ? tier.gradient : undefined,
                border: isActive ? '2px solid var(--color-accent)' : isUserTier ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                boxShadow: isUserTier ? `0 0 16px ${tier.glow}` : undefined,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {isUserTier && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}>
                  {language === 'te' ? 'మీ విభాగం' : 'Yours'}
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--color-surface)' }}>
                <TierI size={24} style={{ color: isActive ? 'white' : 'var(--color-text)' }} />
              </div>
              <h3 className="text-xs font-bold mb-0.5" style={{ color: isActive ? 'white' : 'var(--color-text)' }}>
                {t(tier.nameKey)}
              </h3>
              <p className="text-[10px] leading-tight" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)' }}>
                {tier.minXP}–{tier.maxXP >= 100000 ? '∞' : tier.maxXP} XP
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected tier banner */}
      <div className="surface p-5 mb-6 ornament-border animate-fade-in-up"
        style={{ background: `linear-gradient(135deg, ${tierData.glow}, transparent)` }}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: tierData.gradient }}>
            <TierIcon size={28} style={{ color: 'white' }} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              {t(tierData.nameKey)}
            </h2>
            <p className="text-xs text-muted">
              {t(tierData.descKey)}
            </p>
          </div>
        </div>
      </div>

      {/* Topic dropdown */}
      <div className="relative mb-6">
        <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-2 block">
          {t('topic')}
        </label>
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="surface-alt w-full p-4 rounded-xl flex items-center justify-between transition-all"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{topics.find((tp) => tp.key === selectedTopic)?.icon}</span>
            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
              {t(selectedTopic)}
            </span>
          </div>
          <ChevronDown size={20} style={{ color: 'var(--color-text-muted)' }} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 left-0 right-0 mt-1 surface rounded-xl overflow-hidden animate-fade-in"
            style={{ border: '1px solid var(--color-border)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
            {topics.map((tp) => (
              <button
                key={tp.key}
                onClick={() => { setSelectedTopic(tp.key); setDropdownOpen(false); }}
                className="w-full p-3 flex items-center gap-3 transition-all text-left"
                style={{
                  background: tp.key === selectedTopic ? 'var(--color-surface-alt)' : 'transparent',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                <span className="text-xl">{tp.icon}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {t(tp.key)}
                </span>
                {tp.key === selectedTopic && <Sparkles size={14} style={{ color: 'var(--color-primary)' }} className="ml-auto" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Top 10 Leaderboard */}
      <div className="surface p-5 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-4">
          <Flame size={18} style={{ color: 'var(--color-primary)' }} />
          <h2 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
            {t('top10Players')}
          </h2>
          <span className="ml-auto text-[10px] text-muted">
            {language === 'te' ? 'ఖరారు' : 'Live'}
          </span>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-success)' }} />
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[2rem_1fr_3rem_3.5rem] gap-2 px-2 mb-2 pb-2 border-b" style={{ borderColor: 'var(--color-border)' }}>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted text-center">{t('rank')}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">{t('player')}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted text-center">Lvl</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted text-right">XP</span>
        </div>

        {/* Scrollable player list */}
        <div className="space-y-1.5 max-h-[420px] overflow-y-auto no-scrollbar">
          {leaderboard.map((player, idx) => {
            const rank = idx + 1;
            const isMe = player.name === (profile?.display_name || 'You');
            const avatar = getAvatar(player.avatarId);

            return (
              <div
                key={idx}
                className="grid grid-cols-[2rem_1fr_3rem_3.5rem] gap-2 items-center px-2 py-2.5 rounded-xl transition-all"
                style={{
                  background: isMe ? 'rgba(255,215,0,0.08)' : idx % 2 === 0 ? 'var(--color-surface-alt)' : 'transparent',
                  border: isMe ? '2px solid #ffd700' : '1px solid transparent',
                  boxShadow: isMe ? '0 0 12px rgba(255,215,0,0.25)' : undefined,
                }}
              >
                {/* Rank */}
                <div className="flex items-center justify-center">
                  {getRankIcon(rank)}
                </div>

                {/* Player info */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: avatar.gradient }}>
                    {avatar.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                      {language === 'te' ? player.nameTe : player.name}
                      {isMe && (
                        <span className="ml-1.5 text-[10px] font-bold" style={{ color: '#ffd700' }}>
                          ({t('you')})
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs">{player.icon}</span>
                      <span className="text-[10px] text-muted">{t('activeLevel')}: {player.level}</span>
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div className="text-center">
                  <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{player.level}</span>
                </div>

                {/* XP */}
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ color: isMe ? '#ffd700' : 'var(--color-text)' }}>
                    {player.xp.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User's league progress */}
      <div className="surface p-5 mt-6 animate-fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} style={{ color: 'var(--color-primary)' }} />
          <h3 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            {t('leagueProgress')}
          </h3>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted">{t('yourDivision')}</span>
          <span className="text-xs font-bold" style={{ color: 'var(--color-primary)' }}>
            {userTier === 'bronze' ? t('bronzeLeague') : userTier === 'silver' ? t('silverLeague') : t('dharmicGoldLeague')}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-3 rounded-full overflow-hidden mb-2" style={{ background: 'var(--color-surface-alt)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min((userXP / (userTier === 'gold' ? 10000 : userTier === 'silver' ? 7000 : 3000)) * 100, 100)}%`,
              background: userTier === 'gold' ? 'linear-gradient(90deg, #ffd700, #c4a000)' : userTier === 'silver' ? 'linear-gradient(90deg, #c0c0c0, #8a8a8a)' : 'linear-gradient(90deg, #cd7f32, #8a4f1a)',
            }} />
        </div>
        <p className="text-[10px] text-muted text-center">
          {userXP.toLocaleString()} XP {userTier !== 'gold' ? `→ ${userTier === 'bronze' ? '3,000' : '7,000'} XP ${t('climbToNext')}` : '🏆 Max Division'}
        </p>
      </div>

      {/* CTA */}
      <button onClick={() => onNavigate('games')} className="btn-primary w-full justify-center mt-6">
        <Sparkles size={16} />
        {language === 'te' ? 'ఆటలతో XP సంపాదించండి' : 'Play Games to Earn XP'}
      </button>
    </div>
  );
}
