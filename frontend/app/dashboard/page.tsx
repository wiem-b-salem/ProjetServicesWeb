'use client';
import { useQuery } from '@apollo/client';
import { GET_VEHICLES, GET_INCIDENTS, GET_ZONES } from '../../lib/queries';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push('/');
  }, [token]);

  const { data: vehicleData } = useQuery(GET_VEHICLES);
  const { data: incidentData } = useQuery(GET_INCIDENTS);
  const { data: zoneData } = useQuery(GET_ZONES);

  const cards = [
    { label: 'Vehicles', value: vehicleData?.vehicles?.length || 0, color: 'bg-blue-600', icon: '🚗' },
    { label: 'Incidents', value: incidentData?.incidents?.length || 0, color: 'bg-red-600', icon: '⚠️' },
    { label: 'Zones', value: zoneData?.zones?.length || 0, color: 'bg-green-600', icon: '🗺️' },
    {
      label: 'Congested',
      value: zoneData?.zones?.filter((z: any) => z.level === 'Élevé').length || 0,
      color: 'bg-orange-600',
      icon: '🔴',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(card => (
            <div key={card.label} className={`${card.color} rounded-xl p-6 text-white`}>
              <div className="text-3xl mb-2">{card.icon}</div>
              <div className="text-3xl font-bold">{card.value}</div>
              <div className="text-sm opacity-80">{card.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}