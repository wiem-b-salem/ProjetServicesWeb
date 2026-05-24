'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VEHICLES, ADD_VEHICLE } from '../../lib/queries';
import Navbar from '../../components/Navbar';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function VehiclesPage() {
  const { data, refetch } = useQuery(GET_VEHICLES);
  const [addVehicle] = useMutation(ADD_VEHICLE);

  const [plate, setPlate] = useState('');
  const [type, setType] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await addVehicle({
        variables: {
          input: { plate, type, owner_id: parseInt(ownerId) },
        },
      });
      setPlate(''); setType(''); setOwnerId('');
      refetch();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const mapMarkers = (data?.vehicles || [])
    .filter((v: any) => v.latitude && v.longitude)
    .map((v: any) => ({
      id: v.id,
      latitude: v.latitude,
      longitude: v.longitude,
      label: `${v.plate} - ${v.type}`,
    }));

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Vehicles</h1>

        {/* Add Vehicle Form */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Add Vehicle</h2>
          {error && <div className="bg-red-900 text-red-300 px-4 py-2 rounded mb-4 text-sm">{error}</div>}
          <form onSubmit={handleAdd} className="flex gap-3 flex-wrap">
            <input
              placeholder="Plate (e.g. TUN-001)"
              value={plate}
              onChange={e => setPlate(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded flex-1 min-w-[150px]"
              required
            />
            <input
              placeholder="Type (car, truck...)"
              value={type}
              onChange={e => setType(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded flex-1 min-w-[150px]"
              required
            />
            <input
              placeholder="Owner ID"
              type="number"
              value={ownerId}
              onChange={e => setOwnerId(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded w-32"
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 text-black font-bold px-6 py-2 rounded hover:bg-yellow-400"
            >
              Add
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="mb-6">
          <Map markers={mapMarkers} />
        </div>

        {/* Vehicle List */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <table className="w-full text-white text-sm">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Plate</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Owner ID</th>
              </tr>
            </thead>
            <tbody>
              {(data?.vehicles || []).map((v: any) => (
                <tr key={v.id} className="border-t border-gray-800 hover:bg-gray-800">
                  <td className="px-4 py-3">{v.id}</td>
                  <td className="px-4 py-3">{v.plate}</td>
                  <td className="px-4 py-3">{v.type}</td>
                  <td className="px-4 py-3">{v.owner_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}