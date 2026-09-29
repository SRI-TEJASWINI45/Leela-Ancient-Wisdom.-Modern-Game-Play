import type { Language } from '@/lib/i18n';

// ===== MAHABHARAT LORE DIALOGUES =====
export interface LoreDialogue {
  level: number;
  speakerEn: string;
  speakerTe: string;
  textEn: string;
  textTe: string;
  emoji: string;
}

export const mahabharatLore: LoreDialogue[] = [
  { level: 1, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Arjuna, behold the battlefield of Kurukshetra. Your enemies stand before you — but so does your duty.', textTe: 'అర్జునా, కురుక్షేత్ర యుద్ధభూమిని చూడు. నీ శత్రువులు నీ ముందు నిలిచారు — కానీ నీ ధర్మం కూడా.', emoji: '🏹' },
  { level: 2, speakerEn: 'Arjuna', speakerTe: 'అర్జునుడు', textEn: 'O Krishna, how can I fight my own kin? My bow slips from my hand.', textTe: 'ఓ కృష్ణా, నా బంధువులతో ఎలా పోరాడగలను? నా విల్లు చేతిలో జారిపోతోంది.', emoji: '😰' },
  { level: 3, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'The soul is neither born nor does it die. Do not grieve for what is eternal.', textTe: 'ఆత్మ పుట్టదు, చచ్చిపోదు. శాశ్వతమైన దానికి దుఃఖపడకు.', emoji: '✨' },
  { level: 4, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Perform your duty without attachment to results. This is the path of Karma Yoga.', textTe: 'ఫలితం పట్ల ఆసక్తి లేకుండా నీ ధర్మాన్ని నిర్వర్తించు. ఇదే కర్మ యోగ మార్గం.', emoji: '🛡️' },
  { level: 5, speakerEn: 'Arjuna', speakerTe: 'అర్జునుడు', textEn: 'My doubts are gone, Krishna. I shall fight for dharma!', textTe: 'నా సందేహాలు తీసివేయబడ్డాయి, కృష్ణా. ధర్మం కోసం పోరాడుతాను!', emoji: '⚔️' },
  { level: 6, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Remember — the wise see the same in all beings: a learned scholar, a cow, an elephant, a dog, and a dog-eater.', textTe: 'గుర్తించు — జ్ఞానులు అందరిలో ఒక్కటే చూస్తారు: పండితుడు, ఆవు, ఏనుగు, కుక్క.', emoji: '🌟' },
  { level: 7, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Whoever offers Me a leaf, a flower, a fruit, or water with devotion — I accept that loving offering.', textTe: 'ఎవరైతే భక్తితో నాకు ఆకు, పువ్వు, పండు, నీళ్లు అర్పిస్తారో — ఆ ప్రేమ అర్పణను నేను స్వీకరిస్తాను.', emoji: '🪷' },
  { level: 8, speakerEn: 'Arjuna', speakerTe: 'అర్జునుడు', textEn: 'The Bhagavad Gita has opened my eyes. I am ready for each battle ahead.', textTe: 'భగవద్గీత నా కళ్లు తెరిచింది. ముందు వచ్చే ప్రతి యుద్ధానికి సిద్ధంగా ఉన్నాను.', emoji: '👁️' },
  { level: 9, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Among warriors, I am Rama. Among rivers, I am the Ganga. Among mountains, I am Meru.', textTe: 'యోధులలో నేను రాముడను. నదులలో గంగను. పర్వతాలలో మేరువును.', emoji: '🏔️' },
  { level: 10, speakerEn: 'Krishna', speakerTe: 'కృష్ణుడు', textEn: 'Abandon all dharmas and surrender to Me alone. I shall liberate you from all sins. Do not fear.', textTe: 'అన్ని ధర్మాలను విడిచి నాకే శరణము చెందు. అన్ని పాపాల నుండి నిన్ను విముక్తి చేస్తాను. భయపడకు.', emoji: '🙏' },
  { level: 11, speakerEn: 'Arjuna', speakerTe: 'అర్జునుడు', textEn: 'I am now free from all illusion. My duty is clear. The war begins — and dharma shall prevail!', textTe: 'నేను ఇప్పుడు అన్ని భ్రమల నుండి విముక్తిని. నా ధర్మం స్పష్టం. యుద్ధం ప్రారంభం — ధర్మం విజయిస్తుంది!', emoji: '🏆' },
];

// ===== QURAN STORIES (11 levels) =====
export interface QuranStory {
  level: number;
  titleEn: string;
  titleTe: string;
  summaryEn: string;
  summaryTe: string;
  emoji: string;
  gradient: string;
  duration: number;
}

export const quranStories: QuranStory[] = [
  { level: 1, titleEn: 'Prophet Adam — The First Human', titleTe: 'ప్రవక్త ఆదం — మొదటి మనిషి', summaryEn: 'Allah created Adam from clay and breathed life into him. He was taught the names of all things, elevating him above the angels.', summaryTe: 'అల్లా మట్టితో ఆదంను సృష్టించి జీవం ఊదాడు. అతనికి అన్ని పేర్లు నేర్పాడు.', emoji: '🌍', gradient: 'linear-gradient(135deg, #4dbf8a, #2a8a5a)', duration: 45 },
  { level: 2, titleEn: 'Prophet Nuh — The Great Ark', titleTe: 'ప్రవక్త నూహ్ — గొప్ప ఓడ', summaryEn: 'Nuh built an ark by Allah\'s command, saving the believers and animals from the great flood that cleansed the earth.', summaryTe: 'నూహ్ అల్లా ఆజ్ఞతో ఓడ నిర్మించి, భక్తులను మరియు జంతువులను మహా ప్రవాహం నుండి రక్షించాడు.', emoji: '🚢', gradient: 'linear-gradient(135deg, #6d7dff, #3a3a8c)', duration: 60 },
  { level: 3, titleEn: 'Prophet Ibrahim — The Friend of Allah', titleTe: 'ప్రవక్త ఇబ్రాహీం — అల్లా స్నేహితుడు', summaryEn: 'Ibrahim destroyed the idols of his people and was thrown into fire, but Allah made the fire cool for him.', summaryTe: 'ఇబ్రాహీం తన జాతి విగ్రహాలను నాశనం చేశాడు. అగ్నిలో వేశారు, కానీ అల్లా అగ్నిని చల్లగా చేశాడు.', emoji: '🔥', gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)', duration: 55 },
  { level: 4, titleEn: 'Prophet Yusuf — The Beautiful Story', titleTe: 'ప్రవక్త యూసుఫ్ — అందమైన కథ', summaryEn: 'Yusuf was thrown into a well by his brothers, sold into slavery, and rose to become Egypt\'s minister through patience and divine wisdom.', summaryTe: 'యూసుఫ్ తమ్ముళ్లచే గొయ్యిలో వేయబడి, బానిసగా అమ్మబడి, ఓర్పుతో ఈజిప్టు మంత్రి అయ్యాడు.', emoji: '🌙', gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)', duration: 90 },
  { level: 5, titleEn: 'Prophet Musa — The Staff that Split the Sea', titleTe: 'ప్రవక్త మూసా — సముద్రం చీల్చిన కర్ర', summaryEn: 'Musa confronted Pharaoh with his staff, and Allah split the Red Sea to save the Children of Israel.', summaryTe: 'మూసా తన కర్రతో ఫరోను ఎదురించాడు. అల్లా ఎర్ల సముద్రాన్ని చీల్చి ఇశ్రాయేలీయులను రక్షించాడు.', emoji: '🌊', gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)', duration: 75 },
  { level: 6, titleEn: 'Prophet Dawud — The Psalms and the Iron', titleTe: 'ప్రవక్త దావూద్ — జబూర్ మరియు ఇనుము', summaryEn: 'Dawud was given the Psalms (Zabur) and the ability to mold iron like wax. He defeated Goliath with a single stone.', summaryTe: 'దావూద్ జబూర్ గ్రంథం పొందాడు. ఇనుమును మైనంలా మలచగలిగే శక్తి పొందాడు. గోలియాత్‌ను ఒక రాయితో ఓడించాడు.', emoji: '⚒️', gradient: 'linear-gradient(135deg, #d4d4e0, #8a8aa0)', duration: 50 },
  { level: 7, titleEn: 'Prophet Sulaiman — The Kingdom of Wind and Jinn', titleTe: 'ప్రవక్త సులైమాన్ — గాలి మరియు జిన్ రాజ్యం', summaryEn: 'Sulaiman controlled the wind and commanded armies of jinn. He understood the language of birds and ants.', summaryTe: 'సులైమాన్ గాలిని నియంత్రించాడు. జిన్ సైన్యాలకు ఆజ్ఞ ఇచ్చాడు. పక్షులు మరియు చీమల భాష అర్థం చేసుకున్నాడు.', emoji: '🦅', gradient: 'linear-gradient(135deg, #6d7dff, #4a4aa0)', duration: 65 },
  { level: 8, titleEn: 'Prophet Isa — The Miracles', titleTe: 'ప్రవక్త ఈసా — అద్భుతాలు', summaryEn: 'Isa was born of the virgin Maryam. He healed the sick, gave sight to the blind, and raised the dead by Allah\'s permission.', summaryTe: 'ఈసా కన్య మరియం గర్భం నుండి జన్మించాడు. అల్లా అనుమతితో రోగులను నయం చేశాడు, గ్రుడ్డివారికి చూపు ఇచ్చాడు.', emoji: '✨', gradient: 'linear-gradient(135deg, #e8b04d, #d4a030)', duration: 70 },
  { level: 9, titleEn: 'The Night Journey — Al-Isra wal-Miraj', titleTe: 'రాత్రి ప్రయాణం — అల్-ఇస్రా వల్-మిరాజ్', summaryEn: 'The Prophet traveled from Mecca to Jerusalem and ascended through the seven heavens, meeting earlier prophets.', summaryTe: 'ప్రవక్త మక్కా నుండి జెరూసలేంకు ప్రయాణించి, ఏడు స్వర్గాల గుండా ఎక్కాడు.', emoji: '🕌', gradient: 'linear-gradient(135deg, #4dbf8a, #2a8a5a)', duration: 80 },
  { level: 10, titleEn: 'The Battle of Badr — 313 Against 1000', titleTe: 'బద్ర్ యుద్ధం — 313 vs 1000', summaryEn: '313 Muslims faced 1000 well-armed Meccans. With faith and divine help, they achieved a miraculous victory.', summaryTe: '313 ముస్లింలు 1000 మంది సుసంపన్న మక్కావాసులను ఎదురించారు. విశ్వాసం మరియు దైవిక సాయంతో అద్భుత విజయం సాధించారు.', emoji: '⚔️', gradient: 'linear-gradient(135deg, #e85d5d, #6a2a2a)', duration: 95 },
  { level: 11, titleEn: 'The Conquest of Mecca — Peaceful Return', titleTe: 'మక్కా విజయం — శాంతియుత ప్రత్యాగమనం', summaryEn: 'The Prophet returned to Mecca with 10,000 followers and conquered it without bloodshed, forgiving his enemies.', summaryTe: 'ప్రవక్త 10,000 మంది అనుచరులతో మక్కాకు తిరిగి వచ్చి, రక్తపాతం లేకుండా విజయం సాధించి, శత్రువులను క్షమించాడు.', emoji: '🕊️', gradient: 'linear-gradient(135deg, #6d7dff, #4a4aa0)', duration: 120 },
];

// ===== BIBLE QUIZZES (11 levels) =====
export interface BibleQuiz {
  level: number;
  questionEn: string;
  questionTe: string;
  optionsEn: string[];
  optionsTe: string[];
  answer: number;
  contextEn: string;
  contextTe: string;
  emoji: string;
}

export const bibleQuizzes: BibleQuiz[] = [
  { level: 1, questionEn: 'How many days did God take to create the world?', questionTe: 'దేవుడు ప్రపంచాన్ని సృష్టించడానికి ఎన్ని రోజులు తీసుకున్నాడు?', optionsEn: ['3 days', '6 days', '7 days', '10 days'], optionsTe: ['3 రోజులు', '6 రోజులు', '7 రోజులు', '10 రోజులు'], answer: 1, contextEn: 'Genesis 1 — God created the world in six days and rested on the seventh.', contextTe: 'ఆదికాండం 1 — దేవుడు ఆరు రోజుల్లో ప్రపంచాన్ని సృష్టించి, ఏడవ రోజు విశ్రమించాడు.', emoji: '🌍' },
  { level: 2, questionEn: 'Who built the Ark to survive the flood?', questionTe: 'ప్రళయం నుండి బయటపడటానికి ఓడను ఎవరు నిర్మించారు?', optionsEn: ['Moses', 'Noah', 'Abraham', 'David'], optionsTe: ['మోషే', 'నోవా', 'అబ్రాహం', 'దావీదు'], answer: 1, contextEn: 'Genesis 6 — Noah built the Ark at God\'s command to save his family and animals.', contextTe: 'ఆదికాండం 6 — నోవా దేవుని ఆజ్ఞతో ఓడ నిర్మించాడు.', emoji: '🚢' },
  { level: 3, questionEn: 'How many commandments did Moses receive?', questionTe: 'మోషే ఎన్ని ఆజ్ఞలు పొందాడు?', optionsEn: ['5', '7', '10', '12'], optionsTe: ['5', '7', '10', '12'], answer: 2, contextEn: 'Exodus 20 — God gave Moses the Ten Commandments on Mount Sinai.', contextTe: 'నిర్గమం 20 — దేవుడు సీనయి పర్వతంపై మోషేకు పది ఆజ్ఞలు ఇచ్చాడు.', emoji: '📜' },
  { level: 4, questionEn: 'Who defeated Goliath with a stone?', questionTe: 'ఒక రాయితో గోలియాత్‌ను ఎవరు ఓడించారు?', optionsEn: ['Saul', 'David', 'Samson', 'Solomon'], optionsTe: ['సౌలు', 'దావీదు', 'సాంసన్', 'సొలొమన్'], answer: 1, contextEn: '1 Samuel 17 — Young David defeated the giant Goliath with a sling and a stone.', contextTe: '1 శమూయేలు 17 — యువ దావీదు ఒక రాయితో దిగ్గజం గోలియాత్‌ను ఓడించాడు.', emoji: '🪨' },
  { level: 5, questionEn: 'Who was swallowed by a great fish?', questionTe: 'పెద్ద చేపచే మింగబడినది ఎవరు?', optionsEn: ['Jonah', 'Peter', 'Paul', 'Job'], optionsTe: ['యోనా', 'పేతురు', 'పౌలు', 'యోబు'], answer: 0, contextEn: 'Jonah 1 — Jonah was swallowed by a great fish for three days after fleeing God\'s command.', contextTe: 'యోనా 1 — యోనా దేవుని ఆజ్ఞను తప్పించుకుని పెద్ద చేపచే మింగబడ్డాడు.', emoji: '🐟' },
  { level: 6, questionEn: 'How many days did Jesus fast in the wilderness?', questionTe: 'యేసు ఎడారిలో ఎన్ని రోజులు ఉపవాసం ఉన్నాడు?', optionsEn: ['20 days', '30 days', '40 days', '50 days'], optionsTe: ['20 రోజులు', '30 రోజులు', '40 రోజులు', '50 రోజులు'], answer: 2, contextEn: 'Matthew 4 — Jesus fasted for 40 days and was tempted by the devil in the wilderness.', contextTe: 'మత్తయి 4 — యేసు 40 రోజులు ఉపవాసం ఉన్నాడు మరియు ఎడారిలో దెయ్యంచే పరీక్షించబడ్డాడు.', emoji: '🏜️' },
  { level: 7, questionEn: 'Who baptized Jesus in the Jordan River?', questionTe: 'యేసును యొర్దాను నదిలో ఎవరు బాప్టిజం చేశారు?', optionsEn: ['Peter', 'John the Baptist', 'James', 'Andrew'], optionsTe: ['పేతురు', 'బాప్టిస్టు యోహాను', 'యాకోబు', 'అండ్రయా'], answer: 1, contextEn: 'Matthew 3 — John the Baptist baptized Jesus in the Jordan River.', contextTe: 'మత్తయి 3 — బాప్టిస్టు యోహాను యేసును యొర్దాను నదిలో బాప్టిజం చేశాడు.', emoji: '💧' },
  { level: 8, questionEn: 'How many disciples did Jesus choose?', questionTe: 'యేసు ఎంతమంది శిష్యులను ఎంచుకున్నాడు?', optionsEn: ['7', '10', '12', '24'], optionsTe: ['7', '10', '12', '24'], answer: 2, contextEn: 'Luke 6 — Jesus chose 12 disciples to be his apostles.', contextTe: 'లూకా 6 — యేసు 12 మంది శిష్యులను తన అపొస్తలులుగా ఎంచుకున్నాడు.', emoji: '👥' },
  { level: 9, questionEn: 'What is the greatest commandment according to Jesus?', questionTe: 'యేసు ప్రకారం గొప్ప ఆజ్ఞ ఏది?', optionsEn: ['Love your neighbor', 'Love God with all your heart', 'Do not steal', 'Honor your parents'], optionsTe: ['నీ పొరుగువారిని ప్రేమించు', 'పూర్తి హృదయంతో దేవుని ప్రేమించు', 'దొంగతనం చేయకు', 'నీ తల్లిదండ్రులను గౌరవించు'], answer: 1, contextEn: 'Matthew 22 — Love the Lord your God with all your heart, soul, and mind.', contextTe: 'మత్తయి 22 — నీ దేవుని పూర్తి హృదయం, ఆత్మ, మనసుతో ప్రేమించు.', emoji: '❤️' },
  { level: 10, questionEn: 'Who denied Jesus three times before the rooster crowed?', questionTe: 'కోడి కూసే ముందు యేసును మూడు సార్లు త్రోసిపోసినది ఎవరు?', optionsEn: ['Judas', 'Peter', 'Thomas', 'John'], optionsTe: ['యూదా', 'పేతురు', 'తోమా', 'యోహాను'], answer: 1, contextEn: 'Luke 22 — Peter denied knowing Jesus three times before the rooster crowed.', contextTe: 'లూకా 22 — పేతురు కోడి కూసే ముందు యేసును తెలుసునని మూడు సార్లు త్రోసిపోశాడు.', emoji: '🐓' },
  { level: 11, questionEn: 'On which mountain did Jesus give the Great Commission?', questionTe: 'యేసు గొప్ప ఆజ్ఞను ఏ పర్వతంపై ఇచ్చాడు?', optionsEn: ['Mount Sinai', 'Mount of Olives', 'Mount Hermon', 'Mount Tabor'], optionsTe: ['సీనయి పర్వతం', 'జైతన పర్వతం', 'హెర్మోన్ పర్వతం', 'తాబోర్ పర్వతం'], answer: 1, contextEn: 'Matthew 28 — On the Mount of Olives, Jesus commanded: Go and make disciples of all nations.', contextTe: 'మత్తయి 28 — జైతన పర్వతంపై యేసు: వెళ్లి అన్ని జాతులను శిష్యులుగా చేయుడని ఆజ్ఞించాడు.', emoji: '⛰️' },
];

// ===== MAHABHARAT GAME CONFIG =====
export interface MahabharatGame {
  id: string;
  titleEn: string;
  titleTe: string;
  descEn: string;
  descTe: string;
  emoji: string;
  gradient: string;
  component: 'matti-kusti' | 'divine-archery' | 'sword-clash' | 'astro-tricks' | 'dharmic-strategy';
}

export const mahabharatGames: MahabharatGame[] = [
  { id: 'matti-kusti', titleEn: 'Matti Kusti', titleTe: 'మట్టి కుస్తీ', descEn: 'Bhima vs Duryodhana — mud-wrestling tactical combat', descTe: 'భీమ vs దుర్యోధన — మట్టి కుస్తీ పోరాటం', emoji: '🤼', gradient: 'linear-gradient(135deg, #8a5a2a, #5a3a1a)', component: 'matti-kusti' },
  { id: 'divine-archery', titleEn: 'Divine Archery', titleTe: 'దైవిక విలువిద్య', descEn: 'Arjuna & Karna — forest archery challenge', descTe: 'అర్జున & కర్ణ — అడవి విలువిద్య సవాలు', emoji: '🏹', gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)', component: 'divine-archery' },
  { id: 'sword-clash', titleEn: 'Sword Clash', titleTe: 'ఖడ్గ సంఘర్షణ', descEn: 'Nakula vs Dushasana — reaction-timing duel', descTe: 'నకుల vs దుశ్శాసన — ప్రతిచర్య సమరం', emoji: '⚔️', gradient: 'linear-gradient(135deg, #c0c0d0, #6a6a8a)', component: 'sword-clash' },
  { id: 'astro-tricks', titleEn: 'Astrological Tricks', titleTe: 'జ్యోతిష్య తంత్రాలు', descEn: 'Sahadeva — prediction puzzle matrix', descTe: 'సహదేవ — భవిష్యత్ పజిల్', emoji: '🔮', gradient: 'linear-gradient(135deg, #6d7dff, #3a3a8c)', component: 'astro-tricks' },
  { id: 'dharmic-strategy', titleEn: 'Dharmic Strategy', titleTe: 'ధార్మిక వ్యూహం', descEn: 'Krishna vs Shakuni — grid alignment puzzle', descTe: 'కృష్ణ vs శకుని — గ్రిడ్ పజిల్', emoji: '♟️', gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)', component: 'dharmic-strategy' },
];

export function getLoreForLevel(level: number, lang: Language): { speaker: string; text: string; emoji: string } {
  const lore = mahabharatLore.find((l) => l.level === level) || mahabharatLore[0];
  return {
    speaker: lang === 'te' ? lore.speakerTe : lore.speakerEn,
    text: lang === 'te' ? lore.textTe : lore.textEn,
    emoji: lore.emoji,
  };
}

// ===== CINEMATIC CHARACTER PROFILES =====
export interface CharacterProfile {
  id: string;
  nameEn: string;
  nameTe: string;
  titleEn: string;
  titleTe: string;
  emoji: string;
  gradient: string;
  cinematicEn: string;
  cinematicTe: string;
  traitsEn: string[];
  traitsTe: string[];
  icon: string;
}

export const characters: CharacterProfile[] = [
  {
    id: 'krishna',
    nameEn: 'Lord Krishna',
    nameTe: 'శ్రీ కృష్ణుడు',
    titleEn: 'The Divine Strategist',
    titleTe: 'దివ్య వ్యూహకర్త',
    emoji: '🪈',
    gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)',
    cinematicEn: 'Born in a prison on a stormy night, Krishna\'s life was destined to change the course of history. From taming serpents in the Yamuna to delivering the Bhagavad Gita on the battlefield of Kurukshetra — he is the charioteer who steers dharma itself. His smile could calm armies; his flute could move mountains. He did not wield a weapon in the war, yet his wisdom won it.',
    cinematicTe: 'తుఫాను రాత్రిన జైలులో జన్మించిన కృష్ణుని జీవితం చరిత్రను మార్చడానికి నియమించబడింది. యమునలో సర్పాలను నియంత్రించడం నుండి కురుక్షేత్ర యుద్ధభూమిలో భగవద్గీత బోధించడం వరకు — అతను ధర్మాన్ని నడిపే సారథి. అతని చిరునవ్వు సైన్యాలను శాంతింపజేస్తుంది; అతని వేణునాదం పర్వతాలను కదిలించగలదు. యుద్ధంలో ఆయుధం పట్టనప్పటికీ, అతని జ్ఞానం గెలిపింది.',
    traitsEn: ['Divine Wisdom', 'Master Strategist', 'Compassionate Guide'],
    traitsTe: ['దివ్య జ్ఞానం', 'వ్యూహ నిపుణుడు', 'కరుణామయ గైడ్'],
    icon: '🕉️',
  },
  {
    id: 'arjuna',
    nameEn: 'Arjuna',
    nameTe: 'అర్జునుడు',
    titleEn: 'The Greatest Archer',
    titleTe: 'గొప్ప ధనుర్ధరుడు',
    emoji: '🏹',
    gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)',
    cinematicEn: 'When Drona asked his students what they saw, every boy described the tree, the branches, the leaves. Only Arjuna said: "I see the eye of the bird." That singular focus made him the greatest archer the world has known. He could shoot in the dark, shoot while dancing, shoot through multiple targets with a single arrow. Yet on the day of war, this mighty warrior collapsed in doubt — and from that doubt rose the Bhagavad Gita.',
    cinematicTe: 'ద్రోణుడు తన శిష్యులను ఏమి చూస్తున్నారని అడిగినప్పుడు, ప్రతి బాలుడు చెట్టు, కొమ్మలు, ఆకులు వర్ణించాడు. అర్జునుడు మాత్రం "పక్షి కన్ను చూస్తున్నాను" అన్నాడు. ఆ ఏకాగ్రత అతన్ని ప్రపంచంలో గొప్ప ధనుర్ధరుడిని చేసింది. చీకట్లో కాల్చగలడు, నాట్యం చేస్తూ కాల్చగలడు, ఒక్క బాణంతో అనేక లక్ష్యాలను ఛేదించగలడు. కానీ యుద్ధ దినాన ఈ మహాయోధుడు సందేహంతో కూలబడ్డాడు — ఆ సందేహం నుండి భగవద్గీత ఉద్భవించింది.',
    traitsEn: ['Unmatched Focus', 'Peerless Archer', 'Devoted Disciple'],
    traitsTe: ['అసాధారణ ఏకాగ్రత', 'అప్రతిమ ధనుర్ధరుడు', 'భక్తిమయ శిష్యుడు'],
    icon: '🏹',
  },
  {
    id: 'bhishma',
    nameEn: 'Bhishma',
    nameTe: 'భీష్ముడు',
    titleEn: 'The Grandfather of Kurus',
    titleTe: 'కురు పితామహుడు',
    emoji: '🛡️',
    gradient: 'linear-gradient(135deg, #c0c0d0, #6a6a8a)',
    cinematicEn: 'He took an oath that echoed across centuries — to never marry, to never claim the throne, to serve whoever sat on it. For this sacrifice, his father granted him the boon of choosing his own moment of death. He fought on the side of adharma because his oath bound him. On the bed of arrows, pierced by a thousand shafts, he waited 58 days for the sun to turn north — teaching Yudhishthira the art of kingship even as he lay dying.',
    cinematicTe: 'అతను శతాబ్దాలు ప్రతిధ్వనించే ప్రతిజ్ఞ తీసుకున్నాడు — ఎప్పుడూ వివాహం చేసుకోకూడదు, సింహాసనం కోరకూడదు, ఎవరు సింహాసనంపై కూర్చుంటే వారికి సేవకం చేయాలి. ఈ త్యాగానికి తండ్రి స్వయంగా మరణించాలనే కోరితేనే మరణించగలనే వరాన్ని ప్రసాదించాడు. అతని ప్రతిజ్ఞ అతన్ని అధర్మ వైపు పోరాడేలా చేసింది. బాణాల పాలిట, వేయి బాణాలు దూసి, ఉత్తరాయణ సూర్యుడు వచ్చే వరకు 58 రోజులు నిరీక్షించాడు — మరణిస్తూనే యుధిష్ఠిరునికి రాజనీతి బోధించాడు.',
    traitsEn: ['Unbreakable Oath', 'Mighty Warrior', 'Supreme Loyalty'],
    traitsTe: ['అచంచు ప్రతిజ్ఞ', 'మహా యోధుడు', 'అత్యున్నత విధేయత'],
    icon: '🛡️',
  },
  {
    id: 'karna',
    nameEn: 'Karna',
    nameTe: 'కర్ణుడు',
    titleEn: 'The Tragic Hero',
    titleTe: 'దురదృష్ట వీరుడు',
    emoji: '🎯',
    gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)',
    cinematicEn: 'Abandoned at birth by his mother Kunti, raised by a charioteer, mocked for his caste — yet Karna\'s generosity was legendary. He gave his divine armor and earrings away when Indra asked, knowing it would cost him his life. He fought knowing Krishna had revealed the truth of his birth. He fought knowing he would face his own brothers. He fought because loyalty was his dharma — and he kept it till the end.',
    cinematicTe: 'తల్లి కుంతిచే జన్మలోనే వదిలివేయబడి, సారథి ఇంట్లో పెరిగి, కులం నిమిత్తం అపహాస్యం — కానీ కర్ణుని దానగుణం ప్రఖ్యాతి గాంచింది. ఇంద్రుడు కోరినప్పుడు తన దివ్య కవచ కుండలను దానం చేశాడు, అది తన ప్రాణానికి ముప్పు తెస్తుందని తెలిసినా. కృష్ణుడు తన జన్మ రహస్యం వెల్లడించినా పోరాడాడు. తన సోదరులను ఎదుర్కొన్నా పోరాడాడు. విధేయతే అతని ధర్మం — అంతిమ శ్వాస వరకు నిలిపాడు.',
    traitsEn: ['Unmatched Generosity', 'Tragic Loyalty', 'Peerless Archer'],
    traitsTe: ['అప్రతిమ దానగుణం', 'దురదృష్ట విధేయత', 'అప్రతిమ ధనుర్ధరుడు'],
    icon: '🎯',
  },
  {
    id: 'duryodhana',
    nameEn: 'Duryodhana',
    nameTe: 'దుర్యోధనుడు',
    titleEn: 'The Pride of Kauravas',
    titleTe: 'కౌరవుల గర్వం',
    emoji: '👑',
    gradient: 'linear-gradient(135deg, #8a5a2a, #5a3a1a)',
    cinematicEn: 'He was not born evil — he was born proud. Duryodhana\'s jealousy burned from the moment he saw the Pandavas prosper. He refused to give them even five villages. He chose war over peace, pride over wisdom. Yet even his enemies acknowledged his courage — he fought Bhima with maces as his last act, refusing to flee even when all was lost.',
    cinematicTe: 'అతను చెడుగా పుట్టలేదు — గర్వంగా పుట్టాడు. పాండవులు ఉన్నతి పొందినప్పటి నుండి దుర్యోధనుని అసూయ మండిపోయింది. ఐదు గ్రామాలు కూడా ఇవ్వలేదు. శాంతికి బదులు యుద్ధం, జ్ఞానానికి బదులు గర్వం ఎంచుకున్నాడు. కానీ శత్రువులు కూడా అతని ధైర్యాన్ని అంగీకరించారు — అన్ని కోల్పోయినా భీమతో గదా యుద్ధం చేశాడు, పారిపోవడానికి నిరాకరించాడు.',
    traitsEn: ['Fierce Pride', 'Skilled Mace Fighter', 'Unyielding Ambition'],
    traitsTe: ['తీవ్ర గర్వం', 'నిపుణ గదా యోధుడు', 'అణగా కోరిక'],
    icon: '👑',
  },
  {
    id: 'yusuf',
    nameEn: 'Prophet Yusuf',
    nameTe: 'ప్రవక్త యూసుఫ్',
    titleEn: 'The Patient One',
    titleTe: 'ఓర్పుగలవాడు',
    emoji: '🌙',
    gradient: 'linear-gradient(135deg, #4dbf8a, #2a8a5a)',
    cinematicEn: 'His beauty was so great that the moon hid in shame. Thrown into a well by jealous brothers, sold for a few coins, imprisoned for years on a false charge — yet Yusuf never once complained. His patience was not weakness; it was the strength of absolute faith. When he finally rose to power, he used it not for revenge but to feed the very brothers who had betrayed him.',
    cinematicTe: 'అతని అందం చూసి చంద్రుడు సిగ్గుపడ్డాడు. అసూయ సోదరులచే గొయ్యిలో వేయబడి, కొన్ని నాణెాలకు అమ్మబడి, అన్యాయ నిందతో సంవత్సరాలు జైలులో — కానీ యూసుఫ్ ఒక్కసారి కూడా ఫిర్యాదు చేయలేదు. అతని ఓర్పు బలహీనత కాదు; అది పూర్తి విశ్వాసం యొక్క బలం. అధికారం వచ్చినప్పుడు ప్రతీకి కాదు, తన్ను మోసం చేసిన సోదరులను ఆహారం పెట్టడానికి ఉపయోగించాడు.',
    traitsEn: ['Unshakable Patience', 'Forgiving Heart', 'Divine Wisdom'],
    traitsTe: ['కదలని ఓర్పు', 'క్షమాహృదయం', 'దివ్య జ్ఞానం'],
    icon: '🌙',
  },
  {
    id: 'jesus',
    nameEn: 'Jesus Christ',
    nameTe: 'యేసు క్రీస్తు',
    titleEn: 'The Prince of Peace',
    titleTe: 'శాంతి రాజు',
    emoji: '✝️',
    gradient: 'linear-gradient(135deg, #d4d4e0, #8a8aa0)',
    cinematicEn: 'He was born in a manger, yet kings bowed before him. He spoke to crowds on hillsides, yet his words reached across millennia. He healed the sick, gave sight to the blind, raised the dead — yet his greatest act was washing his disciples\' feet. "Love your enemies," he taught. "Turn the other cheek." His story did not end at the cross — it began there, and it continues to shape the world.',
    cinematicTe: 'అతను పశువుల గూడంలో జన్మించాడు, కానీ రాజులు అతని ముందు వంగి నమస్కరించారు. కొండలపై జనాలకు బోధించాడు, కానీ అతని మాటలు సహస్రాబ్దాలు దాటాయి. రోగులను నయం చేశాడు, గ్రుడ్డివారికి చూపు ఇచ్చాడు, మృతులను లేపాడు — కానీ అతని గొప్ప కార్యం శిష్యుల పాదాలు కడుక్కోవడం. "నీ శత్రువులను ప్రేమించు," అని బోధించాడు. అతని కథ సిలువ వద్ద ముగియలేదు — అక్కడే ప్రారంభమైంది, ప్రపంచాన్ని మార్చింది.',
    traitsEn: ['Boundless Compassion', 'Servant Leadership', 'Eternal Love'],
    traitsTe: ['అపరిమిత కరుణ', 'సేవా నాయకత్వం', 'శాశ్వత ప్రేమ'],
    icon: '✝️',
  },
];

// ===== TEMPLE / MAP EXPLORATION =====
export interface TemplePlace {
  id: string;
  nameEn: string;
  nameTe: string;
  locationEn: string;
  locationTe: string;
  emoji: string;
  gradient: string;
  descEn: string;
  descTe: string;
  factEn: string;
  factTe: string;
}

export const temples: TemplePlace[] = [
  {
    id: 'tirupati',
    nameEn: 'Tirupati Temple',
    nameTe: 'తిరుపతి దేవాలయం',
    locationEn: 'Andhra Pradesh, India',
    locationTe: 'ఆంధ్రప్రదేశ్, భారతం',
    emoji: '🛕',
    gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)',
    descEn: 'The richest temple in the world, dedicated to Lord Venkateswara. Millions of devotees climb the seven hills each year, making it the most visited holy site on earth.',
    descTe: 'ప్రపంచంలో అత్యధిక సంపద గల దేవాలయం, శ్రీ వేంకటేశ్వర స్వామికి అంకితం. ప్రతి సంవత్సరం లక్షల భక్తులు ఏడు కొండలు ఎక్కుతారు.',
    factEn: 'The temple receives over 50,000 visitors per day and tonsured hair offerings are sold to fund charities worldwide.',
    factTe: 'దేవాలయం రోజుకు 50,000 భక్తులను స్వాగతిస్తుంది, క్షౌరిక కేశాలను విక్రయించి ప్రపంచ దాతృత్వానికి నిధులు సమకూర్చుతుంది.',
  },
  {
    id: 'somnath',
    nameEn: 'Somnath Temple',
    nameTe: 'సోమనాథ్ దేవాలయం',
    locationEn: 'Gujarat, India',
    locationTe: 'గుజరాత్, భారతం',
    emoji: '🕉️',
    gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)',
    descEn: 'The first of the 12 Jyotirlingas, standing on the shores of the Arabian Sea. It was destroyed and rebuilt seven times — each time, it rose stronger.',
    descTe: '12 జ్యోతిర్లింగాలలో మొదటిది, అరేబియన్ సముద్ర తీరంలో నిలిచి ఉంది. ఏడు సార్లు నాశనం చేయబడి, పునర్నిర్మించబడింది — ప్రతిసారి బలంగా లేచింది.',
    factEn: 'The temple\'s original structure was said to be built by the Moon God himself, after Lord Shiva cured him of a curse.',
    factTe: 'దేవాలయం యొక్క మూల నిర్మాణం చంద్ర దేవునిచే నిర్మించబడిందని, శివుడు అతని శాపాన్ని నివారించిన తర్వాత.',
  },
  {
    id: 'kashi',
    nameEn: 'Kashi Vishwanath',
    nameTe: 'కాశీ విశ్వనాథ్',
    locationEn: 'Varanasi, Uttar Pradesh',
    locationTe: 'వారణాసి, ఉత్తరప్రదేశ్',
    emoji: '🪔',
    gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)',
    descEn: 'The oldest continuously inhabited city in the world. Lord Shiva himself is said to whisper the mantra of liberation into the ears of those who die here.',
    descTe: 'ప్రపంచంలో అత్యంత పురాతన నివాస నగరం. ఇక్కడ మరణించిన వారి చెవిలో శివుడు స్వయంగా ముక్తి మంత్రం విస్మరిస్తాడని నమ్మకం.',
    factEn: 'The Ganga Aarti at Dashashwamedh Ghat is performed every evening by 7 priests with massive brass lamps, visible to thousands gathered on boats.',
    factTe: 'దశాశ్వమేధ ఘాట్ వద్ద గంగా ఆరతి ప్రతి సాయంత్రం 7 పూజారులచే భారీ కంచు దీపాలతో నిర్వహించబడుతుంది.',
  },
  {
    id: 'mecca',
    nameEn: 'Masjid al-Haram',
    nameTe: 'మస్జిద్ అల్-హరామ్',
    locationEn: 'Mecca, Saudi Arabia',
    locationTe: 'మక్కా, సౌదీ అరేబియా',
    emoji: '🕋',
    gradient: 'linear-gradient(135deg, #6d7dff, #3a3a8c)',
    descEn: 'The holiest site in Islam, containing the Kaaba built by Prophet Ibrahim and his son Ismail. Millions of pilgrims perform Hajj here each year.',
    descTe: 'ఇస్లాంలో అత్యంత పవిత్ర స్థలం, ప్రవక్త ఇబ్రాహీం మరియు అతని కుమారుడు ఇస్మాయీల్ నిర్మించిన కాబా ఇందులో ఉంది.',
    factEn: 'The Kaaba is covered with a black silk cloth called the Kiswah, which is replaced annually during Hajj season.',
    factTe: 'కాబా నల్ల పట్టు వస్త్రంతో కప్పబడుతుంది, దీనిని కిస్వా అంటారు, ప్రతి హజ్ సీజన్‌లో మార్చబడుతుంది.',
  },
  {
    id: 'jerusalem',
    nameEn: 'Church of the Holy Sepulchre',
    nameTe: 'హోలీ సెపల్‌చర్ చర్చి',
    locationEn: 'Jerusalem, Israel',
    locationTe: 'జెరూసలేం, ఇజ్రాయెల్',
    emoji: '⛪',
    gradient: 'linear-gradient(135deg, #d4d4e0, #8a8aa0)',
    descEn: 'The most sacred site in Christianity, built on the hill of Calvary where Jesus was crucified and the tomb where he was resurrected.',
    descTe: 'క్రైస్తవ మతంలో అత్యంత పవిత్ర స్థలం, యేసును సిలువ వేసిన కల్వరీ కొండపై నిర్మించబడింది.',
    factEn: 'The keys to the church have been held by two Muslim families for over 800 years, to prevent disputes among Christian denominations.',
    factTe: 'చర్చి తాళ్లు 800 సంవత్సరాలుగా ఇద్దరు ముస్లిం కుటుంబాల వద్ద ఉన్నాయి, క్రైస్తవ వర్గాల మధ్య వివాదాలు నివారించడానికి.',
  },
  {
    id: 'hampi',
    nameEn: 'Virupaksha Temple, Hampi',
    nameTe: 'విరూపాక్ష దేవాలయం, హంపి',
    locationEn: 'Karnataka, India',
    locationTe: 'కర్ణాటక, భారతం',
    emoji: '🏛️',
    gradient: 'linear-gradient(135deg, #cd7f32, #8a4f1a)',
    descEn: 'A UNESCO World Heritage Site, the last surviving temple of the Vijayanagara Empire. It has been functioning continuously since the 7th century.',
    descTe: 'యునెస్కో ప్రపంచ వారసత్వ స్థలం, విజయనగర సామ్రాజ్యం యొక్క చివరి దేవాలయం. 7వ శతాబ్దం నుండి నిరంతరం పనిచేస్తోంది.',
    factEn: 'The temple features an inverted shadow of its main tower projected onto a wall inside, a marvel of ancient engineering.',
    factTe: 'దేవాలయం యొక్క ప్రధాన గోపురం నీడ లోపల గోడపై తలకిందులుగా ప్రొజెక్ట్ అవుతుంది, ప్రాచీన ఇంజనీరింగ్ అద్భుతం.',
  },
];

// ===== QUOTES OF THE DAY =====
export interface DailyQuote {
  textEn: string;
  textTe: string;
  authorEn: string;
  authorTe: string;
  sourceEn: string;
  sourceTe: string;
}

export const quotes: DailyQuote[] = [
  {
    textEn: 'You have the right to perform your duty, but not to the fruits of your action.',
    textTe: 'నీకు కర్మ చేయే హక్కు ఉంది, కానీ ఫలితం పట్ల హక్కు లేదు.',
    authorEn: 'Lord Krishna',
    authorTe: 'శ్రీ కృష్ణుడు',
    sourceEn: 'Bhagavad Gita 2.47',
    sourceTe: 'భగవద్గీత 2.47',
  },
  {
    textEn: 'The soul is neither born, nor does it die. It is eternal and unborn.',
    textTe: 'ఆత్మ పుట్టదు, చచ్చిపోదు. అది శాశ్వతం, అజన్ముడు.',
    authorEn: 'Lord Krishna',
    authorTe: 'శ్రీ కృష్ణుడు',
    sourceEn: 'Bhagavad Gita 2.20',
    sourceTe: 'భగవద్గీత 2.20',
  },
  {
    textEn: 'Patience is the key to relief.',
    textTe: 'ఓర్పే వారికి విముక్తి తప్పక లభిస్తుంది.',
    authorEn: 'Prophet Muhammad',
    authorTe: 'ప్రవక్త ముహమ్మద్',
    sourceEn: 'Sahih Bukhari',
    sourceTe: 'సహీ బుఖారీ',
  },
  {
    textEn: 'Love your neighbor as yourself.',
    textTe: 'నీ పొరుగువారిని నీ వలె ప్రేమించు.',
    authorEn: 'Jesus Christ',
    authorTe: 'యేసు క్రీస్తు',
    sourceEn: 'Mark 12:31',
    sourceTe: 'మార్కు 12:31',
  },
  {
    textEn: 'Whatever you do, do it as an offering to the Divine.',
    textTe: 'నీవు ఏది చేసినా, దివ్యానికి అర్పణగా చేయి.',
    authorEn: 'Lord Krishna',
    authorTe: 'శ్రీ కృష్ణుడు',
    sourceEn: 'Bhagavad Gita 9.27',
    sourceTe: 'భగవద్గీత 9.27',
  },
  {
    textEn: 'The best among you are those who are most beneficial to others.',
    textTe: 'మీలో ఉత్తములు ఇతరులకు అత్యధిక ఉపయోగకారులు.',
    authorEn: 'Prophet Muhammad',
    authorTe: 'ప్రవక్త ముహమ్మద్',
    sourceEn: 'Sahih Bukhari',
    sourceTe: 'సహీ బుఖారీ',
  },
  {
    textEn: 'Blessed are the peacemakers, for they shall be called children of God.',
    textTe: 'శాంతి స్థాపకులు ధన్యులు, వారు దేవుని బిడ్డలుగా పిలువబడతారు.',
    authorEn: 'Jesus Christ',
    authorTe: 'యేసు క్రీస్తు',
    sourceEn: 'Matthew 5:9',
    sourceTe: 'మత్తయి 5:9',
  },
];

// ===== FACTS AND MYTHS =====
export interface FactMyth {
  type: 'fact' | 'myth';
  textEn: string;
  textTe: string;
  detailEn: string;
  detailTe: string;
  emoji: string;
}

export const factsAndMyths: FactMyth[] = [
  {
    type: 'fact',
    textEn: 'The Mahabharata is 10x longer than the Iliad and Odyssey combined',
    textTe: 'మహాభారతం ఇలియడ్ మరియు ఒడిస్సీ కలిపినదానికి 10 రెట్లు పొడవు',
    detailEn: 'With over 100,000 shlokas, the Mahabharata is the longest poem ever written — roughly 10 times the length of Homer\'s Iliad and Odyssey combined.',
    detailTe: 'ఒక లక్ష శ్లోకాలతో, మహాభారతం ఇప్పటివరకు రాయబడిన అత్యంత పొడవైన కవిత.',
    emoji: '📖',
  },
  {
    type: 'myth',
    textEn: 'Myth: The Gita was spoken only to Arjuna',
    textTe: 'పుక: గీత అర్జునునికి మాత్రమే చెప్పబడింది',
    detailEn: 'Sanjaya, granted divine vision by Vyasa, heard the entire Bhagavad Gita and narrated it to the blind king Dhritarashtra in real time from the battlefield.',
    detailTe: 'వ్యాసుడు ప్రసాదించిన దివ్య దృష్టితో సంజయుడు మొత్తం భగవద్గీత విని, గ్రుడ్డి రాజు ధృతరాష్ట్రునికి యుద్ధభూమి నుండి నిజసమయంలో వివరించాడు.',
    emoji: '👁️',
  },
  {
    type: 'fact',
    textEn: 'Bhishma waited 58 days on a bed of arrows',
    textTe: 'భీష్ముడు బాణాల పాల 58 రోజులు నిరీక్షించాడు',
    detailEn: 'Because of his boon to choose his time of death, Bhishma lay on a bed of arrows from the 10th day of the war until Uttarayana (the sun\'s northward journey), teaching Rajadharma to Yudhishthira.',
    detailTe: 'మరణ సమయం ఎంచుకునే వరం కారణంగా, భీష్ముడు యుద్ధం 10వ రోజు నుండి ఉత్తరాయణ వరకు బాణాల పాల ఉండి, యుధిష్ఠిరునికి రాజధర్మం బోధించాడు.',
    emoji: '🛏️',
  },
  {
    type: 'myth',
    textEn: 'Myth: Karna was always weaker than Arjuna',
    textTe: 'పుక: కర్ణుడు ఎల్లప్పుడూ అర్జునునికన్నా బలహీనుడు',
    detailEn: 'Karna defeated Arjuna in a preliminary skirmish. Krishna himself acknowledged that with the Vijaya bow, Karna could have been unstoppable. It was divine intervention and curses, not skill, that decided their final battle.',
    detailTe: 'కర్ణుడు ప్రాథమిక యుద్ధంలో అర్జునుని ఓడించాడు. కృష్ణుడే విజయ ధనుస్సుతో కర్ణుడు అజయుడవుతాడని అంగీకరించాడు. వారి అంతిమ యుద్ధం నిర్ణయించింది నైపుణ్యం కాదు, దివ్య జోక్యం మరియు శాపాలు.',
    emoji: '⚔️',
  },
  {
    type: 'fact',
    textEn: 'The Kaaba is aligned with magnetic north to within 1 degree',
    textTe: 'కాబా అయస్కాంత ఉత్తర దిశతో 1 డిగ్రీ లోపల సరిగా ఉంది',
    detailEn: 'Ancient builders aligned the Kaaba with remarkable precision. The structure\'s alignment has been studied by modern engineers as a feat of ancient surveying.',
    detailTe: 'ప్రాచీన నిర్మాతలు కాబాను అద్భుతమైన కచ్చితత్వంతో సరిచేశారు. ఆధునిక ఇంజనీర్లు దీనిని ప్రాచీన సర్వేయింగ్ అద్భుతంగా అభ్యసించారు.',
    emoji: '🧭',
  },
  {
    type: 'myth',
    textEn: 'Myth: The Great Flood is unique to one religion',
    textTe: 'పుక: మహా ప్రవాహం ఒక మతానికి మాత్రమే',
    detailEn: 'The story of a great flood appears in Hindu (Matsya Avatar), Islamic (Prophet Nuh), and Christian (Noah\'s Ark) traditions — a shared memory across civilizations.',
    detailTe: 'మహా ప్రవాహం కథ హిందూ (మత్స్య అవతారం), ఇస్లామిక్ (ప్రవక్త నూహ్), మరియు క్రైస్తవ (నోవా ఓడ) సంప్రదాయాల్లో కనిపిస్తుంది.',
    emoji: '🌊',
  },
];

// ===== HIDDEN STORIES (SANNIVESALU) =====
export interface HiddenStory {
  id: string;
  titleEn: string;
  titleTe: string;
  emoji: string;
  gradient: string;
  storyEn: string;
  storyTe: string;
  moralEn: string;
  moralTe: string;
}

export const hiddenStories: HiddenStory[] = [
  {
    id: 'bhishma-boon',
    titleEn: 'Why Bhishma Could Choose His Own Death',
    titleTe: 'భీష్ముడు తన మరణాన్ని ఎంచుకోగలిగిన కారణం',
    emoji: '🛡️',
    gradient: 'linear-gradient(135deg, #c0c0d0, #6a6a8a)',
    storyEn: 'King Shantanu of Hastinapura fell deeply in love with a fisherwoman named Satyavati. But her father laid one condition before the marriage: the son born to Satyavati must inherit the throne — not Shantanu\'s already-crowned son Devavrata (later Bhishma). Shantanu refused, heartbroken but bound by duty to his firstborn.\n\nDevavrata saw his father\'s silent suffering. Without hesitation, the prince walked to the fisherman\'s hut and took a vow that shook the heavens: "I renounce the throne forever. I shall never marry. I shall never produce an heir. I will serve whoever sits on the throne of Hastinapura, without question, without ambition."\n\nThe gods themselves appeared. His father Shantanu, overwhelmed by this sacrifice, granted him a boon: "You shall not die until you yourself choose to. Death shall come only when you will it." And so Devavrata became Bhishma — the terrible, the fearsome — the man who could not be killed, who lay on a bed of arrows for 58 days waiting for the right moment to leave his body.',
    storyTe: 'హస్తినాపుర రాజు శంతనుడు మత్స్యగిరి కూతురు సత్యవతితో లోతైన ప్రేమలో పడ్డాడు. కానీ ఆమె తండ్రి ఒక షరతు పెట్టాడు: సత్యవతికి జన్మించే కుమారుడే సింహాసనం అధిరోహించాలి — శంతనుని మొదటి కుమారుడు దేవవ్రత (తర్వాత భీష్మ) కాదు. శంతనుడు తిరస్కరించాడు, హృదయ విచ్ఛేదంతో కానీ తన మొదటి కుమారునికి కట్టుబడి ఉన్నాడు.\n\nదేవవ్రత తన తండ్రి నిశ్శబ్త బాధను చూశాడు. సందేహం లేకుండా, యువరాజు మత్స్యకారుని గుడిసెకు వెళ్లి స్వర్గాలను కంపించిన ప్రతిజ్ఞ తీసుకున్నాడు: "నేను సింహాసనాన్ని శాశ్వతంగా త్యజిస్తున్నాను. ఎప్పుడూ వివాహం చేసుకోను. వారసులను కనను. హస్తినాపుర సింహాసనంపై ఎవరు కూర్చుంటే వారికి సేవ చేస్తాను, ప్రశ్న లేకుండా, ఆశ లేకుండా."\n\nదేవతలు స్వయంగా ప్రత్యక్షమయ్యారు. తండ్రి శంతనుడు, ఈ త్యాగానికి కమ్మడై, ఒక వరం ప్రసాదించాడు: "నీవు స్వయంగా కోరే వరకే మరణం రాదు. నీ ఇష్టం లేకుండా మృత్యువు రాదు." అలా దేవవ్రత భీష్మ అయ్యాడు — భయంకరుడు — చంపలేని వ్యక్తి, బాణాల పాల 58 రోజులు తన శరీరం విడిచే సరైన క్షణానికి నిరీక్షించాడు.',
    moralEn: 'A sacrifice made from love becomes immortal. Bhishma\'s oath was not taken for power — it was taken so his father could smile again.',
    moralTe: 'ప్రేమ నుండి చేసిన త్యాగం అమరత్వం పొందుతుంది. భీష్ముని ప్రతిజ్ఞ అధికారం కోసం కాదు — తన తండ్రి మళ్లీ చిరునవ్వు చేయాలని.',
  },
  {
    id: 'ekalavya',
    titleEn: 'Ekalavya — The Self-Taught Archer\'s Thumb',
    titleTe: 'ఏకలవ్య — స్వయం నేర్చుకున్న ధనుర్ధరుని బొటనవేలు',
    emoji: '🏹',
    gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)',
    storyEn: 'Ekalavya, a tribal prince, came to Drona requesting to learn archery. Drona refused — he had promised Arjuna that no student would equal him. Heartbroken but undeterred, Ekalavya returned to the forest. He made a clay statue of Drona, placed it before him, and practiced day and night — teaching himself.\n\nYears later, the Pandavas were hunting in the forest when a dog began barking at a figure in the distance. Before the dog could bark again, its mouth was sealed shut by seven arrows placed with surgical precision — not a wound, just arrows filling its mouth. It was Ekalavya.\n\nDrona was stunned. This boy had surpassed even Arjuna without a teacher. Drona approached Ekalavya and said: "If I am your guru, you must pay guru-dakshina (teacher\'s fee)." Ekalavya, overjoyed, replied: "Ask anything, Guruji!" Drona said: "Give me your right thumb." Without a word, without hesitation, Ekalavya cut off his own thumb and placed it at Drona\'s feet.\n\nArjuna\'s supremacy was preserved. But the forest still whispers of a boy who could have been the greatest archer the world ever knew.',
    storyTe: 'ఏకలవ్య, ఒక గిరిజన యువరాజు, ద్రోణుని వద్దకు వచ్చి ధనుర్విద్య నేర్చుకోవడానికి అడిగాడు. ద్రోణుడు తిరస్కరించాడు — అర్జునునికి ఎవరూ సమానం కారని వాగ్దానం చేశాడు. హృదయ విచ్ఛేదంతో కానీ వెనుకడుగు వేయకుండా, ఏకలవ్య అడవికి తిరిగి వెళ్లాడు. ద్రోణుని బుడి విగ్రహం చేసి, తన ముందు ఉంచి, రోజు రాత్రి సాధన చేశాడు — స్వయంగా నేర్చుకున్నాడు.\n\nసంవత్సరాల తర్వాత, పాండవులు అడవిలో వేటాడుతున్నప్పుడు ఒక కుక్క దూరంగా ఒక వ్యక్తి వైపు మొరగడం ప్రారంభించింది. కుక్క మళ్లీ మొరగకముందే, దాని నోరు ఏడు బాణాలతో శస్త్రచికిత్స కచ్చితత్వంతో మూయబడింది — గాయం కాదు, కేవలం నోటిలో బాణాలు. అది ఏకలవ్య.\n\nద్రోణుడు ఆశ్చర్యపోయాడు. ఈ బాలుడు గురువు లేకుండా అర్జునుని కూడా మించాడు. ద్రోణుడు ఏకలవ్య వద్దకు వెళ్లి "నేను నీ గురువినయితే గురుదక్షిణ ఇవ్వాలి" అన్నాడు. ఏకలవ్య ఆనందంతో "ఏది కోరండి గురుజీ!" అన్నాడు. ద్రోణుడు "నీ కుడి బొటనవేలు ఇవ్వు" అన్నాడు. ఒక మాట లేకుండా, సందేహం లేకుండా, ఏకలవ్య తన బొటనవేలు నరికి ద్రోణుని పాదాల వద్ద ఉంచాడు.\n\nఅర్జునుని ఆధిపత్యం రక్షించబడింది. కానీ అడవి ఇప్పటికీ ఆ బాలుని గురించి విస్మరిస్తుంది — ప్రపంచం చూసిన గొప్ప ధనుర్ధరుడు కాగలిగిన వాడు.',
    moralEn: 'True knowledge does not require a teacher\'s permission. But the world\'s injustice can cut the most talented down — and history remembers the thumb that was lost.',
    moralTe: 'నిజమైన జ్ఞానానికి గురువు అనుమతి అవసరం లేదు. కానీ ప్రపంచ అన్యాయం అత్యంత ప్రతిభావంతులను కూడా కత్తిరించగలదు — చరిత్ర ఆ కోల్పోయిన బొటనవేలును గుర్తుంచుకుంటుంది.',
  },
  {
    id: 'abhimanyu-chakravyuha',
    titleEn: 'Abhimanyu — The Boy Who Broke the Unbreakable Formation',
    titleTe: 'అభిమన్యు — అభేద్య వ్యూహాన్ని ఛేదించిన బాలుడు',
    emoji: '⚔️',
    gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)',
    storyEn: 'Abhimanyu, Arjuna\'s 16-year-old son, heard the secret of the Chakravyuha (a rotating circular battle formation) while still in his mother\'s womb. Arjuna was explaining it to Subhadra — but fell asleep before revealing how to exit the formation. So Abhimanyu knew how to enter, but not how to escape.\n\nOn the 13th day of the war, the Kauravas deployed the Chakravyuha. Arjuna was away. No one else among the Pandavas could break it. Young Abhimanyu stepped forward. "I can enter, father taught me that. I cannot promise I can return."\n\nHe broke through the outer ring, fighting Drona, Karna, Duryodhana, and Dushasana simultaneously. He destroyed Dushasana\'s son in single combat. He fought with a wheel when his bow was broken, with a sword when his wheel was shattered, with bare hands when his sword was lost. Seven maharathis (great warriors) surrounded one boy — and still they could not defeat him fairly. They killed him through deceit, striking from behind.\n\nWhen Arjuna returned and heard, he wept as he had never wept before. The boy who knew how to enter but not how to leave — he had entered history itself.',
    storyTe: 'అర్జునుని 16 సంవత్సరాల కుమారుడు అభిమన్యు, ఇంకా తల్లి గర్భంలో ఉన్నప్పుడే చక్రవ్యూహం (భ్రమణ వృత్తాకార యుద్ధ వ్యూహం) రహస్యాన్ని విన్నాడు. అర్జునుడు సుభద్రకు వివరిస్తున్నాడు — కానీ వ్యూహం నుండి ఎలా బయటపడాలో చెప్పకముందే నిద్రపోయాడు. కాబట్టి అభిమన్యు ఎలా ప్రవేశించాలో తెలుసు, కానీ ఎలా బయటపడాలో తెలియదు.\n\nయుద్ధం 13వ రోజున, కౌరవులు చక్రవ్యూహం నిర్మించారు. అర్జునుడు లేడు. పాండవులలో మరెవరూ దానిని ఛేదించలేకపోయారు. యువ అభిమన్యు ముందుకు వచ్చాడు. "నేను ప్రవేశించగలను, తండ్రి నాకు నేర్పారు. తిరిగి రాగలనని వాగ్దానం చేయలేను."\n\nఅతను బయటి వలయాన్ని ఛేదించాడు, ద్రోణుడు, కర్ణుడు, దుర్యోధనుడు, దుశ్శాసనుడు — వారందరితో ఏకకాలంలో పోరాడాడు. దుశ్శాసనుని కుమారుని ఏకైక పోరులో వధించాడు. విల్లు విరిగినప్పుడు చక్రంతో, చక్రం నేలకూలినప్పుడు ఖడ్గంతో, ఖడ్గం పోయినప్పుడు చేతులతో పోరాడాడు. ఏడుగురు మహారథులు ఒక బాలుని చుట్టుముట్టారు — కానీ న్యాయంగా ఓడించలేకపోయారు. వెనుక నుండి కొట్టి మోసంగా చంపారు.\n\nఅర్జునుడు తిరిగి వచ్చి విన్నప్పుడు, ఇంతకు ముందెన్నడూ కాని విధంగా ఏడ్చాడు. ఎలా ప్రవేశించాలో తెలిసి కానీ ఎలా బయటపడాలో తెలియని బాలుడు — అతను చరిత్రలోకే ప్రవేశించాడు.',
    moralEn: 'Courage is not knowing you will win — it is entering anyway, knowing you may not return. Abhimanyu fought not for victory, but for dharma.',
    moralTe: 'ధైర్యం అనేది గెలుస్తానని తెలుసుకాదు — తిరిగి రాకపోవచ్చని తెలిసినా ప్రవేశించడం. అభిమన్యు విజయం కోసం కాదు, ధర్మం కోసం పోరాడాడు.',
  },
  {
    id: 'savitri-satyavan',
    titleEn: 'Savitri — The Woman Who Defeated Death Itself',
    titleTe: 'సావిత్రి — మృత్యువునే ఓడించిన స్త్రీ',
    emoji: '🌸',
    gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)',
    storyEn: 'Savitri, a princess, chose Satyavan as her husband — despite the sage Narada warning that he would die within one year. Her father pleaded with her to choose another. She refused: "I have chosen once. I will not choose again."\n\nThree days before the predicted death, Savitri began a strict fast and vigil. On the fateful day, Satyavan went to the forest to cut wood. Savitri followed. As he swung his axe, his head began to ache. He lay down in her lap. Yama, the god of death, appeared and took Satyavan\'s soul.\n\nSavitri followed Yama. He tried to send her back. She spoke with such wisdom and devotion that Yama, impressed, granted her boons — all except her husband\'s life. First, sight for her blind father-in-law. Second, the kingdom restored to her father. Third, sons for herself. When she said "sons," Yama realized his mistake — how could she have sons without her husband? Bound by his own word, Yama restored Satyavan to life.\n\nNot with weapons, not with armies — with words and unwavering love, a woman defeated the god of death.',
    storyTe: 'సావిత్రి, ఒక రాకుమార్తె, సత్యవంతుని తన భర్తగా ఎంచుకుంది — మహర్షి నారదుడు అతను ఒక సంవత్సరంలో మరణిస్తాడని హెచ్చరించినా. తండ్రి మరొకరిని ఎంచుకోమని వేడుకున్నాడు. ఆమె తిరస్కరించింది: "ఒక్కసారి ఎంచుకున్నాను. మళ్లీ ఎంచుకోను."\n\nఅంచనా మరణానికి మూడు రోజుల ముందు, సావిత్రి కఠిన ఉపవాసం మరియు జాగరం ప్రారంభించింది. ఆ రోజున, సత్యవంతుడు కట్టెలు కోసం అడవికి వెళ్లాడు. సావిత్రి వెంట వెళ్లింది. గొడ్డలి కొట్టుతుండగా, తల నొప్పి మొదలైంది. ఆమె ఒడిలో పడుకున్నాడు. మృత్యు దేవుడు యముడు ప్రత్యక్షమై సత్యవంతుని ఆత్మ తీసుకున్నాడు.\n\nసావిత్రి యముని వెంట వెళ్లింది. అతను తిరిగి పంపడానికి ప్రయత్నించాడు. ఆమె అంత జ్ఞానం మరియు భక్తితో మాట్లాడింది, యముడు మెచ్చి, వరాలు ప్రసాదించాడు — భర్త ప్రాణం తప్ప. మొదట, అంధ మామకు దృష్టి. రెండవ, తండ్రికి రాజ్యం. మూడవ, తనకు కుమారులు. "కుమారులు" అని చెప్పినప్పుడు, యముడు తన తప్పు గ్రహించాడు — భర్త లేకుండా కుమారులు ఎలా? తన మాటకు కట్టుబడి, యముడు సత్యవంతుని జీవితం తిరిగి ఇచ్చాడు.\n\nఆయుధాలతో కాదు, సైన్యాలతో కాదు — మాటలతో మరియు అచంచు ప్రేమతో, ఒక స్త్రీ మృత్యు దేవుని ఓడించింది.',
    moralEn: 'Love combined with intellect is the most powerful force in the universe. Savitri did not fight death — she outwitted it with devotion.',
    moralTe: 'ప్రేమకు బుద్ధి జత అయితే ప్రపంచంలో అత్యంత బలవంతమైన శక్తి. సావిత్రి మృత్యువుతో పోరాడలేదు — భక్తితో మెప్పించింది.',
  },
];

export function getQuoteForDay(lang: Language): DailyQuote {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return quotes[dayOfYear % quotes.length];
}
