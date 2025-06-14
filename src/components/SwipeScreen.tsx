import React, { useState, useEffect } from 'react';
import { Heart, X, Info, Anchor, MapPin, Calendar, Truck } from 'lucide-react';
import { Ship } from '../types';
import { mockShips } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';

interface SwipeScreenProps {
  onNavigate: (screen: string) => void;
  onMatch: (shipId: string) => void;
}

export const SwipeScreen: React.FC<SwipeScreenProps> = ({ onNavigate, onMatch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ships, setShips] = useState<Ship[]>(mockShips);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentShip = ships[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === 'right' && currentShip) {
      onMatch(currentShip.id);
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const resetDeck = () => {
    setCurrentIndex(0);
    setShips([...mockShips]);
  };

  if (currentIndex >= ships.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Anchor className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">No more ships to review</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Check back later for new opportunities</p>
          <div className="space-y-3">
            <button
              onClick={resetDeck}
              className="block w-full bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              Review Again
            </button>
            <button
              onClick={() => onNavigate('matches')}
              className="block w-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              View Matches
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentShip) {
    return <div>Loading...</div>;
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Discover Vessels</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => onNavigate('matches')}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Matches
            </button>
          </div>
        </div>
      </div>

      {/* Card container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 overflow-hidden transition-transform duration-300 ${
              isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
            }`}
          >
            {/* Ship image */}
            <div className="h-80 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 relative overflow-hidden">
              <img
                src={currentShip.images[0]}
                alt={currentShip.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentShip.type.replace('_', ' ').toUpperCase()}
              </div>
            </div>

            {/* Ship details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{currentShip.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{currentShip.owner}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentShip.dwt.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">DWT</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span>Currently in <strong className="text-gray-900 dark:text-gray-200">{currentShip.currentPort}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-5 h-5 text-green-500 dark:text-green-400" />
                  <span>Available from <strong className="text-gray-900 dark:text-gray-200">{new Date(currentShip.nextAvailableDate).toLocaleDateString()}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <Truck className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                  <span><strong className="text-gray-900 dark:text-gray-200">${currentShip.ratePerDay?.toLocaleString()}</strong> per day</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{currentShip.specifications.length}m</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Length</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{currentShip.specifications.beam}m</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Beam</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{currentShip.specifications.builtYear}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Built</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-800 rounded-full flex items-center justify-center hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-lg"
              disabled={isAnimating}
            >
              <X className="w-8 h-8 text-red-500 dark:text-red-400" />
            </button>
            
            <button
              onClick={() => onNavigate('ship-detail')}
              className="w-16 h-16 bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-800 rounded-full flex items-center justify-center hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors shadow-lg"
            >
              <Info className="w-8 h-8 text-blue-500 dark:text-blue-400" />
            </button>
            
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-white dark:bg-gray-800 border-2 border-green-200 dark:border-green-800 rounded-full flex items-center justify-center hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors shadow-lg"
              disabled={isAnimating}
            >
              <Heart className="w-8 h-8 text-green-500 dark:text-green-400" />
            </button>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-2">
              {ships.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index < currentIndex ? 'bg-green-400 dark:bg-green-500' : 
                    index === currentIndex ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};