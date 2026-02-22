import { Home, BookOpen, Heart, Frown, ThumbsUp, ThumbsDown, Star, Gift, Users, User, Lightbulb, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type SidebarProps = {
  currentView: string;
  onViewChange: (view: string) => void;
};

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'diary', label: 'My Diary', icon: BookOpen },
    { id: 'happy_moments', label: 'Happy Moments', icon: Heart },
    { id: 'sad_moments', label: 'Sad Moments', icon: Frown },
    { id: 'likes', label: 'My Likes', icon: ThumbsUp },
    { id: 'dislikes', label: 'My Dislikes', icon: ThumbsDown },
    { id: 'favorites', label: 'My Favorites', icon: Star },
    { id: 'wishlist', label: 'My Wishlist', icon: Gift },
    { id: 'favorite_people', label: 'Favorite People', icon: Users },
    { id: 'family', label: 'My Family', icon: User },
    { id: 'good_decisions', label: 'Good Decisions', icon: Lightbulb },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              My Life Book
            </h1>
            <p className="text-sm text-gray-600 mt-1">Your personal diary</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onViewChange(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-100 to-blue-100 text-pink-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}
    </>
  );
}
