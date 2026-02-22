import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import pages/components
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import DiaryView from './components/diary/DiaryView';

// Optional: simple 404 page
const NotFound = () => <h1>404 - Page Not Found</h1>;

function App() {
  // For demo, you can implement auth logic later
  const isAuthenticated = false; // set true after login

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* Diary Route */}
        <Route
          path="/diary/:id"
          element={isAuthenticated ? <DiaryView /> : <Navigate to="/login" replace />}
        />

        {/* Default route */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;