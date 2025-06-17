import React, { useEffect, useState } from 'react';
import { Ship } from '../types';
import { useUser } from '../contexts/UserContext'; // si tu as un contexte user
import { ArrowLeft } from 'lucide-react';

interface MyShipsScreenProps {
  onNavigate: (screen: string) => void;
}

export const MyShipsScreen: React.FC<MyShipsScreenProps> = ({ onNavigate }) => {
  const { user, token } = useUser();
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newShip, setNewShip] = useState({
    name: '',
    builtYear: '',
    currentPort: '',
    inertingSystem: '',
    cargoCapacity: '',
    tankCoating: ''
  });
  const inertingOptions = ['Nitrogen Generator', 'CO2 System', 'No Inerting'];
  const capacityOptions = ['10,000 DWT', '50,000 DWT', '100,000 DWT'];
  const coatingOptions = ['Epoxy', 'Zinc Silicate', 'Uncoated'];


   useEffect(() => {
    if (!user || !token) return;

    fetch(`http://localhost:3001/api/ships/my/ships`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch ships");
        return res.json();
      })
      .then((data) => {
        console.log('API response:', data);
        setShips(data.ships);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, token]);

  const handleAddShip = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!token) return;

  try {
    const res = await fetch('http://localhost:3001/api/ships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newShip)
    });

    if (!res.ok) throw new Error('Failed to create ship');

    const created = await res.json();
    setShips(prev => [...prev, created]);
    setNewShip({
      name: '',
      builtYear: '',
      currentPort: '',
      inertingSystem: '',
      cargoCapacity: '',
      tankCoating: ''
    });
    setShowForm(false);
    } catch (err) {
      alert('Error: ');
    }
  };


  if (loading) return <div className="p-8">Loading ships...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Ships</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : 'Add a Ship'}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddShip}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-8 space-y-4"
        >
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Ship Name</label>
            <input
              type="text"
              value={newShip.name}
              onChange={(e) => setNewShip({ ...newShip, name: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Built Year</label>
            <input
              type="date"
              value={newShip.builtYear}
              onChange={(e) => setNewShip({ ...newShip, builtYear: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Current Port</label>
            <input
              type="text"
              value={newShip.currentPort}
              onChange={(e) => setNewShip({ ...newShip, currentPort: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              required
            />
          </div>
          {/* Inerting System */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Inerting System</label>
            <select
              value={newShip.inertingSystem}
              onChange={(e) => setNewShip({ ...newShip, inertingSystem: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            >
              <option value="">Select a system</option>
              {inertingOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Cargo Capacity */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Cargo Capacity</label>
            <select
              value={newShip.cargoCapacity}
              onChange={(e) => setNewShip({ ...newShip, cargoCapacity: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            >
              <option value="">Select a capacity</option>
              {capacityOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Tank Coating */}
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Tank Coating</label>
            <select
              value={newShip.tankCoating}
              onChange={(e) => setNewShip({ ...newShip, tankCoating: e.target.value })}
              className="w-1/2 mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
            >
              <option value="">Select a coating</option>
              {coatingOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Ship
          </button>
        </form>
      )}

      {ships.length === 0 ? (
        <p>No ships found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ships.map((ship) => (
            <div key={ship.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <img src={ship.images?.[0]} alt={ship.name} className="h-40 w-full object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-semibold">{ship.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{ship.currentPort}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Built: {ship.specifications?.builtYear}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
