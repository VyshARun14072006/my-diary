/*
  # Create Diary Entries Table

  1. New Tables
    - `diary_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text, entry title)
      - `description` (text, entry content)
      - `date` (date, entry date)
      - `mood` (text, user's mood - Happy, Sad, Neutral, Excited, etc.)
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-generated)

  2. Security
    - Enable RLS on `diary_entries` table
    - Add policies for authenticated users to manage their own entries:
      - Users can view their own diary entries
      - Users can insert their own diary entries
      - Users can update their own diary entries
      - Users can delete their own diary entries
*/

CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  mood text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diary entries"
  ON diary_entries
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diary entries"
  ON diary_entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diary entries"
  ON diary_entries
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diary entries"
  ON diary_entries
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS diary_entries_user_id_idx ON diary_entries(user_id);
CREATE INDEX IF NOT EXISTS diary_entries_date_idx ON diary_entries(date DESC);