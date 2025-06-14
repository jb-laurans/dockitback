import React from 'react';
import { Ship, Users, TrendingUp, MapPin, Calendar, Anchor } from 'lucide-react';
import { User } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface DashboardProps {
  user: User;
  onNavigate: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const stats = {
    shipowner: {
      ships: 12,
      matches: 38,
      activeVoyages: 7,
      revenue: '$2.4M'
    },
    charterer: {
      cargos: 24,
      matches: 42,
      activeTrades: 9,
      volume: '1.2M MT'
    }
  };

  const currentStats = stats[user.type];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Anchor className="w-8 h-8 text-blue-800 dark:text-blue-400" />
                <span className="text-2xl font-bold text-blue-900 dark:text-blue-300">SHIPMATCH</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user.type}</p>
              </div>
              <button
                onClick={() => onNavigate('profile')}
                className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
              >
                <span className="text-blue-800 dark:text-blue-300 font-semibold">{user.name[0]}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user.type === 'shipowner' 
              ? 'Manage your fleet and discover new cargo opportunities'
              : 'Find the perfect vessels for your cargo requirements'
            }
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.type === 'shipowner' ? currentStats.ships : currentStats.cargos}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {user.type === 'shipowner' ? 'Active Ships' : 'Active Cargos'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{currentStats.matches}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Matches</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.type === 'shipowner' ? currentStats.activeVoyages : currentStats.activeTrades}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {user.type === 'shipowner' ? 'Active Voyages' : 'Active Trades'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {user.type === 'shipowner' ? currentStats.revenue : currentStats.volume}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {user.type === 'shipowner' ? 'This Month' : 'Total Volume'}
            </p>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Start Matching</h3>
            <p className="mb-6 opacity-90">
              {user.type === 'shipowner' 
                ? 'Discover new cargo opportunities and connect with charterers'
                : 'Find the perfect vessels for your cargo requirements'
              }
            </p>
            <button
              onClick={() => onNavigate('swipe')}
              className="bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-100 transition-colors"
            >
              Start Swiping
            </button>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Explore Map</h3>
            <p className="mb-6 opacity-90">
              View real-time vessel positions and port activities worldwide
            </p>
            <button
              onClick={() => onNavigate('map')}
              className="bg-white text-cyan-600 dark:text-cyan-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 dark:hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Open Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};