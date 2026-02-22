import { Edit2, Trash2, Calendar } from 'lucide-react';
import { DiaryEntry } from '../../lib/supabase';

type DiaryCardProps = {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (id: string) => void;
};

export default function DiaryCard({ entry, onEdit, onDelete }: DiaryCardProps) {
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

  const getMoodColor = (mood: string) => {
    const colorMap: Record<string, string> = {
      Happy: 'bg-yellow-100 text-yellow-800',
      Sad: 'bg-blue-100 text-blue-800',
      Neutral: 'bg-gray-100 text-gray-800',
      Excited: 'bg-pink-100 text-pink-800',
      Anxious: 'bg-orange-100 text-orange-800',
      Grateful: 'bg-green-100 text-green-800',
      Angry: 'bg-red-100 text-red-800',
      Peaceful: 'bg-teal-100 text-teal-800',
    };
    return colorMap[mood] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{getMoodEmoji(entry.mood)}</div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getMoodColor(entry.mood)}`}>
            {entry.mood}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{entry.title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{entry.description}</p>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          {new Date(entry.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(entry)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
