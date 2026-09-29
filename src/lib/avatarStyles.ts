export type AvatarStyle = 'fusion-anime' | 'chibi-cultural' | 'classic-mythological';

export interface AvatarStyleInfo {
  id: AvatarStyle;
  labelEn: string;
  labelTe: string;
  descEn: string;
  descTe: string;
  icon: string;
  gradient: string;
  preview: string;
}

export const avatarStyles: AvatarStyleInfo[] = [
  {
    id: 'fusion-anime',
    labelEn: 'Fusion Anime Style',
    labelTe: 'ఫ్యూజన్ యానిమే శైలి',
    descEn: 'Dynamic anime-inspired cultural characters',
    descTe: 'యానిమే-ప్రేరిత సాంస్కృతిక పాత్రలు',
    icon: '⚔️',
    gradient: 'linear-gradient(135deg, #6d7dff, #3a3a8c)',
    preview: '🏹',
  },
  {
    id: 'chibi-cultural',
    labelEn: 'Chibi Cultural Style',
    labelTe: 'చిబి సాంస్కృతిక శైలి',
    descEn: 'Cute miniature cultural avatars',
    descTe: 'చిన్న సాంస్కృతిక అవతార్‌లు',
    icon: '🪷',
    gradient: 'linear-gradient(135deg, #e8b04d, #c47a1e)',
    preview: '🦁',
  },
  {
    id: 'classic-mythological',
    labelEn: 'Classic Mythological Style',
    labelTe: 'క్లాసిక్ పౌరాణిక శైలి',
    descEn: 'Traditional divine warrior aesthetics',
    descTe: 'సాంప్రదాయ దైవిక యోధుల రూపాలు',
    icon: '🕉️',
    gradient: 'linear-gradient(135deg, #ff7a3d, #c44a1e)',
    preview: '👑',
  },
];

export function getAvatarStyle(id: string): AvatarStyleInfo {
  return avatarStyles.find((a) => a.id === id) || avatarStyles[0];
}

// 11-level progression system
export interface LevelInfo {
  level: number;
  titleEn: string;
  titleTe: string;
  decoration: string;
  unlockEn: string;
  unlockTe: string;
}

export const levelSystem: LevelInfo[] = [
  { level: 1, titleEn: 'Seeker', titleTe: 'అన్వేషకుడు', decoration: '🌱', unlockEn: 'Base avatar unlocked', unlockTe: 'ప్రాథమిక అవతార్ అన్‌లాక్' },
  { level: 2, titleEn: 'Apprentice', titleTe: 'శిష్యుడు', decoration: '🌿', unlockEn: 'Leaf ornament added', unlockTe: 'ఆకు ఆభరణం జతచేయబడింది' },
  { level: 3, titleEn: 'Disciple', titleTe: 'అనుచరుడు', decoration: '🍃', unlockEn: 'Floral garland unlocked', unlockTe: 'పుష్ప హారం అన్‌లాక్' },
  { level: 4, titleEn: 'Warrior', titleTe: 'యోధుడు', decoration: '⚔️', unlockEn: 'Arm bands unlocked', unlockTe: 'బాహుబంధనాలు అన్‌లాక్' },
  { level: 5, titleEn: 'Champion', titleTe: 'విజేత', decoration: '🛡️', unlockEn: 'Shield emblem added', unlockTe: 'డాలు చిహ్నం జతచేయబడింది' },
  { level: 6, titleEn: 'Knight', titleTe: 'రైడర్', decoration: '🏅', unlockEn: 'Chest plate unlocked', unlockTe: 'ఛాతి పలక అన్‌లాక్' },
  { level: 7, titleEn: 'Sage', titleTe: 'ఋషి', decoration: '✨', unlockEn: 'Aura glow unlocked', unlockTe: 'ఆభా ప్రభావం అన్‌లాక్' },
  { level: 8, titleEn: 'Royal', titleTe: 'రాచు', decoration: '👑', unlockEn: 'Royal crown tier 1', unlockTe: 'రాచు కిరీటం స్థాయి 1' },
  { level: 9, titleEn: 'Emperor', titleTe: 'చక్రవర్తి', decoration: '👑', unlockEn: 'Upgraded royal attire', unlockTe: 'మెరుగైన రాచు వస్త్రం' },
  { level: 10, titleEn: 'Divine', titleTe: 'దైవిక', decoration: '🌟', unlockEn: 'Golden crown unlocked', unlockTe: 'బంగారు కిరీటం అన్‌లాక్' },
  { level: 11, titleEn: 'Eternal', titleTe: 'శాశ్వత', decoration: '🌌', unlockEn: 'Cosmic aura + divine halo', unlockTe: 'విశ్వ ఆభా + దైవిక కిరీటం' },
];

export function getLevelInfo(level: number): LevelInfo {
  return levelSystem.find((l) => l.level === level) || levelSystem[0];
}
