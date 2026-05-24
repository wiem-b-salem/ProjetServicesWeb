'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!token) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-lg">🚦 Urban Traffic</div>
      <div className="flex gap-6 text-sm">
        <Link href="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link href="/vehicles" className="hover:text-yellow-400">Vehicles</Link>
        <Link href="/incidents" className="hover:text-yellow-400">Incidents</Link>
        <Link href="/traffic" className="hover:text-yellow-400">Traffic</Link>
        <Link href="/notifications" className="hover:text-yellow-400">Notifications</Link>
        <button onClick={handleLogout} className="hover:text-red-400">Logout</button>
      </div>
    </nav>
  );
}