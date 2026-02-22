import { Search } from 'lucide-react';

type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent shadow-sm"
        />
      </div>
    </div>
  );
}
