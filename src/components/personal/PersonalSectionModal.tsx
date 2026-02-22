import { useState, useEffect, FormEvent } from 'react';
import { X } from 'lucide-react';
import { supabase, PersonalSection } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

type PersonalSectionModalProps = {
  item: PersonalSection | null;
  category: string;
  categoryName: string;
  onClose: () => void;
};

export default function PersonalSectionModal({
  item,
  category,
  categoryName,
  onClose,
}: PersonalSectionModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
    }
  }, [item]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const itemData = {
      title,
      description,
      category,
      user_id: user!.id,
      updated_at: new Date().toISOString(),
    };

    if (item) {
      await supabase.from('personal_sections').update(itemData).eq('id', item.id);
    } else {
      await supabase.from('personal_sections').insert(itemData);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            {item ? `Edit ${categoryName}` : `Add to ${categoryName}`}
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
              placeholder="Enter a title..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 min-h-[150px]"
              placeholder="Add more details..."
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
              {loading ? 'Saving...' : item ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
