/*
  # Create Personal Sections Table

  1. New Tables
    - `personal_sections`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `category` (text, section type: happy_moments, sad_moments, likes, dislikes, favorites, wishlist, favorite_people, family, good_decisions)
      - `title` (text, item title)
      - `description` (text, optional description)
      - `created_at` (timestamptz, auto-generated)
      - `updated_at` (timestamptz, auto-generated)

  2. Security
    - Enable RLS on `personal_sections` table
    - Add policies for authenticated users to manage their own personal sections:
      - Users can view their own personal section items
      - Users can insert their own personal section items
      - Users can update their own personal section items
      - Users can delete their own personal section items
*/

CREATE TABLE IF NOT EXISTS personal_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category text NOT NULL,
  title text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE personal_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own personal sections"
  ON personal_sections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own personal sections"
  ON personal_sections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own personal sections"
  ON personal_sections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own personal sections"
  ON personal_sections
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS personal_sections_user_id_idx ON personal_sections(user_id);
CREATE INDEX IF NOT EXISTS personal_sections_category_idx ON personal_sections(category);