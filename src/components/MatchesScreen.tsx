import React from 'react';
import { MessageCircle, Calendar, MapPin, Ship, ArrowRight, Heart } from 'lucide-react';
import { Match } from '../types';
import { mockMatches, mockShips } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';

interface MatchesScreenProps {
  onNavigate: (screen: string) => void;
}

export const MatchesScreen: React.FC<MatchesScreenProps> = ({ onNavigate }) => {
  const getShipForMatch = (match: Match) => {
    return mockShips.find(ship => ship.id === match.shipId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      case 'negotiating': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300';
      case 'accepted': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
    }
  };

  if (mockMatches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('dashboard')}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Matches</h1>
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No matches yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Start swiping to find your perfect vessel matches</p>
            <button
              onClick={() => onNavigate('swipe')}
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Start Matching
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Matches</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-sm font-medium">
              {mockMatches.length}
            </span>
          </div>
        </div>
      </div>

      {/* Matches list */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="space-y-4">
          {mockMatches.map((match) => {
            const ship = getShipForMatch(match);
            if (!ship) return null;

            return (
              <div key={match.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Ship image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={ship.images[0]}
                      alt={ship.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Ship info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">{ship.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{ship.owner}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Ship className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm">{ship.dwt.toLocaleString()} DWT</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                        <span className="text-sm">{ship.currentPort}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4 text-green-500 dark:text-green-400" />
                        <span className="text-sm">
                          {new Date(match.matchedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                      </button>
                      <button 
                        onClick={() => onNavigate('ship-detail')}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue matching */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Keep Matching</h3>
          <p className="mb-4 opacity-90">Discover more vessels that fit your requirements</p>
          <button
            onClick={() => onNavigate('swipe')}
            className="bg-white text-blue-600 dark:text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-100 transition-colors"
          >
            Continue Swiping
          </button>
        </div>
      </div>
    </div>
  );
};