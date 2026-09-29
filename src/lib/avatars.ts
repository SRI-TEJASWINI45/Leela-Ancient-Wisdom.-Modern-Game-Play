export type AvatarCategory = 'animals' | 'flowers' | 'warriors' | 'symbols';

export interface Avatar {
  id: string;
  label: string;
  category: AvatarCategory;
  emoji: string;
  gradient: string;
}

export const avatars: Avatar[] = [
  // Animals
  { id: 'lion', label: 'Lion', category: 'animals', emoji: '🦁', gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)' },
  { id: 'elephant', label: 'Elephant', category: 'animals', emoji: '🐘', gradient: 'linear-gradient(135deg, #a8a8b8, #6b6b80)' },
  { id: 'peacock', label: 'Peacock', category: 'animals', emoji: '🦚', gradient: 'linear-gradient(135deg, #4dbf8a, #2a8a5e)' },
  { id: 'tiger', label: 'Tiger', category: 'animals', emoji: '🐯', gradient: 'linear-gradient(135deg, #ff8c42, #d45e00)' },
  { id: 'cobra', label: 'Cobra', category: 'animals', emoji: '🐍', gradient: 'linear-gradient(135deg, #6bbf59, #2e7d32)' },
  { id: 'cow', label: 'Sacred Cow', category: 'animals', emoji: '🐄', gradient: 'linear-gradient(135deg, #e8d4b0, #b8a080)' },
  { id: 'owl', label: 'Owl', category: 'animals', emoji: '🦉', gradient: 'linear-gradient(135deg, #8b7355, #5c4a3a)' },
  { id: 'garuda', label: 'Garuda Eagle', category: 'animals', emoji: '🦅', gradient: 'linear-gradient(135deg, #e8b04d, #a06000)' },
  // Flowers
  { id: 'lotus', label: 'Lotus', category: 'flowers', emoji: '🪷', gradient: 'linear-gradient(135deg, #ff6ba6, #d4337a)' },
  { id: 'rose', label: 'Rose', category: 'flowers', emoji: '🌹', gradient: 'linear-gradient(135deg, #e85d5d, #b03030)' },
  { id: 'sunflower', label: 'Sunflower', category: 'flowers', emoji: '🌻', gradient: 'linear-gradient(135deg, #ffd54d, #e8a800)' },
  { id: 'tulsi', label: 'Tulsi Leaf', category: 'flowers', emoji: '🌿', gradient: 'linear-gradient(135deg, #6bbf59, #388e3c)' },
  // Warriors & Heroes
  { id: 'arjuna', label: 'Arjuna', category: 'warriors', emoji: '🏹', gradient: 'linear-gradient(135deg, #4dbf8a, #1a6e4a)' },
  { id: 'karna', label: 'Karna', category: 'warriors', emoji: '⚔️', gradient: 'linear-gradient(135deg, #e8b04d, #8a5a00)' },
  { id: 'bhishma', label: 'Bhishma', category: 'warriors', emoji: '🛡️', gradient: 'linear-gradient(135deg, #7d8aff, #3a3a8c)' },
  { id: 'rani', label: 'Rani Lakshmibai', category: 'warriors', emoji: '🐎', gradient: 'linear-gradient(135deg, #e85d7a, #8a2a4a)' },
  { id: 'shivaji', label: 'Shivaji', category: 'warriors', emoji: '🗡️', gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)' },
  { id: 'tipu', label: 'Tipu Sultan', category: 'warriors', emoji: '🔫', gradient: 'linear-gradient(135deg, #4dbf8a, #1a5e3a)' },
  // Symbols
  { id: 'om', label: 'Om', category: 'symbols', emoji: '🕉️', gradient: 'linear-gradient(135deg, #e8b04d, #a06000)' },
  { id: 'khanda', label: 'Khanda', category: 'symbols', emoji: '⚔️', gradient: 'linear-gradient(135deg, #7d8aff, #3a3a8c)' },
  { id: 'crescent', label: 'Crescent', category: 'symbols', emoji: '🌙', gradient: 'linear-gradient(135deg, #5dccc7, #2a7a76)' },
  { id: 'cross', label: 'Cross', category: 'symbols', emoji: '✝️', gradient: 'linear-gradient(135deg, #e85d5d, #8a2a2a)' },
  { id: 'dharmachakra', label: 'Dharmachakra', category: 'symbols', emoji: '☸️', gradient: 'linear-gradient(135deg, #e8b04d, #8a5a00)' },
  { id: 'ashoka', label: 'Ashoka Pillar', category: 'symbols', emoji: '🦁', gradient: 'linear-gradient(135deg, #a8a8b8, #5c5c70)' },
];

export function getAvatar(id: string): Avatar {
  return avatars.find((a) => a.id === id) || avatars[0];
}

export const avatarCategories: { key: AvatarCategory; label: string; icon: string }[] = [
  { key: 'animals', label: 'Animals', icon: '🦁' },
  { key: 'flowers', label: 'Flowers', icon: '🪷' },
  { key: 'warriors', label: 'Warriors & Heroes', icon: '🏹' },
  { key: 'symbols', label: 'Symbols', icon: '🕉️' },
];
