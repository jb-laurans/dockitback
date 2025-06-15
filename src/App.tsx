import React, { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { Dashboard } from './components/Dashboard';
import { SwipeScreen } from './components/SwipeScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { MapScreen } from './components/MapScreen';
import { ShipDetailScreen } from './components/ShipDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider, useUser } from './contexts/UserContext';

type Screen = 'login' | 'dashboard' | 'swipe' | 'matches' | 'map' | 'ship-detail' | 'profile';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [matches, setMatches] = useState<string[]>([]);
  const { user, isAuthenticated } = useUser();

  const handleLogin = (userType: 'charterer' | 'shipowner') => {
    setCurrentScreen('dashboard');
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

  // Auto-redirect to login if not authenticated
  if (!isAuthenticated && currentScreen !== 'login') {
    setCurrentScreen('login');
  }

  // Auto-redirect to dashboard if authenticated and on login screen
  if (isAuthenticated && currentScreen === 'login') {
    setCurrentScreen('dashboard');
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      
      case 'dashboard':
        return isAuthenticated ? <Dashboard onNavigate={handleNavigate} /> : <LoginScreen onLogin={handleLogin} />;
      
      // case 'swipe':
      //   return isAuthenticated ? <SwipeScreen onNavigate={handleNavigate} onMatch={handleMatch} /> : <LoginScreen onLogin={handleLogin} />;
      
      case 'matches':
        return isAuthenticated ? <MatchesScreen onNavigate={handleNavigate} /> : <LoginScreen onLogin={handleLogin} />;
      
      case 'map':
        return isAuthenticated ? <MapScreen onNavigate={handleNavigate} /> : <LoginScreen onLogin={handleLogin} />;
      
      case 'ship-detail':
        return isAuthenticated ? <ShipDetailScreen onNavigate={handleNavigate} onMatch={handleMatch} /> : <LoginScreen onLogin={handleLogin} />;
      
      case 'profile':
        return isAuthenticated ? <ProfileScreen onNavigate={handleNavigate} /> : <LoginScreen onLogin={handleLogin} />;
      
      default:
        return isAuthenticated ? <Dashboard onNavigate={handleNavigate} /> : <LoginScreen onLogin={handleLogin} />;
    }
  };

  return renderScreen();
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;