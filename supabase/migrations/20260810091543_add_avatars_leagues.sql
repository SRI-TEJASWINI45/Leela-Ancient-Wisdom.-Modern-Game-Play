/*
# Add avatars, total_score, and leagues support

## Purpose
1. Add avatar_id and total_score columns to profiles so users can pick an avatar
   and have an aggregate score across all games for leaderboard ranking.
2. Create leagues table for scheduled competitions (weekly/monthly heritage leagues).
3. Create league_participants table tracking which users joined which league and their
   score within that league.

## Modified Tables

### profiles (modified)
- avatar_id (text, default 'lotus') — stores the key of the user's chosen avatar
- total_score (int, default 0) — cumulative score across all games, used for global leaderboard

## New Tables

### leagues
- id (uuid, PK)
- name (text, not null) — e.g. "Heritage Champions League — Week 1"
- description (text)
- game_id (text, not null) — which game this league is for
- start_date (timestamptz, not null)
- end_date (timestamptz, not null)
- status (text, default 'upcoming') — 'upcoming', 'active', 'completed'
- prize (text) — description of physical/digital prize
- created_at (timestamptz)

### league_participants
- id (uuid, PK)
- league_id (uuid, FK to leagues, ON DELETE CASCADE)
- user_id (uuid, FK to auth.users, ON DELETE CASCADE)
- score (int, default 0)
- joined_at (timestamptz)
- UNIQUE (league_id, user_id)

## Security
- profiles: already has owner-scoped RLS; new columns inherit existing policies.
- leagues: SELECT is public to all authenticated users (everyone can see leagues).
  INSERT/UPDATE restricted to authenticated users.
- league_participants: users can see all participants (for rankings)
  but can only insert/update their own participation row.
*/

-- Add avatar_id and total_score to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_id text NOT NULL DEFAULT 'lotus';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_score int NOT NULL DEFAULT 0;

-- Create leagues table
CREATE TABLE IF NOT EXISTS leagues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  game_id text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'upcoming',
  prize text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_leagues" ON leagues;
CREATE POLICY "select_leagues" ON leagues FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_leagues" ON leagues;
CREATE POLICY "insert_leagues" ON leagues FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "update_leagues" ON leagues;
CREATE POLICY "update_leagues" ON leagues
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Create league_participants table
CREATE TABLE IF NOT EXISTS league_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id uuid NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  score int NOT NULL DEFAULT 0,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (league_id, user_id)
);

ALTER TABLE league_participants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_league_participants" ON league_participants;
CREATE POLICY "select_league_participants" ON league_participants FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_league_participation" ON league_participants;
CREATE POLICY "insert_own_league_participation" ON league_participants FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_league_participation" ON league_participants;
CREATE POLICY "update_own_league_participation" ON league_participants
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_league_participation" ON league_participants;
CREATE POLICY "delete_own_league_participation" ON league_participants
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_league_participants_league ON league_participants(league_id);
CREATE INDEX IF NOT EXISTS idx_league_participants_user ON league_participants(user_id);
