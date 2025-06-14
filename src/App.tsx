import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { SwipeScreen } from './components/SwipeScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { MapScreen } from './components/MapScreen';
import { ShipDetailScreen } from './components/ShipDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { User } from './types';
import { mockUser } from './data/mockData';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const handleLogin = (userType: 'charterer' | 'shipowner') => {
    setUser({ ...mockUser, type: userType });
  };

  const handleLogout = () => {
    setUser(null);
    setMatches([]);
  };

  const handleMatch = (shipId: string) => {
    if (!matches.includes(shipId)) {
      setMatches(prev => [...prev, shipId]);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard user={user!} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/swipe"
            element={
              <ProtectedRoute user={user}>
                <SwipeScreen onMatch={handleMatch} />
              </ProtectedRoute>
            }
          />
          

          {/* Redirect all unknown paths */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
