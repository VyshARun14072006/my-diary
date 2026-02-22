import { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from '../dashboard/Dashboard';
import DiaryView from '../diary/DiaryView';
import PersonalSectionView from '../personal/PersonalSectionView';
import SearchBar from '../shared/SearchBar';

export default function MainLayout() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const renderView = () => {
    if (currentView === 'dashboard') {
      return <Dashboard />;
    }
    if (currentView === 'diary') {
      return <DiaryView searchQuery={searchQuery} />;
    }
    return <PersonalSectionView category={currentView} searchQuery={searchQuery} />;
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-pink-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          {currentView !== 'dashboard' && (
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          )}
          {renderView()}
        </div>
      </main>
    </div>
  );
}
