export type Language = 'en' | 'te';

export interface TranslationKey {
  // Navigation
  games: string;
  ranks: string;
  leagues: string;
  subjects: string;
  profile: string;
  mitra: string;
  signOut: string;
  // Landing
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroDescription: string;
  startJourney: string;
  // Avatar styles
  avatarStyleTitle: string;
  fusionAnime: string;
  fusionAnimeDesc: string;
  chibiCultural: string;
  chibiCulturalDesc: string;
  classicMythological: string;
  classicMythologicalDesc: string;
  // Genre tabs
  triviaHub: string;
  puzzleQuests: string;
  epicCombat: string;
  // Combat arena
  epicCombatArena: string;
  arjunasArchery: string;
  arjunasArcheryDesc: string;
  bheemasKusti: string;
  bheemasKustiDesc: string;
  playNow: string;
  // Archery game
  score: string;
  streak: string;
  arrows: string;
  tapToShoot: string;
  targetsHit: string;
  // Kusti game
  maceStrike: string;
  powerSlam: string;
  dharmicShield: string;
  opponentHealth: string;
  yourHealth: string;
  victory: string;
  defeat: string;
  playAgain: string;
  backToArena: string;
  // Mitra onboarding
  mitraGreeting: string;
  enterName: string;
  enterAge: string;
  selectLanguage: string;
  selectGenres: string;
  selectTopics: string;
  next: string;
  back: string;
  finish: string;
  // Level up
  levelUpEn: string;
  levelUpTe: string;
  // Profile
  playerLevel: string;
  totalPoints: string;
  dayStreak: string;
  status: string;
  readingAge: string;
  preferences: string;
  gamingStyle: string;
  interests: string;
  preferredTopics: string;
  updateWithMitra: string;
  themeSettings: string;
  avatarInventory: string;
  learningPreference: string;
  storyFirst: string;
  storyWhilePlaying: string;
  // Footer
  teamCredit: string;
  // Misc
  recommendedForYou: string;
  allGames: string;
  yourProgress: string;
  best: string;
  plays: string;
  continueBtn: string;
  leaderboard: string;
  competeWin: string;
  welcomeBack: string;
  // Global Leagues
  globalLeagues: string;
  bronzeLeague: string;
  silverLeague: string;
  dharmicGoldLeague: string;
  bronzeLeagueDesc: string;
  silverLeagueDesc: string;
  dharmicGoldLeagueDesc: string;
  selectTopic: string;
  bhagavadGita: string;
  mahabharatEpics: string;
  bibleHistory: string;
  quranNarratives: string;
  top10Players: string;
  rank: string;
  player: string;
  activeLevel: string;
  divineXP: string;
  you: string;
  leagueProgress: string;
  climbToNext: string;
  yourDivision: string;
  division: string;
  topic: string;
  // Discover
  discover: string;
  cinematicCharacters: string;
  exploreTemples: string;
  quoteOfTheDay: string;
  factsAndMyths: string;
  hiddenStories: string;
  characterTraits: string;
  templeFact: string;
  fact: string;
  myth: string;
  storyMoral: string;
  exploreLocation: string;
}

export const translations: Record<Language, TranslationKey> = {
  en: {
    games: 'Games',
    ranks: 'Ranks',
    leagues: 'Leagues',
    subjects: 'Subjects',
    profile: 'Profile',
    mitra: 'Mitra',
    signOut: 'Sign Out',
    heroTitle: 'Leela',
    heroSubtitle: 'Ancient Heritage. Modern Gameplay.',
    heroTagline: 'AI-Powered Gamified Cultural Learning',
    heroDescription: 'An immersive 3D-styled cultural gaming ecosystem that transforms Indian heritage into personalized interactive experiences. Meet Mitra — your AI guide who speaks to you, learns how you play, and crafts your perfect learning adventure.',
    startJourney: 'Start Your Journey',
    avatarStyleTitle: 'Choose Your Avatar Style',
    fusionAnime: 'Fusion Anime Style',
    fusionAnimeDesc: 'Dynamic anime-inspired cultural characters',
    chibiCultural: 'Chibi Cultural Style',
    chibiCulturalDesc: 'Cute miniature cultural avatars',
    classicMythological: 'Classic Mythological Style',
    classicMythologicalDesc: 'Traditional divine warrior aesthetics',
    triviaHub: 'Trivia Hub',
    puzzleQuests: 'Puzzle Quests',
    epicCombat: 'Epic Combat Games',
    epicCombatArena: 'Epic Combat Arena',
    arjunasArchery: "Arjuna's Archery Quest",
    arjunasArcheryDesc: 'Aim and shoot arrows at floating cultural targets',
    bheemasKusti: "Bheema's Kusti Rumble",
    bheemasKustiDesc: 'Tactical wrestling combat with action cards',
    playNow: 'Play Now',
    score: 'Score',
    streak: 'Streak',
    arrows: 'Arrows',
    tapToShoot: 'Tap to aim and shoot',
    targetsHit: 'Targets Hit',
    maceStrike: 'Mace Strike',
    powerSlam: 'Power Slam',
    dharmicShield: 'Dharmic Shield',
    opponentHealth: 'Opponent',
    yourHealth: 'You',
    victory: 'Victory!',
    defeat: 'Defeated',
    playAgain: 'Play Again',
    backToArena: 'Back to Arena',
    mitraGreeting: "Namaste! I'm Mitra, your AI guide. Let's set up your profile step by step.",
    enterName: 'What should I call you?',
    enterAge: "What's your age?",
    selectLanguage: 'Which language do you prefer?',
    selectGenres: 'What kind of games do you enjoy?',
    selectTopics: 'Which topics interest you most?',
    next: 'Next',
    back: 'Back',
    finish: 'Finish Setup',
    levelUpEn: 'Hey! You have been leveled up! Congratulations!',
    levelUpTe: 'హేయ్! మీరు లెవెల్ అప్ అయ్యారు! అభినందనలు!',
    playerLevel: 'Player Level',
    totalPoints: 'Total Points',
    dayStreak: 'Day Streak',
    status: 'Status',
    readingAge: 'Reading Age',
    preferences: 'Your Preferences',
    gamingStyle: 'Gaming Style',
    interests: 'Interests',
    preferredTopics: 'Preferred Topics',
    updateWithMitra: 'Update with Mitra',
    themeSettings: 'Theme Settings',
    avatarInventory: 'Avatar Inventory',
    learningPreference: 'Learning Preference',
    storyFirst: 'Learn Story First, Then Play',
    storyWhilePlaying: 'Learn Story While Playing',
    teamCredit: 'Ch Sri Tejaswini – Founder & CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO',
    recommendedForYou: 'Recommended for You',
    allGames: 'All Games',
    yourProgress: 'Your Progress',
    best: 'Best',
    plays: 'plays',
    continueBtn: 'Continue',
    leaderboard: 'Leaderboard',
    competeWin: 'Compete & Win',
    welcomeBack: 'Welcome back',
    globalLeagues: 'Global Leagues',
    bronzeLeague: 'Bronze League',
    silverLeague: 'Silver League',
    dharmicGoldLeague: 'Dharmic Gold League',
    bronzeLeagueDesc: 'Begin your journey — earn XP to climb',
    silverLeagueDesc: 'Rising warriors compete for glory',
    dharmicGoldLeagueDesc: 'Elite champions of divine knowledge',
    selectTopic: 'Select Topic',
    bhagavadGita: 'Bhagavad Gita',
    mahabharatEpics: 'Mahabharat Epics',
    bibleHistory: 'Bible History',
    quranNarratives: 'Quran Narratives',
    top10Players: 'Top 10 Players',
    rank: 'Rank',
    player: 'Player',
    activeLevel: 'Active Level',
    divineXP: 'Divine XP',
    you: 'You',
    leagueProgress: 'League Progress',
    climbToNext: 'Climb to Next Division',
    yourDivision: 'Your Division',
    division: 'Division',
    topic: 'Topic',
    discover: 'Discover',
    cinematicCharacters: 'Cinematic Characters',
    exploreTemples: 'Explore Sacred Places',
    quoteOfTheDay: 'Quote of the Day',
    factsAndMyths: 'Facts & Myths',
    hiddenStories: 'Hidden Stories',
    characterTraits: 'Traits',
    templeFact: 'Did You Know?',
    fact: 'Fact',
    myth: 'Myth',
    storyMoral: 'Moral',
    exploreLocation: 'Explore Location',
  },
  te: {
    games: 'ఆటలు',
    ranks: 'ర్యాంకులు',
    leagues: 'లీగ్‌లు',
    subjects: 'విషయాలు',
    profile: 'ప్రొఫైల్',
    mitra: 'మిత్ర',
    signOut: 'సైన్ అవుట్',
    heroTitle: 'లీల',
    heroSubtitle: 'ప్రాచీన వారసత్వం. ఆధునిక ఆట.',
    heroTagline: 'ఏఐ-ఆధారిత సాంస్కృతిక గేమింగ్',
    heroDescription: 'భారతీయ వారసత్వాన్ని వ్యక్తిగత ఇంటరాక్టివ్ అనుభవాలుగా మార్చే ఒక మిగిలిన 3D-శైలి సాంస్కృతిక గేమింగ్ వ్యవస్థ. మిత్రను కలవండి — మీతో మాట్లాడే మీ ఏఐ గైడ్.',
    startJourney: 'మీ ప్రయాణం ప్రారంభించండి',
    avatarStyleTitle: 'మీ అవతార్ శైలిని ఎంచుకోండి',
    fusionAnime: 'ఫ్యూజన్ యానిమే శైలి',
    fusionAnimeDesc: 'యానిమే-ప్రేరిత సాంస్కృతిక పాత్రలు',
    chibiCultural: 'చిబి సాంస్కృతిక శైలి',
    chibiCulturalDesc: 'చిన్న సాంస్కృతిక అవతార్‌లు',
    classicMythological: 'క్లాసిక్ పౌరాణిక శైలి',
    classicMythologicalDesc: 'సాంప్రదాయ దైవిక యోధుల రూపాలు',
    triviaHub: 'ట్రివియా హబ్',
    puzzleQuests: 'పజిల్ క్వెస్ట్‌లు',
    epicCombat: 'ఎపిక్ కంబాట్ ఆటలు',
    epicCombatArena: 'ఎపిక్ కంబాట్ అరేనా',
    arjunasArchery: 'అర్జున ధనుస్సు క్వెస్ట్',
    arjunasArcheryDesc: 'తేలియాడే లక్ష్యాలపై బాణాలు వేయండి',
    bheemasKusti: 'భీమ కుస్తీ రంబుల్',
    bheemasKustiDesc: 'యాక్షన్ కార్డులతో రెజలింగ్ పోరాటం',
    playNow: 'ఇప్పుడు ఆడండి',
    score: 'స్కోర్',
    streak: 'స్ట్రీక్',
    arrows: 'బాణాలు',
    tapToShoot: 'గురి చేసి కాల్చడానికి నొక్కండి',
    targetsHit: 'లక్ష్యాలు తగిలించారు',
    maceStrike: 'గదా దాడి',
    powerSlam: 'పవర్ స్లామ్',
    dharmicShield: 'ధర్మ డాలు',
    opponentHealth: 'ప్రత్యర్థి',
    yourHealth: 'మీరు',
    victory: 'విజయం!',
    defeat: 'ఓటమి',
    playAgain: 'మళ్లీ ఆడండి',
    backToArena: 'అరేనాకు తిరిగి',
    mitraGreeting: 'నమస్తే! నేను మిత్ర, మీ ఏఐ గైడ్. మీ ప్రొఫైల్ సెటప్ చేయుదాం.',
    enterName: 'నేను మిమ్మల్ని ఏమి పిలవాలి?',
    enterAge: 'మీ వయస్సు ఎంత?',
    selectLanguage: 'ఏ భాష మీకు ఇష్టం?',
    selectGenres: 'ఏ రకం ఆటలు మీకు ఇష్టం?',
    selectTopics: 'ఏ అంశాలు మీకు ఆసక్తికరం?',
    next: 'తదుపరి',
    back: 'వెనుకకు',
    finish: 'సెటప్ పూర్తి',
    levelUpEn: 'Hey! You have been leveled up! Congratulations!',
    levelUpTe: 'హేయ్! మీరు లెవెల్ అప్ అయ్యారు! అభినందనలు!',
    playerLevel: 'ప్లేయర్ లెవెల్',
    totalPoints: 'మొత్తం పాయింట్లు',
    dayStreak: 'రోజు స్ట్రీక్',
    status: 'స్థితి',
    readingAge: 'చదివే వయస్సు',
    preferences: 'మీ ప్రాధాన్యతలు',
    gamingStyle: 'గేమింగ్ శైలి',
    interests: 'ఆసక్తులు',
    preferredTopics: 'ఇష్టమైన అంశాలు',
    updateWithMitra: 'మిత్రతో అప్‌డేట్ చేయండి',
    themeSettings: 'థీమ్ సెట్టింగ్‌లు',
    avatarInventory: 'అవతార్ ఇన్వెంటరీ',
    learningPreference: 'లెర్నింగ్ ప్రాధాన్యత',
    storyFirst: 'ముందు కథ నేర్చుకోండి, తర్వాత ఆడండి',
    storyWhilePlaying: 'ఆడుతూ కథ నేర్చుకోండి',
    teamCredit: 'Ch Sri Tejaswini – వ్యవస్థాపకుడు & CEO · B. Lahari Priya – HOR · K. Sai Siddhu – CPO · D. Satya Santosh – CCO',
    recommendedForYou: 'మీకు సిఫారసు చేయబడింది',
    allGames: 'అన్ని ఆటలు',
    yourProgress: 'మీ పురోగతి',
    best: 'ఉత్తమ',
    plays: 'ఆడినవి',
    continueBtn: 'కొనసాగించు',
    leaderboard: 'లీడర్‌బోర్డ్',
    competeWin: 'పోటీ చేసి గెలవండి',
    welcomeBack: 'తిరిగి స్వాగతం',
    globalLeagues: 'గ్లోబల్ లీగ్‌లు',
    bronzeLeague: 'బ్రాంజ్ లీగ్',
    silverLeague: 'సిల్వర్ లీగ్',
    dharmicGoldLeague: 'ధర్మ గోల్డ్ లీగ్',
    bronzeLeagueDesc: 'మీ ప్రయాణం ప్రారంభించండి — XP సంపాదించండి',
    silverLeagueDesc: 'ఎదుగుతున్న యోధులు గౌరవం కోసం పోటీ',
    dharmicGoldLeagueDesc: 'దివ్య జ్ఞానం యొక్క ఉన్నత ఛాంపియన్‌లు',
    selectTopic: 'అంశం ఎంచుకోండి',
    bhagavadGita: 'భగవద్గీత',
    mahabharatEpics: 'మహాభారత ఇతిహాసాలు',
    bibleHistory: 'బైబిల్ చరిత్ర',
    quranNarratives: 'ఖురాన్ కథలు',
    top10Players: 'టాప్ 10 ఆటగాళ్లు',
    rank: 'ర్యాంక్',
    player: 'ఆటగాడు',
    activeLevel: 'చురుకు స్థాయి',
    divineXP: 'దివ్య XP',
    you: 'మీరు',
    leagueProgress: 'లీగ్ పురోగతి',
    climbToNext: 'తదుపరి విభాగానికి ఎదగండి',
    yourDivision: 'మీ విభాగం',
    division: 'విభాగం',
    topic: 'అంశం',
    discover: 'కనుగొనండి',
    cinematicCharacters: 'సినిమాటిక్ పాత్రలు',
    exploreTemples: 'పవిత్ర స్థలాలను అన్వేషించండి',
    quoteOfTheDay: 'నేటి సూక్తి',
    factsAndMyths: 'వాస్తవాలు & పుకలు',
    hiddenStories: 'దాగిన కథలు',
    characterTraits: 'లక్షణాలు',
    templeFact: 'మీకు తెలుసా?',
    fact: 'వాస్తవం',
    myth: 'పుక',
    storyMoral: 'నీతి',
    exploreLocation: 'స్థలాన్ని అన్వేషించండి',
  },
};

export function getTranslation(lang: Language, key: keyof TranslationKey): string {
  return translations[lang]?.[key] || translations.en[key] || key;
}
