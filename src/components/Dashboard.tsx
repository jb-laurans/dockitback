import React, { useEffect, useState } from 'react';
import { Ship, Users, TrendingUp, MapPin, Calendar, Anchor } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useUser } from '../contexts/useUser';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

type ShipownerStats = {
  ships: number;
  matches: number;
  activeVoyages: number;
  revenue: string;
};

type ChartererStats = {
  cargos: number;
  matches: number;
  activeTrades: number;
  volume: string;
};

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user, token } = useUser();
  const [stats, setStats] = useState<ShipownerStats | ChartererStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) return;

    const fetchStats = async () => {
      try {
        console.log(user.type);
        const res = await fetch(`http://localhost:3001/api/auth/dashboard/${user.type}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, token]);

  if (!user || loading || !stats) return <div className="p-8">Loading dashboard...</div>;

  const isShipowner = user.type === 'shipowner';

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
                {user.company && (
                  <p className="text-xs text-gray-400 dark:text-gray-500">{user.company}</p>
                )}
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

      {/* Welcome & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isShipowner
              ? 'Manage your fleet and discover new cargo opportunities'
              : 'Find the perfect vessels for your cargo requirements'}
          </p>
          {user.verified && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300">
                ✓ Verified Account
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div onClick={() => onNavigate('my-ships')} className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Ship className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isShipowner ? (stats as ShipownerStats).ships : (stats as ChartererStats).cargos}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {isShipowner ? 'Active Ships' : 'Active Cargos'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {stats.matches}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Matches</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isShipowner ? (stats as ShipownerStats).activeVoyages : (stats as ChartererStats).activeTrades}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {isShipowner ? 'Active Voyages' : 'Active Trades'}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {isShipowner ? (stats as ShipownerStats).revenue : (stats as ChartererStats).volume}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {isShipowner ? 'This Month' : 'Total Volume'}
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

