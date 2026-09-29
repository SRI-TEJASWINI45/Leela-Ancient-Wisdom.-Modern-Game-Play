import { BookOpen, Calculator, Atom, FlaskConical, Leaf, PenTool, Lock, Sparkles, ArrowRight } from 'lucide-react';

interface SubjectsProps {
  onNavigate: (page: 'games') => void;
}

const subjects = [
  {
    icon: BookOpen,
    name: 'Indian Heritage',
    status: 'available',
    description: 'History, mythology, architecture, and traditions — the core of Leela.',
    topics: ['Mahabharata', 'Chola Empire', 'Snake Mythology', 'Vedic Science'],
  },
  {
    icon: Calculator,
    name: 'Mathematics',
    status: 'coming-soon',
    description: 'Vedic math meets modern puzzles. Algebra, geometry, and arithmetic as games.',
    topics: ['Vedic Mathematics', 'Algebra Quest', 'Geometry Lab'],
  },
  {
    icon: Atom,
    name: 'Physics',
    status: 'coming-soon',
    description: 'From Vedic astronomy to modern mechanics — physics through interactive play.',
    topics: ['Vedic Astronomy', 'Motion & Forces', 'Light & Optics'],
  },
  {
    icon: FlaskConical,
    name: 'Chemistry',
    status: 'coming-soon',
    description: 'Elements, reactions, and the ancient science of metals and alchemy.',
    topics: ['Rasayana Shastra', 'Periodic Table', 'Chemical Reactions'],
  },
  {
    icon: Leaf,
    name: 'Biology',
    status: 'coming-soon',
    description: 'Life sciences inspired by India\'s biodiversity and Ayurvedic knowledge.',
    topics: ['Ayurveda Basics', 'Ecosystems', 'Human Body'],
  },
  {
    icon: PenTool,
    name: 'Literature',
    status: 'coming-soon',
    description: 'Sanskkrit poetry, classical literature, and storytelling traditions.',
    topics: ['Sanskrit Shlokas', 'Classical Poetry', 'Storytelling Arts'],
  },
];

export default function Subjects({ onNavigate }: SubjectsProps) {
  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-5xl mx-auto p-4 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          Subject Modules
        </h1>
        <p className="text-sm text-muted max-w-xl">
          Leela's AI personalization extends beyond heritage. The same engine that crafts your
          mythology games will power every subject — turning each topic into a game worth playing.
        </p>
      </div>

      {/* Subject grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subj, i) => (
          <div
            key={subj.name}
            className="surface p-6 ornament-border transition-transform hover:scale-[1.02] animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-surface-alt)' }}>
                <subj.icon size={24} style={{ color: 'var(--color-primary)' }} />
              </div>
              {subj.status === 'available' ? (
                <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--color-success)', color: 'var(--color-bg)' }}>
                  Available
                </span>
              ) : (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: 'var(--color-surface-alt)', color: 'var(--color-text-muted)' }}>
                  <Lock size={10} />
                  Soon
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
              {subj.name}
            </h3>
            <p className="text-sm text-muted mb-4 leading-relaxed">{subj.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {subj.topics.map((topic) => (
                <span key={topic} className="px-2 py-1 rounded-md text-xs"
                  style={{
                    background: 'var(--color-surface-alt)',
                    color: 'var(--color-text-muted)',
                  }}>
                  {topic}
                </span>
              ))}
            </div>

            {subj.status === 'available' ? (
              <button onClick={() => onNavigate('games')} className="btn-primary w-full justify-center text-sm">
                <Sparkles size={16} />
                Play Now
              </button>
            ) : (
              <div className="w-full text-center py-2 text-xs text-muted opacity-60">
                In Development
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vision banner */}
      <div className="surface p-6 mt-8 ornament-border text-center animate-fade-in-up">
        <Sparkles size={24} style={{ color: 'var(--color-primary)' }} className="mx-auto mb-3" />
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
          One AI Engine. Every Subject.
        </h2>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Mitra's three-tier AI architecture — The Profiler, The Procedural Content Layer, and The
          Engagement Predictor — will power every subject module. Your gaming style and learning
          preferences carry across, so every game feels like it was made just for you.
        </p>
      </div>
    </div>
  );
}
