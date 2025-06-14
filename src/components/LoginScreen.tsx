import React, { useState } from 'react';
import { Anchor, Mail, Lock, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useNavigate } from 'react-router-dom';

interface LoginScreenProps {
  onLogin: (userType: 'charterer' | 'shipowner') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'charterer' | 'shipowner'>('shipowner');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      // On suppose que l'API retourne des infos utilisateur, on peut les ignorer ici
      // On appelle onLogin avec le userType sélectionné
      onLogin(userType);

      // Puis on redirige
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Anchor className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SHIPMATCH</h1>
          <p className="text-blue-100 dark:text-gray-300 text-lg">Ship happens. Start matching.</p>
        </div>

        <div className="bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User type selection */}
            <div className="space-y-3">
              <label className="text-white dark:text-gray-200 font-medium">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('shipowner')}
                  className={`py-2 rounded-xl font-semibold ${
                    userType === 'shipowner' ? 'bg-white text-blue-900' : 'bg-white/20 text-white'
                  }`}
                >
                  Ship Owner
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('charterer')}
                  className={`py-2 rounded-xl font-semibold ${
                    userType === 'charterer' ? 'bg-white text-blue-900' : 'bg-white/20 text-white'
                  }`}
                >
                  Charterer
                </button>
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-2">
              <label className="text-white dark:text-gray-200 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 dark:text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-xl text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400 focus:outline-none focus:border-white/60 dark:focus:border-gray-400 focus:bg-white/20 dark:focus:bg-gray-700/50 transition-all"
                  placeholder="your@company.com"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-white dark:text-gray-200 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 dark:text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 dark:bg-gray-700/30 border border-white/30 dark:border-gray-600/50 rounded-xl text-white dark:text-gray-200 placeholder-white/60 dark:placeholder-gray-400 focus:outline-none focus:border-white/60 dark:focus:border-gray-400 focus:bg-white/20 dark:focus:bg-gray-700/50 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white dark:bg-gray-200 text-blue-900 dark:text-gray-900 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-gray-300 transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="text-center mt-8 text-white/60 dark:text-gray-400">
          <p>Connecting maritime professionals worldwide</p>
        </div>
      </div>
    </div>
  );
};
