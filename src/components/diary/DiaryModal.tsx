import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import { supabase, DiaryEntry, MOODS } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

type DiaryModalProps = {
  entry: DiaryEntry | null;
  onClose: () => void;
};

export default function DiaryModal({ entry, onClose }: DiaryModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('Happy');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDescription(entry.description);
      setDate(entry.date);
      setMood(entry.mood);
    }
  }, [entry]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const entryData = {
      title,
      description,
      date,
      mood,
      user_id: user!.id,
      updated_at: new Date().toISOString(),
    };

    if (entry) {
      await supabase.from('diary_entries').update(entryData).eq('id', entry.id);
    } else {
      await supabase.from('diary_entries').insert(entryData);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            {entry ? 'Edit Entry' : 'New Entry'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="Give your entry a title..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Mood
            </label>
            <div className="grid grid-cols-4 gap-2">
              {MOODS.map((moodOption) => (
                <button
                  key={moodOption}
                  type="button"
                  onClick={() => setMood(moodOption)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    mood === moodOption
                      ? 'border-pink-500 bg-pink-50 text-pink-700 font-semibold'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {moodOption}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[200px]"
              placeholder="Write about your day..."
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg hover:from-pink-500 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Saving...' : entry ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
