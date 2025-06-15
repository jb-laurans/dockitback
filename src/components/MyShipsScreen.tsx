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

  if (loading) return <div className="p-8">Loading ships...</div>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      

      <h1 className="text-2xl font-bold mb-6">My Ships</h1>

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
