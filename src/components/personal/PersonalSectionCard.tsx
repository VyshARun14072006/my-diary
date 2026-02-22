import { Edit2, Trash2, Clock } from 'lucide-react';
import { PersonalSection } from '../../lib/supabase';

type PersonalSectionCardProps = {
  item: PersonalSection;
  onEdit: (item: PersonalSection) => void;
  onDelete: (id: string) => void;
};

export default function PersonalSectionCard({ item, onEdit, onDelete }: PersonalSectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h3>

        {item.description && (
          <p className="text-gray-600 mb-4 line-clamp-4">{item.description}</p>
        )}

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock size={16} className="mr-2" />
          {new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
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
