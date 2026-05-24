'use client';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INCIDENTS, CREATE_INCIDENT, UPDATE_INCIDENT_STATUS } from '../../lib/queries';
import Navbar from '../../components/Navbar';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

const STATUS_COLORS: any = {
  'Signalé': 'bg-yellow-600',
  'En cours': 'bg-orange-600',
  'Résolu': 'bg-green-600',
};

export default function IncidentsPage() {
  const { data, refetch } = useQuery(GET_INCIDENTS);
  const [createIncident] = useMutation(CREATE_INCIDENT);
  const [updateStatus] = useMutation(UPDATE_INCIDENT_STATUS);

  const [form, setForm] = useState({
    type: 'Accident',
    description: '',
    latitude: '',
    longitude: '',
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createIncident({
        variables: {
          input: {
            type: form.type,
            description: form.description,
            latitude: parseFloat(form.latitude),
            longitude: parseFloat(form.longitude),
          },
        },
      });
      setForm({ type: 'Accident', description: '', latitude: '', longitude: '' });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: number, status: string) => {
    await updateStatus({ variables: { id, input: { status } } });
    refetch();
  };

  const mapMarkers = (data?.incidents || []).map((i: any) => ({
    id: i.id,
    latitude: i.latitude,
    longitude: i.longitude,
    label: `${i.type} - ${i.status}`,
  }));

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Incidents</h1>

        {/* Create Form */}
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">Declare Incident</h2>
          <form onSubmit={handleCreate} className="flex gap-3 flex-wrap">
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              className="bg-gray-800 text-white px-4 py-2 rounded"
            >
              <option>Accident</option>
              <option>Travaux</option>
              <option>Route fermée</option>
              <option>Embouteillage</option>
            </select>
            <input
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="bg-gray-800 text-white px-4 py-2 rounded flex-1 min-w-[200px]"
              required
            />
            <input
              placeholder="Latitude"
              value={form.latitude}
              onChange={e => setForm({ ...form, latitude: e.target.value })}
              className="bg-gray-800 text-white px-4 py-2 rounded w-32"
              required
            />
            <input
              placeholder="Longitude"
              value={form.longitude}
              onChange={e => setForm({ ...form, longitude: e.target.value })}
              className="bg-gray-800 text-white px-4 py-2 rounded w-32"
              required
            />
            <button
              type="submit"
              className="bg-red-500 text-white font-bold px-6 py-2 rounded hover:bg-red-400"
            >
              Declare
            </button>
          </form>
        </div>

        {/* Map */}
        <div className="mb-6">
          <Map markers={mapMarkers} />
        </div>

        {/* Incidents List */}
        <div className="flex flex-col gap-3">
          {(data?.incidents || []).map((inc: any) => (
            <div key={inc.id} className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">{inc.type}</div>
                <div className="text-gray-400 text-sm">{inc.description}</div>
                <div className="text-gray-500 text-xs mt-1">{inc.latitude}, {inc.longitude}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`${STATUS_COLORS[inc.status]} text-white text-xs px-3 py-1 rounded-full`}>
                  {inc.status}
                </span>
                <select
                  value={inc.status}
                  onChange={e => handleStatusChange(inc.id, e.target.value)}
                  className="bg-gray-800 text-white text-sm px-2 py-1 rounded"
                >
                  <option>Signalé</option>
                  <option>En cours</option>
                  <option>Résolu</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}