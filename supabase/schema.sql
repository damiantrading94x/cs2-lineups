-- ===========================================
-- CS2 LINEUPS — Supabase Database Setup
-- ===========================================
-- Run this SQL in your Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor
-- ===========================================

-- 1. Create the lineups table
CREATE TABLE IF NOT EXISTS lineups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  map_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  grenade_type TEXT NOT NULL CHECK (grenade_type IN ('smoke', 'flash', 'molotov', 'he')),
  side TEXT NOT NULL CHECK (side IN ('t', 'ct')),
  media_type TEXT NOT NULL CHECK (media_type IN ('link', 'image', 'video')),
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create index for faster map queries
CREATE INDEX IF NOT EXISTS idx_lineups_map_id ON lineups(map_id);

-- 3. Enable Row Level Security
ALTER TABLE lineups ENABLE ROW LEVEL SECURITY;

-- 4. Create open-access policies (anyone can read/write — suitable for friends/team use)
CREATE POLICY "Allow public read" ON lineups
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON lineups
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete" ON lineups
  FOR DELETE USING (true);

-- 5. Create storage bucket for uploaded lineup media
INSERT INTO storage.buckets (id, name, public)
VALUES ('lineups', 'lineups', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Storage policies — allow public uploads/reads/deletes
CREATE POLICY "Allow public upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'lineups');

CREATE POLICY "Allow public read storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'lineups');

CREATE POLICY "Allow public delete storage" ON storage.objects
  FOR DELETE USING (bucket_id = 'lineups');
