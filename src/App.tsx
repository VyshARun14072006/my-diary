import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProtectedRoute from './components/auth/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

function AuthenticatedApp() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!user) {
    return authMode === 'login' ? (
      <Login onToggleMode={() => setAuthMode('signup')} />
    ) : (
      <Signup onToggleMode={() => setAuthMode('login')} />
    );
  }

  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
}

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
