import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase, PersonalSection, CATEGORIES } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import PersonalSectionCard from './PersonalSectionCard';
import PersonalSectionModal from './PersonalSectionModal';

type PersonalSectionViewProps = {
  category: string;
  searchQuery: string;
};

export default function PersonalSectionView({ category, searchQuery }: PersonalSectionViewProps) {
  const { user } = useAuth();
  const [items, setItems] = useState<PersonalSection[]>([]);
  const [filteredItems, setFilteredItems] = useState<PersonalSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonalSection | null>(null);

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user, category]);

  useEffect(() => {
    filterItems();
  }, [items, searchQuery]);

  const loadItems = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('personal_sections')
      .select('*')
      .eq('user_id', user!.id)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (data) {
      setItems(data);
    }
    setLoading(false);
  };

  const filterItems = () => {
    let filtered = [...items];

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: PersonalSection) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await supabase.from('personal_sections').delete().eq('id', id);
      loadItems();
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    loadItems();
  };

  const categoryName = CATEGORIES[category as keyof typeof CATEGORIES] || category;

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
          <h2 className="text-3xl font-bold text-gray-800">{categoryName}</h2>
          <p className="text-gray-600 mt-1">Keep track of what matters</p>
        </div>
        <button
          onClick={handleAddItem}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-400 to-blue-400 text-white px-6 py-3 rounded-xl hover:from-pink-500 hover:to-blue-500 transition-all duration-200 shadow-md"
        >
          <Plus size={20} />
          Add Item
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md">
          <p className="text-gray-500 text-lg">No items yet. Start adding to this section!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <PersonalSectionCard
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <PersonalSectionModal
          item={editingItem}
          category={category}
          categoryName={categoryName}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
