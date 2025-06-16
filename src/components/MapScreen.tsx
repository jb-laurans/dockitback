import React, { useState } from 'react';
import { MapPin, Ship, Filter, Search } from 'lucide-react';
import { mockShips } from '../data/mockData';
import { ThemeToggle } from './ThemeToggle';

interface MapScreenProps {
  onNavigate: (screen: string) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onNavigate }) => {
  const [selectedShip, setSelectedShip] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock map implementation - in real app, use Mapbox or Leaflet
  const MapComponent = () => (
        <div className="relative w-full h-full bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 dark:from-blue-800 dark:via-blue-700 dark:to-blue-600 rounded-xl overflow-hidden">

      {/* Mock map background */}
      <div className="w-full h-full flex items-center justify-center text-white/60 dark:text-white/80">
        <div className="text-center">
          <MapPin className="w-16 h-16 mx-auto mb-4" />
          <p className="text-lg font-medium">Interactive Map</p>
          <p className="text-sm opacity-75">Real map integration would go here</p>
        </div>
      </div>

      {/* Ship markers */}
      {mockShips.map((ship, index) => (
        <div
          key={ship.id}
          className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
            selectedShip === ship.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
          }`}
          style={{
            left: `${30 + index * 20}%`,
            top: `${40 + index * 15}%`
          }}
          onClick={() => setSelectedShip(selectedShip === ship.id ? null : ship.id)}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-2 border-blue-500 dark:border-blue-400">
            <Ship className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          {selectedShip === ship.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 min-w-48 border dark:border-gray-700">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">{ship.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ship.owner}</p>
              <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400">
                <p>📍 {ship.currentPort}</p>
                <p>🚢 {ship.dwt.toLocaleString()} DWT</p>
                <p>📅 Available {new Date(ship.nextAvailableDate).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => onNavigate('ship-detail')}
                className="w-full mt-3 bg-blue-600 dark:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
              >
                View Details
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Vessel Map</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vessel Type</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Types</option>
                  <option>Bulk Carrier</option>
                  <option>Container</option>
                  <option>Tanker</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DWT Range</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Any Size</option>
                  <option>50,000 - 100,000</option>
                  <option>100,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Port</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search ports..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Availability</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map container */}
       <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto">
          <MapComponent />
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
            <span>Available Vessels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 dark:bg-orange-400 rounded-full"></div>
            <span>In Transit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
            <span>Loading/Discharging</span>
          </div>
        </div>
      </div>
    </div>
  );
};