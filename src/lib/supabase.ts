import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DiaryEntry = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  mood: string;
  created_at: string;
  updated_at: string;
};

export type PersonalSection = {
  id: string;
  user_id: string;
  category: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export const MOODS = ['Happy', 'Sad', 'Neutral', 'Excited', 'Anxious', 'Grateful', 'Angry', 'Peaceful'];

export const CATEGORIES = {
  happy_moments: 'My Happy Moments',
  sad_moments: 'My Sad Moments',
  likes: 'My Likes',
  dislikes: 'My Dislikes',
  favorites: 'My Favorites',
  wishlist: 'My Wishlist',
  favorite_people: 'My Favorite People',
  family: 'My Family',
  good_decisions: 'My Good Decisions in Life',
};
