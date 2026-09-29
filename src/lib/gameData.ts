export interface GameLevel {
  id: number;
  title: string;
  subtitle: string;
  story: string;
  historicalNote: string;
  themeIcon: string;
  themeColor: string;
  challenge: {
    type: 'choice' | 'sequence' | 'word';
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: number;
  category: string;
  religion: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface PuzzleSet {
  id: number;
  theme: string;
  religion: string;
  pairs: { term: string; meaning: string }[];
}

// Adventure levels — multi-religion snake mythology across Indian traditions
export const adventureLevels: GameLevel[] = [
  {
    id: 1,
    title: 'The Serpent of the River',
    subtitle: 'Kaliya Naga — Yamuna River (Hindu)',
    story: 'The Yamuna river had turned dark and poisonous. Villagers feared the water, for a great serpent named Kaliya had made it his home. His venom killed fish, birds, and even the trees along the bank. The people prayed for deliverance.',
    historicalNote: 'The Kaliya Naga story appears in the Bhagavata Purana (10th Canto, Chapter 16). It symbolizes the purification of nature\'s poisons by divine intervention. The Yamuna, one of India\'s holiest rivers, is central to Krishna mythology.',
    themeIcon: '🐍',
    themeColor: '#6bbf59',
    challenge: {
      type: 'choice',
      question: 'Why had the Yamuna river become dangerous?',
      options: [
        'A drought had dried up the water',
        'The serpent Kaliya had poisoned it with his venom',
        'An enemy army had polluted it',
        'A curse from a sage made it undrinkable',
      ],
      correct: 1,
      explanation: 'Kaliya Naga, a great serpent with toxic venom, had taken residence in the Yamuna, making its waters poisonous to all life.',
    },
  },
  {
    id: 2,
    title: 'The Dance on the Hood',
    subtitle: 'Krishna Subdues Kaliya (Hindu)',
    story: 'Young Krishna leapt into the poisoned river. Kaliya rose with a hundred hoods, each fangs bared. But Krishna did not fight with weapons — he danced upon the serpent\'s heads, pressing them down with the weight of the entire universe. Kaliya understood he was defeated.',
    historicalNote: 'The dance on Kaliya\'s hoods is one of the most depicted scenes in Indian classical art — from Pattachitra paintings of Odisha to Tanjore paintings of Tamil Nadu. It represents the triumph of divine order over chaotic natural forces.',
    themeIcon: '💃',
    themeColor: '#e8b04d',
    challenge: {
      type: 'choice',
      question: 'How did Krishna defeat Kaliya without killing him?',
      options: [
        'He used a divine weapon to behead him',
        'He danced on Kaliya\'s hoods, subduing him',
        'He asked Kaliya to leave peacefully',
        'He poisoned Kaliya with his own venom',
      ],
      correct: 1,
      explanation: 'Krishna danced on the serpent\'s hoods — a symbolic act of divine dominance without destruction, teaching that true power can subdue without killing.',
    },
  },
  {
    id: 3,
    title: 'The Serpent King of the Desert',
    subtitle: 'Takshaka in the Mahabharata (Hindu)',
    story: 'In the great epic Mahabharata, the Naga king Takshaka played a pivotal role. He was the serpent who bit King Parikshit, triggering the famous serpent sacrifice. Later, Takshaka faced the wrath of Parikshit\'s son Janamejaya, who began a massive sacrifice to destroy all snakes.',
    historicalNote: 'The story of Takshaka and the serpent sacrifice (Sarpa Satra) appears in the Adi Parva of the Mahabharata. It reflects the ancient tension between humans and snakes, and the eventual peace treaty (through the sage Astika) that protected both.',
    themeIcon: '👑',
    themeColor: '#7d8aff',
    challenge: {
      type: 'choice',
      question: 'Who stopped the serpent sacrifice and saved the snakes from destruction?',
      options: [
        'Krishna himself',
        'The sage Astika',
        'Takshaka surrendered',
        'Arjuna intervened',
      ],
      correct: 1,
      explanation: 'The sage Astika, half-human and half-Naga, persuaded King Janamejaya to stop the sacrifice, saving all serpents — a story of peace between humans and nature.',
    },
  },
  {
    id: 4,
    title: 'Shesha — The Cosmic Serpent',
    subtitle: 'The Bearer of Worlds (Hindu)',
    story: 'Far from Kaliya\'s river, there exists another serpent — Shesha, the king of all Nagas. Unlike Kaliya, Shesha is not feared but revered. He floats upon the cosmic ocean, serving as the bed upon which Lord Vishnu rests between cycles of creation. His thousand hoods glow with the light of a thousand suns.',
    historicalNote: 'Shesha Naga represents eternity and stability in Hindu cosmology. The concept of a cosmic serpent supporting the universe appears in multiple Puranas. Shesha is also called Ananta (the endless one), representing infinite time.',
    themeIcon: '🌌',
    themeColor: '#5dccc7',
    challenge: {
      type: 'choice',
      question: 'What is Shesha Naga\'s role in Hindu cosmology?',
      options: [
        'He guards the gates of heaven',
        'He serves as Vishnu\'s resting place between cosmic cycles',
        'He creates storms and rain',
        'He carries the Vedas on his hoods',
      ],
      correct: 1,
      explanation: 'Shesha (Ananta) floats on the cosmic ocean and serves as the couch for Lord Vishnu during the periods between creation and dissolution — symbolizing infinite endurance.',
    },
  },
  {
    id: 5,
    title: 'The Serpent Saint of Jainism',
    subtitle: 'Parshvanatha and the Naga (Jain)',
    story: 'Long before the Buddha, a young prince named Parshvanatha renounced his kingdom to seek truth. While meditating, a great storm arose and a mighty Naga serpent named Dharanendra rose from the earth to shield him with his hood — just as a serpent had once sheltered the Buddha from rain. In Jain tradition, serpents are protectors of the enlightened.',
    historicalNote: 'Parshvanatha, the 23rd Tirthankara of Jainism (c. 872–772 BCE), is often depicted with a multi-hooded Naga canopy. The Dharanendra legend reflects the shared reverence for serpents across Hindu, Jain, and Buddhist traditions — a pan-Indian cultural thread.',
    themeIcon: '🧘',
    themeColor: '#e85d7a',
    challenge: {
      type: 'choice',
      question: 'In Jain tradition, what did the Naga serpent Dharanendra do for Parshvanatha?',
      options: [
        'He attacked Parshvanatha during meditation',
        'He shielded Parshvanatha from a storm with his hood',
        'He carried Parshvanatha across a river',
        'He gave Parshvanatha a divine weapon',
      ],
      correct: 1,
      explanation: 'Dharanendra, a Naga king, rose from the earth to shield Parshvanatha from a fierce storm with his multi-hooded canopy — a symbol of nature protecting the enlightened.',
    },
  },
  {
    id: 6,
    title: 'The Naga Legacy Across India',
    subtitle: 'Serpents in Indian Civilization (Pan-Indian)',
    story: 'The Nagas are not just myth. The Naga dynasty ruled parts of India for centuries. Snake worship continues across India — during Nag Panchami, when serpents are honored as protectors of the land. From the snake gods of Kerala\'s sacred groves to the serpent carvings at Buddhist Sanchi, the Naga legacy unites every Indian tradition.',
    historicalNote: 'The Naga cultural complex spans from ancient India to Southeast Asia. The Naga kings of Champa (Vietnam), the serpents carved at Angkor Wat (Cambodia), and the snake gods of Kerala\'s sacred groves all trace back to this shared heritage — Hindu, Jain, and Buddhist alike.',
    themeIcon: '🇮🇳',
    themeColor: '#e8b04d',
    challenge: {
      type: 'choice',
      question: 'Which Indian festival is dedicated to the worship of serpents across all traditions?',
      options: ['Diwali', 'Holi', 'Nag Panchami', 'Onam'],
      correct: 2,
      explanation: 'Nag Panchami is celebrated across India to honor serpents as divine protectors. It reflects the ancient reverence for Nagas as guardians of water sources and the land — shared across Hindu, Jain, and Buddhist traditions.',
    },
  },
];

// Quiz questions — spanning all religions and cultures of India
export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    category: 'Mahabharata',
    religion: 'Hindu',
    question: 'In the Mahabharata, who was the charioteer of Arjuna during the Kurukshetra war?',
    options: ['Bhishma', 'Krishna', 'Dronacharya', 'Karna'],
    correct: 1,
    explanation: 'Lord Krishna served as Arjuna\'s charioteer and delivered the Bhagavad Gita on the battlefield of Kurukshetra.',
  },
  {
    id: 2,
    category: 'Architecture',
    religion: 'Hindu',
    question: 'The Brihadeeswara Temple, a UNESCO World Heritage site, was built by which dynasty?',
    options: ['Chola Dynasty', 'Pandya Dynasty', 'Chera Dynasty', 'Pallava Dynasty'],
    correct: 0,
    explanation: 'Raja Raja Chola I built the Brihadeeswara Temple in Thanjavur around 1010 CE — a masterpiece of Chola architecture.',
  },
  {
    id: 3,
    category: 'Sufi Tradition',
    religion: 'Muslim',
    question: 'Who is the famous Sufi saint whose dargah in Ajmer is visited by people of all faiths?',
    options: ['Nizamuddin Auliya', 'Moinuddin Chishti', 'Fariduddin Ganjshakar', 'Baba Farid'],
    correct: 1,
    explanation: 'Khwaja Moinuddin Chishti\'s dargah in Ajmer, Rajasthan, is one of India\'s most visited pilgrimage sites, welcoming people of all religions.',
  },
  {
    id: 4,
    category: 'Sikh Heritage',
    religion: 'Sikh',
    question: 'The Golden Temple (Harmandir Sahib) is located in which Indian city?',
    options: ['Amritsar', 'Anandpur Sahib', 'Patna', 'Nanded'],
    correct: 0,
    explanation: 'The Golden Temple, the holiest shrine of Sikhism, is in Amritsar, Punjab. Its foundation was laid by the Sufi saint Sai Mian Mir.',
  },
  {
    id: 5,
    category: 'Jain Heritage',
    religion: 'Jain',
    question: 'The colossal statue of Gommateshwara (Bahubali) stands at which Jain pilgrimage site?',
    options: ['Palitana', 'Shravanabelagola', 'Ranakpur', 'Mount Abu'],
    correct: 1,
    explanation: 'The 57-foot monolithic statue of Gommateshwara at Shravanabelagola, Karnataka, was carved in 983 CE — one of the largest free-standing statues in the world.',
  },
  {
    id: 6,
    category: 'Buddhist Heritage',
    religion: 'Buddhist',
    question: 'Where did the Buddha attain enlightenment under the Bodhi tree?',
    options: ['Sarnath', 'Bodh Gaya', 'Lumbini', 'Kushinagar'],
    correct: 1,
    explanation: 'Siddhartha Gautama attained enlightenment at Bodh Gaya, Bihar, under the Bodhi tree. The Mahabodhi Temple there is a UNESCO World Heritage Site.',
  },
  {
    id: 7,
    category: 'Christian Heritage',
    religion: 'Christian',
    question: 'St. Thomas, one of the twelve apostles, is believed to have arrived in India in which century?',
    options: ['1st century CE', '3rd century CE', '5th century CE', '7th century CE'],
    correct: 0,
    explanation: 'St. Thomas is believed to have arrived in Kerala in 52 CE, making Christianity one of the oldest religions in India — older than in many European countries.',
  },
  {
    id: 8,
    category: 'Vedic Science',
    religion: 'Hindu',
    question: 'Which ancient Indian text contains early references to the decimal number system and zero?',
    options: ['Rig Veda', 'Atharva Veda', 'Baudhayana Sulba Sutra', 'Arthashastra'],
    correct: 2,
    explanation: 'The Baudhayana Sulba Sutra (c. 800 BCE) contains early mathematical concepts including the value of pi and geometric principles.',
  },
  {
    id: 9,
    category: 'Mughal Heritage',
    religion: 'Muslim',
    question: 'The Taj Mahal was commissioned by which Mughal emperor as a mausoleum for his wife?',
    options: ['Akbar', 'Shah Jahan', 'Aurangzeb', 'Babur'],
    correct: 1,
    explanation: 'Shah Jahan commissioned the Taj Mahal in 1632 in memory of his wife Mumtaz Mahal. It is a UNESCO World Heritage Site and one of the Seven Wonders.',
  },
  {
    id: 10,
    category: 'Sikh Heritage',
    religion: 'Sikh',
    question: 'Who founded the Khalsa, the collective body of initiated Sikhs, in 1699?',
    options: ['Guru Nanak', 'Guru Gobind Singh', 'Guru Tegh Bahadur', 'Guru Arjan'],
    correct: 1,
    explanation: 'Guru Gobind Singh, the tenth Sikh Guru, founded the Khalsa on Vaisakhi 1699, establishing the Sikh warrior tradition of equality and justice.',
  },
  {
    id: 11,
    category: 'Buddhist Heritage',
    religion: 'Buddhist',
    question: 'The Ajanta Caves, famous for Buddhist paintings, were created during which period?',
    options: ['Mauryan period only', 'Gupta period only', '2nd century BCE to 5th century CE', 'Mughal period'],
    correct: 2,
    explanation: 'The Ajanta Caves were built in two phases — starting around the 2nd century BCE and continuing through the 5th century CE under the Vakataka dynasty.',
  },
  {
    id: 12,
    category: 'Indian Freedom Struggle',
    religion: 'Pan-Indian',
    question: 'Who led the Dandi Salt March in 1930, a pivotal moment in India\'s independence movement?',
    options: ['Bhagat Singh', 'Mahatma Gandhi', 'Subhas Chandra Bose', 'Jawaharlal Nehru'],
    correct: 1,
    explanation: 'Mahatma Gandhi led the 240-mile Dandi Salt March in 1930, a nonviolent protest against British salt tax that united Indians of all faiths.',
  },
];

// Puzzle sets — spanning all Indian traditions
export const puzzleSets: PuzzleSet[] = [
  {
    id: 1,
    theme: 'Sacred Places of India',
    religion: 'Pan-Indian',
    pairs: [
      { term: 'Golden Temple', meaning: 'Holiest Sikh shrine in Amritsar' },
      { term: 'Bodh Gaya', meaning: 'Where Buddha attained enlightenment' },
      { term: 'Ajmer Dargah', meaning: 'Sufi saint Moinuddin Chishti\'s shrine' },
      { term: 'Shravanabelagola', meaning: 'Jain statue of Gommateshwara' },
    ],
  },
  {
    id: 2,
    theme: 'Epic Characters',
    religion: 'Pan-Indian',
    pairs: [
      { term: 'Arjuna', meaning: 'Greatest archer of the Pandavas' },
      { term: 'Karna', meaning: 'Son of Surya, rival of Arjuna' },
      { term: 'Ravana', meaning: 'Ten-headed king of Lanka in Ramayana' },
      { term: 'Hanuman', meaning: 'Devoted servant of Lord Rama' },
    ],
  },
  {
    id: 3,
    theme: 'Sacred Rivers',
    religion: 'Pan-Indian',
    pairs: [
      { term: 'Ganga', meaning: 'River descended from heaven' },
      { term: 'Yamuna', meaning: 'River where Krishna played' },
      { term: 'Saraswati', meaning: 'Lost river of the Vedas' },
      { term: 'Narmada', meaning: 'River that flows westward' },
    ],
  },
  {
    id: 4,
    theme: 'Great Teachers of India',
    religion: 'Pan-Indian',
    pairs: [
      { term: 'Guru Nanak', meaning: 'Founder of Sikhism (1469)' },
      { term: 'Mahavira', meaning: '24th Jain Tirthankara' },
      { term: 'Adi Shankara', meaning: 'Advaita Vedanta philosopher' },
      { term: 'Rumi', meaning: 'Persian Sufi poet beloved in India' },
    ],
  },
];

export interface GameInfo {
  id: string;
  title: string;
  description: string;
  icon: string;
  style: 'adventure' | 'competitive' | 'casual';
  recommendedFor: string[];
  color: string;
  themeIcon: string;
}

export const games: GameInfo[] = [
  {
    id: 'adventure-book',
    title: 'Serpent Saga',
    description: 'An interactive story-book adventure through snake mythology across Hindu, Jain, and Buddhist traditions. Each level reveals real history.',
    icon: 'BookOpen',
    style: 'adventure',
    recommendedFor: ['adventure', 'casual'],
    color: 'emerald',
    themeIcon: '🐍',
  },
  {
    id: 'quiz-arena',
    title: 'Heritage Arena',
    description: 'A fast-paced timed trivia challenge spanning all of India — Hindu, Muslim, Sikh, Jain, Buddhist, and Christian heritage.',
    icon: 'Swords',
    style: 'competitive',
    recommendedFor: ['competitive', 'quiz'],
    color: 'amber',
    themeIcon: '⚔️',
  },
  {
    id: 'puzzle-match',
    title: 'Vedic Match',
    description: 'A relaxed matching puzzle. Pair sacred places, epic characters, rivers, and great teachers from across all Indian traditions.',
    icon: 'Puzzle',
    style: 'casual',
    recommendedFor: ['casual', 'puzzle'],
    color: 'sky',
    themeIcon: '🧩',
  },
];

export function recommendGames(userStyle: string): GameInfo[] {
  const styleMap: Record<string, string[]> = {
    competitive: ['quiz-arena', 'adventure-book', 'puzzle-match'],
    casual: ['adventure-book', 'puzzle-match', 'quiz-arena'],
    puzzle: ['puzzle-match', 'adventure-book', 'quiz-arena'],
    quiz: ['quiz-arena', 'puzzle-match', 'adventure-book'],
    adventure: ['adventure-book', 'quiz-arena', 'puzzle-match'],
  };
  const order = styleMap[userStyle] || styleMap.casual;
  return order.map((id) => games.find((g) => g.id === id)!).filter(Boolean);
}
