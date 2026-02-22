import { useEffect, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { supabase, DiaryEntry, MOODS } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import DiaryCard from './DiaryCard';
import DiaryModal from './DiaryModal';

type DiaryViewProps = {
  searchQuery: string;
};

export default function DiaryView({ searchQuery }: DiaryViewProps) {
  const { user } = useAuth();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>('All');

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  useEffect(() => {
    filterEntries();
  }, [entries, searchQuery, selectedMood]);

  const loadEntries = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user!.id)
      .order('date', { ascending: false });

    if (data) {
      setEntries(data);
    }
    setLoading(false);
  };

  const filterEntries = () => {
    let filtered = [...entries];

    if (selectedMood !== 'All') {
      filtered = filtered.filter((entry) => entry.mood === selectedMood);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEntries(filtered);
  };

  const handleAddEntry = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleEditEntry = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleDeleteEntry = async (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      await supabase.from('diary_entries').delete().eq('id', id);
      loadEntries();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    loadEntries();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Diary</h2>
          <p className="text-gray-600 mt-1">Chronicle your daily moments</p>
        </div>
        <button
          onClick={handleAddEntry}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-200 shadow-md"
        >
          <Plus size={20} />
          New Entry
        </button>
      </div>

      <div className="mb-6 flex items-center gap-2 flex-wrap">
        <Filter size={20} className="text-gray-600" />
        <button
          onClick={() => setSelectedMood('All')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedMood === 'All'
              ? 'bg-pink-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All
        </button>
        {MOODS.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedMood === mood
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-lg">No entries found. Start writing your story!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <DiaryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEditEntry}
              onDelete={handleDeleteEntry}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <DiaryModal entry={editingEntry} onClose={handleModalClose} />
      )}
    </div>
  );
}
