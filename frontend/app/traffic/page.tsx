'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ZONES, CREATE_ZONE, UPDATE_DENSITY } from '../../lib/queries';
import Navbar from '../../components/Navbar';

const LEVEL_COLORS: any = {
  'Faible': 'bg-green-600',
  'Moyen': 'bg-yellow-600',
  'Élevé': 'bg-red-600',
};

export default function TrafficPage() {
  const { data, refetch } = useQuery(GET_ZONES);
  const [createZone] = useMutation(CREATE_ZONE);
  const [updateDensity] = useMutation(UPDATE_DENSITY);

  const [zoneName, setZoneName] = useState('');
  const [densities, setDensities] = useState<{ [key: number]: string }>({});

  const handleCreateZone = async (e: React.FormEvent) => {
    e.preventDefault();
    await createZone({ variables: { input: { name: zoneName } } });
    setZoneName('');
    refetch();
  };

  const handleUpdateDensity = async (id: number) => {
    const density = parseFloat(densities[id] || '0');
    await updateDensity({ variables: { id, input: { density } } });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Traffic Zones</h1>

        {/* Create Zone */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Create Zone</h2>
          <form onSubmit={handleCreateZone} className="flex gap-3">
            <input
              placeholder="Zone name"
              value={zoneName}
              onChange={e => setZoneName(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded flex-1"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white font-bold px-6 py-2 rounded hover:bg-green-400"
            >
              Create
            </button>
          </form>
        </div>

        {/* Zones List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(data?.zones || []).map((zone: any) => (
            <div key={zone.id} className="bg-gray-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-semibold">{zone.name}</div>
                <span className={`${LEVEL_COLORS[zone.level]} text-white text-xs px-3 py-1 rounded-full`}>
                  {zone.level}
                </span>
              </div>
              <div className="text-gray-400 text-sm mb-3">Density: {zone.density}</div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="New density"
                  value={densities[zone.id] || ''}
                  onChange={e => setDensities({ ...densities, [zone.id]: e.target.value })}
                  className="bg-gray-800 text-white px-3 py-1 rounded flex-1 text-sm"
                />
                <button
                  onClick={() => handleUpdateDensity(zone.id)}
                  className="bg-yellow-500 text-black text-sm font-bold px-4 py-1 rounded hover:bg-yellow-400"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}