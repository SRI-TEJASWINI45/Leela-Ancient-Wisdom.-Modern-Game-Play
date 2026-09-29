/*
# Add language, avatar_style, player_level, learning_preference to profiles

## Purpose
Support the bilingual (English/Telugu) cultural gaming ecosystem with:
1. language preference (en/te) for full UI localization
2. avatar_style for the three design aesthetics (fusion-anime, chibi-cultural, classic-mythological)
3. player_level for the 11-level progression system
4. learning_preference for story-first vs story-while-playing toggle

## Modified Tables

### profiles (modified)
- language (text, default 'en') — 'en' for English, 'te' for Telugu
- avatar_style (text, default 'fusion-anime') — visual design aesthetic
- player_level (int, default 1) — current level in the 11-level progression
- learning_preference (text, default 'story-first') — 'story-first' or 'story-while-playing'

## Security
- All new columns inherit existing owner-scoped RLS policies on profiles.
*/

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS language text NOT NULL DEFAULT 'en';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_style text NOT NULL DEFAULT 'fusion-anime';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS player_level int NOT NULL DEFAULT 1;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_preference text NOT NULL DEFAULT 'story-first';
