import React, { useState } from 'react';
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

type Screen = 'login' | 'dashboard' | 'swipe' | 'matches' | 'map' | 'ship-detail' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<string[]>([]);

  const handleLogin = (userType: 'charterer' | 'shipowner') => {
    setUser({ ...mockUser, type: userType });
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setMatches([]);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleMatch = (shipId: string) => {
    if (!matches.includes(shipId)) {
      setMatches(prev => [...prev, shipId]);
    }
    // Show match animation or notification in real app
  };

  if (!user && currentScreen !== 'login') {
    return (
      <ThemeProvider>
        <LoginScreen onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'dashboard':
        return user ? <Dashboard user={user} onNavigate={handleNavigate} /> : null;
      
      case 'swipe':
        return <SwipeScreen onNavigate={handleNavigate} onMatch={handleMatch} />;
      
      case 'matches':
        return <MatchesScreen onNavigate={handleNavigate} />;
      
      case 'map':
        return <MapScreen onNavigate={handleNavigate} />;
      
      case 'ship-detail':
        return <ShipDetailScreen onNavigate={handleNavigate} onMatch={handleMatch} />;
      
      case 'profile':
        return user ? (
          <ProfileScreen 
            user={user} 
            onNavigate={handleNavigate} 
            onLogout={handleLogout} 
          />
        ) : null;
      
      default:
        return user ? <Dashboard user={user} onNavigate={handleNavigate} /> : null;
    }
  };

  return (
    <ThemeProvider>
      {renderScreen()}
    </ThemeProvider>
  );
}

export default App;