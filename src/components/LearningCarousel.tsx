import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { speak } from '@/lib/speech';
import { BookOpen, Sparkles, Play, Pause, ChevronLeft, ChevronRight, Clock, Film, Volume2, ScrollText, Star, Heart, Shield } from 'lucide-react';

interface StoryVideo {
  id: number;
  titleEn: string;
  titleTe: string;
  duration: number;
  gradient: string;
  scene: 'krishna-arjuna' | 'quran-ethics' | 'bible-ethics';
  summaryEn: string;
  summaryTe: string;
  fullStoryEn: string;
  fullStoryTe: string;
  moralEn: string;
  moralTe: string;
  moralIcon: typeof Star;
  storyChapters: { time: string; textEn: string; textTe: string; emoji: string }[];
}

const storyVideos: StoryVideo[] = [
  {
    id: 1,
    titleEn: 'Krishna Counsels Arjuna — The Bhagavad Gita',
    titleTe: 'కృష్ణుడు అర్జునునికి బోధన — భగవద్గీత',
    duration: 60,
    gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)',
    scene: 'krishna-arjuna',
    summaryEn: 'On the battlefield of Kurukshetra, Lord Krishna counsels a hesitant Arjuna about his duty — dharma.',
    summaryTe: 'కురుక్షేత్ర యుద్ధభూమిలో, కృష్ణుడు సందేహంలో ఉన్న అర్జునునికి ధర్మాన్ని బోధిస్తాడు.',
    fullStoryEn: 'The great war of Kurukshetra was about to begin. Arjuna, the greatest warrior, stood in his chariot driven by Lord Krishna himself. But seeing his own teachers, cousins, and friends on the opposing side, Arjuna was overcome with grief and set down his bow. "I will not fight," he declared. Krishna then spoke the immortal words of the Bhagavad Gita: "The soul is neither born nor does it die. It is eternal. As a person sheds worn-out garments and takes on new ones, so the soul casts off worn-out bodies and enters new ones." Krishna taught Arjuna about Nishkama Karma — performing one\'s duty without attachment to the results. "You have the right to perform your duty, but not to the fruits of your action. Do not let the fruits of action be your motive, nor let your attachment be to inaction." Arising from his doubt, Arjuna picked up his bow, ready to fulfill his dharma.',
    fullStoryTe: 'కురుక్షేత్ర మహాయుద్ధం ప్రారంభం కాబోతోంది. గొప్ప యోధుడైన అర్జునుడు తన రథంలో నిలబడ్డాడు — దానిని కృష్ణుడే నడుపుతున్నాడు. ఎదురుగా తన గురువులు, బంధువులు, స్నేహితులను చూసి అర్జునుడు దుఃఖంతో విల్లు వదిలాడు. "నేను యుద్ధం చేయను" అన్నాడు. అప్పుడు కృష్ణుడు భగవద్గీత బోధించాడు: "ఆత్మ పుట్టదు, చచ్చిపోదు. అది శాశ్వతం. పాత వస్త్రాలు విడిచి కొత్తవి ధరించినట్లు ఆత్మ పాత శరీరం విడిచి కొత్తదానిలో ప్రవేశిస్తుంది." కృష్ణుడు నిష్కామ కర్మ బోధించాడు — ఫలితం పట్ల ఆసక్తి లేకుండా ధర్మాన్ని నిర్వర్తించు. "నీకు కర్మ చేయే హక్కు ఉంది, కానీ ఫలితం పట్ల హక్కు లేదు." సందేహం విడిచి అర్జునుడు విల్లు తీసుకున్నాడు.',
    moralEn: 'Perform your duty selflessly, without attachment to results — this is the path of dharma.',
    moralTe: 'ఫలితం పట్ల ఆసక్తి లేకుండా నీ ధర్మాన్ని నిర్వర్తించు — ఇదే ధర్మ మార్గం.',
    moralIcon: Shield,
    storyChapters: [
      { time: '0:00', textEn: 'Arjuna stands in his chariot, driven by Krishna, facing the Kaurava army.', textTe: 'అర్జునుడు తన రథంలో నిలబడ్డాడు — కృష్ణుడు నడుపుతున్నాడు.', emoji: '🏹' },
      { time: '0:15', textEn: 'Seeing his own family on the opposing side, Arjuna collapses in grief.', textTe: 'ఎదురుగా తన కుటుంబాన్ని చూసి అర్జునుడు దుఃఖంతో కూలబడ్డాడు.', emoji: '😔' },
      { time: '0:30', textEn: 'Krishna reveals the eternal nature of the soul — it is never born, never dies.', textTe: 'కృష్ణుడు ఆత్మ శాశ్వతత్వం బోధించాడు — పుట్టదు, చచ్చిపోదు.', emoji: '🕉️' },
      { time: '0:45', textEn: 'Krishna teaches Nishkama Karma — act without attachment to fruits.', textTe: 'కృష్ణుడు నిష్కామ కర్మ బోధించాడు — ఫలితం పట్ల ఆసక్తి లేకుండా చేయి.', emoji: '🪈' },
      { time: '1:00', textEn: 'Arjuna rises, takes up his bow, ready to fulfill his dharma.', textTe: 'అర్జునుడు లేచి విల్లు తీసుకున్నాడు — ధర్మం నెరవేర్చడానికి.', emoji: '⚔️' },
    ],
  },
  {
    id: 2,
    titleEn: 'Prophet Yusuf — Patience Through Trials (Quran)',
    titleTe: 'ప్రవక్త యూసుఫ్ — కష్టాలలో ఓర్పు (ఖురాన్)',
    duration: 75,
    gradient: 'linear-gradient(135deg, #4dbf8a, #2a8a5a)',
    scene: 'quran-ethics',
    summaryEn: 'Prophet Yusuf was thrown into a well, sold into slavery, and falsely imprisoned — yet never lost faith in Allah.',
    summaryTe: 'ప్రవక్త యూసుఫ్ గొయ్యిలో వేయబడి, బానిసగా అమ్మబడి, జైలులో పడ్డాడు — కానీ అల్లాపై విశ్వాసం కోల్పోలేదు.',
    fullStoryEn: 'Prophet Yusuf (Joseph) was the beloved son of Prophet Yaqub. His brothers, consumed by jealousy, plotted against him. They threw him into a deep well and told their father that a wolf had devoured him. But Allah\'s plan was greater. A caravan found Yusuf and sold him into slavery in Egypt. There, he was purchased by the Aziz\'s wife, Zulaikha. Though falsely accused and imprisoned for years, Yusuf remained steadfast in his faith and purity. In prison, he interpreted the dreams of fellow prisoners, which eventually reached the King of Egypt. The King saw seven fat cows consumed by seven lean ones, and Yusuf interpreted this as seven years of plenty followed by seven years of famine. Impressed by his wisdom, the King appointed Yusuf as Egypt\'s minister of finance. During the famine, his brothers came seeking grain — not recognizing him. Yusuf revealed his identity and forgave them all, saying: "No blame will there be upon you today. Allah will forgive you, and He is the most merciful of the merciful."',
    fullStoryTe: 'ప్రవక్త యూసుఫ్ (జోసెఫ్) ప్రవక్త యాకూబుకు ప్రియమైన కుమారుడు. అతని సోదరులు అసూయతో అతనికి వ్యతిరేకించారు. అతన్ని లోతైన గొయ్యిలో వేసి, తండ్రికి నుక్క తిన్నదని చెప్పారు. కానీ అల్లా ప్రణాళిక గొప్పది. ఒక కాఫిలా యూసుఫ్ కనుగొని ఈజిప్టులో బానిసగా అమ్మివేసింది. అజీజ్ భార్య జులైఖా అతన్ని కొన్నది. అన్యాయంగా నిందించి సంవత్సరాలు జైలులో పడ్డాడు, కానీ యూసుఫ్ విశ్వాసంలో నిలిచాడు. జైలులో సహవాసుల కలలు వివరించాడు — ఈజిప్టు రాజు వరకు చేరింది. రాజు కల చెప్పగా, ఏడు సంవత్సరాల సంతృప్తి, ఏడు కరువు సంవత్సరాలు అని వివరించాడు. రాజు అతన్ని ఈజిప్టు ఆర్థిక మంత్రిగా నియమించాడు. కరువులో సోదరులు ధాన్యం కోసం వచ్చారు — అతన్ని గుర్తించలేదు. యూసుఫ్ తన గుర్తింపు వెల్లడించి, వారందరినీ క్షమించాడు: "ఈ రోజు మీపై ఎలాంటి నింద లేదు. అల్లా మిమ్మల్ని క్షమిస్తాడు."',
    moralEn: 'Patience through trials (Sabr) is rewarded — never lose faith in Allah\'s plan.',
    moralTe: 'కష్టాలలో ఓర్పు (సబ్ర్) ఫలిస్తుంది — అల్లా ప్రణాళికపై విశ్వాసం కోల్పోవద్దు.',
    moralIcon: Heart,
    storyChapters: [
      { time: '0:00', textEn: 'Yusuf, beloved son of Yaqub, is envied by his brothers.', textTe: 'యూసుఫ్, యాకూబు ప్రియ కుమారుడు — సోదరుల అసూయ.', emoji: '🌙' },
      { time: '0:15', textEn: 'Brothers throw Yusuf into a well and tell their father a wolf ate him.', textTe: 'సోదరులు యూసుఫ్ గొయ్యిలో వేసి నుక్క తిన్నదని చెప్పారు.', emoji: '🕳️' },
      { time: '0:30', textEn: 'A caravan finds him and sells him into slavery in Egypt.', textTe: 'కాఫిలా కనుగొని ఈజిప్టులో బానిసగా అమ్మివేసింది.', emoji: '🐪' },
      { time: '0:45', textEn: 'Falsely accused, Yusuf is imprisoned for years — yet stays faithful.', textTe: 'అన్యాయంగా నిందించి జైలులో పడ్డాడు — కానీ విశ్వాసం నిలిపాడు.', emoji: '⛓️' },
      { time: '1:00', textEn: 'Yusuf interprets the King\'s dream and becomes Egypt\'s minister.', textTe: 'రాజు కల వివరించి ఈజిప్టు మంత్రి అయ్యాడు.', emoji: '🕌' },
      { time: '1:15', textEn: 'Yusuf forgives his brothers: "No blame upon you today. Allah is most merciful."', textTe: 'యూసుఫ్ సోదరులను క్షమించాడు: "ఈ రోజు నింద లేదు."', emoji: '🤲' },
    ],
  },
  {
    id: 3,
    titleEn: 'The Good Samaritan — Compassion for All (Bible)',
    titleTe: 'సమారిటన్ — అందరిపై కరుణ (బైబిల్)',
    duration: 50,
    gradient: 'linear-gradient(135deg, #d4d4e0, #8a8aa0)',
    scene: 'bible-ethics',
    summaryEn: 'Jesus told of a Samaritan who helped a wounded stranger when others walked past.',
    summaryTe: 'యేసు ఒక సమారిటన్ కథ చెప్పాడు — గాయపడినవాడికి సహాయం చేస్తాడు.',
    fullStoryEn: 'A teacher of the law asked Jesus, "Who is my neighbor?" Jesus answered with this parable: A man was traveling from Jerusalem to Jericho when robbers attacked him, stripped him of his clothes, beat him, and left him half-dead on the road. A priest happened to be going down the same road, but when he saw the man, he passed by on the other side. So too, a Levite came to the place, looked at him, and passed by on the other side. But a Samaritan, as he journeyed, came to where the man was. When he saw him, he was moved with compassion. He went to him, bandaged his wounds, pouring on oil and wine. Then he put the man on his own donkey, brought him to an inn, and took care of him. The next day, he took out two denarii and gave them to the innkeeper, saying, "Take care of him, and when I return, I will reimburse you for any extra expense." Jesus then asked, "Which of these three do you think was a neighbor to the man who fell into the hands of robbers?" The expert replied, "The one who had mercy on him." Jesus told him, "Go and do likewise."',
    fullStoryTe: 'ఒక ధర్మశాస్త్రి "నా పొరుగువాడు ఎవరు?" అని యేసును అడిగాడు. యేసు ఈ దృష్టాంతం చెప్పాడు: ఒక మనిషి జెరూసలేం నుండి జెరికోకు వెళుతుండగా దొంగలు అతన్ని దోచుకుని, కొట్టి, బట్టలు లాగి అర్ధమృత్యువుని చేసి వదిలేశారు. ఒక యాజకుడు ఆ మార్గంలో వెళుతున్నాడు — చూసి పక్కకు వెళ్లిపోయాడు. ఒక లేవీయుడు వచ్చాడు — చూసి పక్కకు వెళ్లిపోయాడు. కానీ ఒక సమారిటన్ వచ్చాడు. అతన్ని చూసి కరుణ పడ్డాడు. గాయాలకు నూనె, ద్రాక్షారసం పోసి కట్టాడు. తన గాడిదపై వేసి సత్రానికి తీసుకెళ్లాడు. మరుసటి రోజు ఇన్ కీపర్‌కు డెనారి నాణెం ఇచ్చి "అతన్ని చూసుకో" అన్నాడు. యేసు అడిగాడు: "ఈ ముగ్గురిలో పొరుగువాడు ఎవరు?" అతను "కరుణ చూపినవాడు" అన్నాడు. యేసు "నీవు కూడా అలా చేయి" అన్నాడు.',
    moralEn: 'Love your neighbor as yourself — compassion knows no boundaries of race or religion.',
    moralTe: 'నీ పొరుగువారిని నీ వలె ప్రేమించు — కరుణకు జాతి, మత సరిహద్దులు లేవు.',
    moralIcon: Heart,
    storyChapters: [
      { time: '0:00', textEn: 'A man is attacked by robbers on the road from Jerusalem to Jericho.', textTe: 'జెరూసలేం నుండి జెరికోకు దొంగలు ఒకడిని దోచుకున్నారు.', emoji: '🛤️' },
      { time: '0:10', textEn: 'A priest sees the wounded man — and walks past on the other side.', textTe: 'ఒక యాజకుడు గాయపడినవాడిని చూసి — పక్కకు వెళ్లిపోయాడు.', emoji: '🚶' },
      { time: '0:20', textEn: 'A Levite also passes by without helping.', textTe: 'ఒక లేవీయుడు కూడా సహాయం లేకుండా వెళ్లిపోయాడు.', emoji: '🚶' },
      { time: '0:30', textEn: 'A Samaritan stops, bandages his wounds with oil and wine.', textTe: 'ఒక సమారిటన్ ఆగి, నూనె, ద్రాక్షారసం పోసి కట్టాడు.', emoji: '🤝' },
      { time: '0:40', textEn: 'He puts the man on his donkey and cares for him at an inn.', textTe: 'గాడిదపై వేసి సత్రానికి తీసుకెళ్లాడు.', emoji: '🐴' },
      { time: '0:50', textEn: 'Jesus says: "Go and do likewise — love your neighbor."', textTe: 'యేసు: "నీవు కూడా అలా చేయి — పొరుగువారిని ప్రేమించు."', emoji: '✝️' },
    ],
  },
];

// Animated scene renderer for each story
function AnimatedScene({ scene, isPlaying, chapterIndex }: { scene: string; isPlaying: boolean; chapterIndex: number }) {
  if (scene === 'krishna-arjuna') {
    return (
      <div className="relative w-full h-full flex items-end justify-center pb-8">
        {/* Battlefield ground */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(120,80,40,0.5))' }} />
        {/* Sun/chariot glow */}
        <div className="absolute top-4 right-8 w-16 h-16 rounded-full opacity-60 animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, #ffd700, transparent 70%)' }} />
        {/* Krishna (right) */}
        <div className="flex flex-col items-center mr-8 z-10">
          <div className={`text-5xl ${isPlaying ? 'animate-float' : ''}`} style={{ filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' }}>
            🪈
          </div>
          <div className="text-2xl mt-1">🕉️</div>
          <span className="text-[10px] font-bold text-white mt-1">Krishna</span>
        </div>
        {/* Arjuna (left) with bow */}
        <div className="flex flex-col items-center ml-8 z-10">
          <div className={`text-5xl ${isPlaying ? 'animate-float' : ''}`} style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 8px rgba(255,100,100,0.4))' }}>
            🏹
          </div>
          <div className="text-2xl mt-1">😔</div>
          <span className="text-[10px] font-bold text-white mt-1">Arjuna</span>
        </div>
        {/* Dialogue bubble when playing */}
        {isPlaying && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl text-[10px] font-medium text-white animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            "Perform your duty without attachment"
          </div>
        )}
      </div>
    );
  }

  if (scene === 'quran-ethics') {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Islamic geometric pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.3) 0deg 15deg, transparent 15deg 30deg)',
            backgroundSize: '80px 80px',
          }} />
        {/* Well (left) */}
        <div className="flex flex-col items-center mr-6 z-10">
          <div className="text-4xl mb-1">🕳️</div>
          <span className="text-[10px] font-bold text-white">The Well</span>
        </div>
        {/* Yusuf walking (center) */}
        <div className="flex flex-col items-center z-10">
          <div className={`text-5xl ${isPlaying ? 'animate-float' : ''}`} style={{ filter: 'drop-shadow(0 0 8px rgba(77,191,138,0.5))' }}>
            🌙
          </div>
          <span className="text-[10px] font-bold text-white mt-1">Yusuf</span>
        </div>
        {/* Palace/Egypt (right) */}
        <div className="flex flex-col items-center ml-6 z-10">
          <div className="text-4xl mb-1">🕌</div>
          <span className="text-[10px] font-bold text-white">Egypt</span>
        </div>
        {/* Patience message when playing */}
        {isPlaying && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl text-[10px] font-medium text-white animate-fade-in"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
            "Patience through trials — Sabr"
          </div>
        )}
      </div>
    );
  }

  // bible-ethics
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Stone temple background */}
      <div className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.2) 30px, rgba(255,255,255,0.2) 34px)',
        }} />
      {/* Wounded traveler (left) */}
      <div className="flex flex-col items-center mr-6 z-10">
        <div className={`text-5xl ${isPlaying ? 'animate-float' : ''}`} style={{ filter: 'drop-shadow(0 0 8px rgba(200,200,220,0.4))' }}>
          🤕
        </div>
        <span className="text-[10px] font-bold text-white mt-1">Wounded</span>
      </div>
      {/* Samaritan helping (center) */}
      <div className="flex flex-col items-center z-10">
        <div className={`text-5xl ${isPlaying ? 'animate-float' : ''}`} style={{ animationDelay: '0.3s', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))' }}>
          🤝
        </div>
        <span className="text-[10px] font-bold text-white mt-1">Samaritan</span>
      </div>
      {/* Cross/temple (right) */}
      <div className="flex flex-col items-center ml-6 z-10">
        <div className="text-4xl mb-1">✝️</div>
        <span className="text-[10px] font-bold text-white">Teaching</span>
      </div>
      {/* Compassion message when playing */}
      {isPlaying && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl text-[10px] font-medium text-white animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          "Love your neighbor as yourself"
        </div>
      )}
    </div>
  );
}

export default function LearningCarousel() {
  const { profile, updateProfile } = useAuth();
  const { language, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const video = storyVideos[currentIndex];
  const learningPref = profile?.learning_preference || 'story-first';
  const MoralIcon = video.moralIcon;

  const handlePrefChange = async (pref: string) => {
    await updateProfile({ learning_preference: pref });
  };

  const goNext = () => {
    setIsPlaying(false);
    setProgress(0);
    setChapterIndex(0);
    setCurrentIndex((i) => (i + 1) % storyVideos.length);
  };

  const goPrev = () => {
    setIsPlaying(false);
    setProgress(0);
    setChapterIndex(0);
    setCurrentIndex((i) => (i - 1 + storyVideos.length) % storyVideos.length);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      speak(language === 'te' ? video.fullStoryTe : video.fullStoryEn, language);
    }
    setIsPlaying((p) => !p);
  };

  // Simulated playback progress + chapter tracking
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setProgress((p) => {
          const newP = p + (100 / (video.duration * 10));
          // Update chapter based on progress
          const elapsed = (newP / 100) * video.duration;
          const chIdx = video.storyChapters.findIndex((ch, i) => {
            const chTime = parseInt(ch.time.split(':')[0]) * 60 + parseInt(ch.time.split(':')[1]);
            const nextCh = video.storyChapters[i + 1];
            if (!nextCh) return true;
            const nextTime = parseInt(nextCh.time.split(':')[0]) * 60 + parseInt(nextCh.time.split(':')[1]);
            return elapsed >= chTime && elapsed < nextTime;
          });
          if (chIdx >= 0 && chIdx !== chapterIndex) setChapterIndex(chIdx);
          if (newP >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return newP;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, video.duration, video.storyChapters, chapterIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentChapter = video.storyChapters[chapterIndex] || video.storyChapters[0];

  return (
    <div className="surface p-6 mb-6 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-5">
        <Film size={18} style={{ color: 'var(--color-primary)' }} />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          {language === 'te' ? 'నేర్చుకోవడం — యానిమేటెడ్ కథలు' : 'Learning — Animated Stories'}
        </h2>
      </div>

      {/* Learning preference toggle */}
      <div className="mb-5">
        <p className="text-xs text-muted mb-2">{t('learningPreference')}</p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePrefChange('story-first')}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
            style={learningPref === 'story-first'
              ? { background: 'var(--color-accent)', color: 'var(--color-bg)' }
              : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            <BookOpen size={14} />
            {t('storyFirst')}
          </button>
          <button
            onClick={() => handlePrefChange('story-while-playing')}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
            style={learningPref === 'story-while-playing'
              ? { background: 'var(--color-accent)', color: 'var(--color-bg)' }
              : { background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
          >
            <Sparkles size={14} />
            {t('storyWhilePlaying')}
          </button>
        </div>
      </div>

      {/* Animated story video carousel */}
      <div className="relative rounded-2xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        {/* Video frame with animated scene */}
        <div className="relative aspect-video flex items-center justify-center overflow-hidden"
          style={{ background: video.gradient }}>
          {/* Animated scene */}
          <AnimatedScene scene={video.scene} isPlaying={isPlaying} chapterIndex={chapterIndex} />

          {/* Current chapter caption overlay */}
          {isPlaying && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 max-w-[80%] px-4 py-2 rounded-xl text-center animate-fade-in"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-lg">{currentChapter.emoji}</span>
                <span className="text-[10px] font-bold text-white opacity-60">{currentChapter.time}</span>
              </div>
              <p className="text-xs text-white leading-relaxed">
                {language === 'te' ? currentChapter.textTe : currentChapter.textEn}
              </p>
            </div>
          )}

          {/* Play/pause overlay */}
          <button onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center transition-opacity"
            style={{ opacity: isPlaying ? 0 : 1 }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
              {isPlaying ? <Pause size={28} style={{ color: 'white' }} /> : <Play size={28} style={{ color: 'white' }} />}
            </div>
          </button>

          {/* Duration badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
            <Clock size={12} />
            {formatTime(video.duration)}
          </div>

          {/* Volume/TTS indicator */}
          {isPlaying && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium animate-fade-in"
              style={{ background: 'rgba(0,0,0,0.6)', color: 'white' }}>
              <Volume2 size={12} className="animate-pulse" />
              {language === 'te' ? 'కథ చెబుతోంది' : 'Narrating'}
            </div>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="h-full transition-all duration-100"
              style={{ width: `${progress}%`, background: 'var(--color-primary)' }} />
          </div>
        </div>

        {/* Story info + full narration text */}
        <div className="p-4" style={{ background: 'var(--color-surface)' }}>
          <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            {language === 'te' ? video.titleTe : video.titleEn}
          </h3>
          <p className="text-xs text-muted leading-relaxed mb-3">
            {language === 'te' ? video.summaryTe : video.summaryEn}
          </p>

          {/* Full story narration text */}
          <div className="surface-alt p-3 rounded-xl mb-3 max-h-32 overflow-y-auto no-scrollbar">
            <div className="flex items-center gap-1.5 mb-2">
              <ScrollText size={12} style={{ color: 'var(--color-primary)' }} />
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
                {language === 'te' ? 'పూర్తి కథ' : 'Full Story'}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text)' }}>
              {language === 'te' ? video.fullStoryTe : video.fullStoryEn}
            </p>
          </div>

          {/* Moral of the story */}
          <div className="flex items-start gap-2 p-3 rounded-xl"
            style={{ background: 'var(--color-primary-glow, rgba(255,215,0,0.08))' }}>
            <MoralIcon size={16} style={{ color: 'var(--color-primary)' }} className="flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>
                {language === 'te' ? 'నీతి' : 'Moral'}
              </span>
              <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--color-text)' }}>
                {language === 'te' ? video.moralTe : video.moralEn}
              </p>
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
          <ChevronLeft size={18} />
        </button>
        <button onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Chapter timeline */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {video.storyChapters.map((ch, i) => (
            <button
              key={i}
              onClick={() => { setChapterIndex(i); }}
              className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all"
              style={{
                background: i === chapterIndex ? 'var(--color-primary)' : 'var(--color-surface-alt)',
                color: i === chapterIndex ? 'var(--color-bg)' : 'var(--color-text-muted)',
                border: i === chapterIndex ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
              }}
            >
              <span className="text-sm">{ch.emoji}</span>
              <span>{ch.time}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Frame dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {storyVideos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => { setCurrentIndex(i); setIsPlaying(false); setProgress(0); setChapterIndex(0); }}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === currentIndex ? '24px' : '8px',
              background: i === currentIndex ? 'var(--color-primary)' : 'var(--color-border)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
