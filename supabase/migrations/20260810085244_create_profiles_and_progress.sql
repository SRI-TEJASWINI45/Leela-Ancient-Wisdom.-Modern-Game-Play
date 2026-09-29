/*
# Create user profiles and game progress tables

## Purpose
Stores each user's personalization profile (interests, game style, learning topics)
and their progress across all games in the Leela ecosystem.

## New Tables

### profiles
- id (uuid, PK, references auth.users)
- display_name (text, not null)
- reading_age (int, default 14)
- game_style (text, e.g. 'competitive', 'casual', 'puzzle', 'quiz')
- interests (text[], e.g. ['snake mythology', 'Chola architecture'])
- preferred_topics (text[], e.g. ['Mahabharata', 'Vedic science'])
- onboarding_complete (bool, default false)
- theme (text, default 'temple-gold')
- streak (int, default 0)
- last_played (timestamptz, nullable)
- created_at (timestamptz)
- updated_at (timestamptz)

### game_progress
- id (uuid, PK)
- user_id (uuid, references auth.users, default auth.uid())
- game_id (text, not null)  -- e.g. 'adventure-book', 'quiz-arena', 'puzzle-match'
- level_reached (int, default 1)
- highest_score (int, default 0)
- total_plays (int, default 0)
- last_played (timestamptz)
- created_at (timestamptz)

## Security
- RLS enabled on both tables.
- profiles: owner-scoped CRUD (auth.uid() = id).
- game_progress: owner-scoped CRUD (auth.uid() = user_id).
- user_id columns default to auth.uid() so client inserts omitting user_id still succeed.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  reading_age int NOT NULL DEFAULT 14,
  game_style text NOT NULL DEFAULT 'casual',
  interests text[] NOT NULL DEFAULT '{}',
  preferred_topics text[] NOT NULL DEFAULT '{}',
  onboarding_complete boolean NOT NULL DEFAULT false,
  theme text NOT NULL DEFAULT 'temple-gold',
  streak int NOT NULL DEFAULT 0,
  last_played timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON profiles;
CREATE POLICY "delete_own_profile" ON profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

CREATE TABLE IF NOT EXISTS game_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id text NOT NULL,
  level_reached int NOT NULL DEFAULT 1,
  highest_score int NOT NULL DEFAULT 0,
  total_plays int NOT NULL DEFAULT 0,
  last_played timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, game_id)
);

ALTER TABLE game_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_progress" ON game_progress;
CREATE POLICY "select_own_progress" ON game_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_progress" ON game_progress;
CREATE POLICY "insert_own_progress" ON game_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_progress" ON game_progress;
CREATE POLICY "update_own_progress" ON game_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_progress" ON game_progress;
CREATE POLICY "delete_own_progress" ON game_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_game_progress_user ON game_progress(user_id);