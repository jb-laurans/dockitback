import React from 'react';
import { ArrowLeft, MapPin, Calendar, Ship, Flag, Ruler, Heart, MessageCircle } from 'lucide-react';
import { mockShips } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';

interface ShipDetailScreenProps {
  onNavigate: (screen: string) => void;
  onMatch: (shipId: string) => void;
}

export const ShipDetailScreen: React.FC<ShipDetailScreenProps> = ({ onNavigate, onMatch }) => {
  // For demo, use first ship
  const ship = mockShips[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('swipe')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Vessel Details</h1>
          <ThemeToggle />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Hero image */}
        <div className="relative h-80 overflow-hidden">
          <img
            src={ship.images[0]}
            alt={ship.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{ship.name}</h1>
            <p className="text-xl opacity-90">{ship.owner}</p>
          </div>
          <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            {ship.type.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Key stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Ship className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{ship.dwt.toLocaleString()}</p>
              <p className="text-gray-600 dark:text-gray-400">DWT</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{ship.currentPort}</p>
              <p className="text-gray-600 dark:text-gray-400">Current Port</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {new Date(ship.nextAvailableDate).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-gray-600 dark:text-gray-400">Available</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">$</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{ship.ratePerDay?.toLocaleString()}</p>
              <p className="text-gray-600 dark:text-gray-400">Per Day</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Length</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{ship.specifications.length}m</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Beam</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{ship.specifications.beam}m</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Draft</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{ship.specifications.draft}m</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Built Year</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{ship.specifications.builtYear}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Flag className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Flag</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{ship.specifications.flag}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Ship className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">Type</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {ship.type.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Position */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Current Position</h2>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{ship.currentPort}</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {ship.position.lat.toFixed(4)}°N, {ship.position.lng.toFixed(4)}°E
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Next Available</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {new Date(ship.nextAvailableDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Status</p>
                  <p className="font-semibold text-green-600 dark:text-green-400">Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom actions */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex gap-4">
          <button
            onClick={() => onMatch(ship.id)}
            className="flex-1 bg-green-600 dark:bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-green-800 transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-6 h-6" />
            Match
          </button>
          <button className="flex-1 bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};