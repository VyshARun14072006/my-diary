import { useEffect, useState } from 'react';
import { BookOpen, Heart, Smile, TrendingUp } from 'lucide-react';
import { supabase, DiaryEntry, MOODS } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const QUOTES = [
  "Every moment is a fresh beginning.",
  "The only way to do great work is to love what you do.",
  "Believe you can and you're halfway there.",
  "Your life is your story. Write well. Edit often.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The best time for new beginnings is now.",
  "Happiness is not by chance, but by choice.",
  "Today is a good day to have a good day.",
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEntries: 0,
    thisWeekEntries: 0,
    moodDistribution: {} as Record<string, number>,
  });
  const [recentEntries, setRecentEntries] = useState<DiaryEntry[]>([]);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);

    const { data: entries } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user!.id)
      .order('date', { ascending: false });

    if (entries) {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const thisWeekEntries = entries.filter(
        (entry) => new Date(entry.date) >= oneWeekAgo
      );

      const moodCounts: Record<string, number> = {};
      entries.forEach((entry) => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      });

      setStats({
        totalEntries: entries.length,
        thisWeekEntries: thisWeekEntries.length,
        moodDistribution: moodCounts,
      });

      setRecentEntries(entries.slice(0, 5));
    }

    setLoading(false);
  };

  const getMoodEmoji = (mood: string) => {
    const emojiMap: Record<string, string> = {
      Happy: '😊',
      Sad: '😢',
      Neutral: '😐',
      Excited: '🎉',
      Anxious: '😰',
      Grateful: '🙏',
      Angry: '😠',
      Peaceful: '😌',
    };
    return emojiMap[mood] || '😊';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-400 to-blue-400 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-lg opacity-90">{quote}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Entries</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.totalEntries}</p>
            </div>
            <div className="bg-pink-100 p-3 rounded-lg">
              <BookOpen className="text-pink-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Week</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{stats.thisWeekEntries}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Top Mood</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {Object.keys(stats.moodDistribution).length > 0
                  ? Object.entries(stats.moodDistribution).sort((a, b) => b[1] - a[1])[0][0]
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Smile className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Happy Entries</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {stats.moodDistribution['Happy'] || 0}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Heart className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Mood Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {MOODS.map((mood) => (
            <div key={mood} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">{getMoodEmoji(mood)}</div>
              <div className="text-sm text-gray-600">{mood}</div>
              <div className="text-2xl font-bold text-gray-800 mt-1">
                {stats.moodDistribution[mood] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Entries</h3>
        {recentEntries.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No entries yet. Start writing your story!</p>
        ) : (
          <div className="space-y-3">
            {recentEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="text-2xl">{getMoodEmoji(entry.mood)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{entry.title}</h4>
                  <p className="text-sm text-gray-600">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
                <span className="text-sm text-gray-500">{entry.mood}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
