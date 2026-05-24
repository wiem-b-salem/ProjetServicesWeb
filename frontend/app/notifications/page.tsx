'use client';
import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTIFICATIONS, MARK_READ } from '../../lib/queries';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function NotificationsPage() {
  const { userId } = useAuth();
  const { data, refetch } = useQuery(GET_NOTIFICATIONS, {
    variables: { user_id: userId || 1 },
    skip: !userId,
  });
  const [markRead] = useMutation(MARK_READ);

  const handleMarkRead = async (id: number) => {
    await markRead({ variables: { id } });
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Notifications</h1>
        <div className="flex flex-col gap-3">
          {(data?.notifications || []).map((n: any) => (
            <div
              key={n.id}
              className={`rounded-xl p-4 flex items-center justify-between ${
                n.is_read ? 'bg-gray-900 opacity-60' : 'bg-gray-800'
              }`}
            >
              <div>
                <div className="text-white">{n.message}</div>
                <div className="text-gray-500 text-xs mt-1">
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
              {!n.is_read && (
                <button
                  onClick={() => handleMarkRead(n.id)}
                  className="bg-blue-600 text-white text-sm px-4 py-1 rounded hover:bg-blue-500"
                >
                  Mark Read
                </button>
              )}
              {n.is_read && (
                <span className="text-green-500 text-sm">✓ Read</span>
              )}
            </div>
          ))}
          {(data?.notifications || []).length === 0 && (
            <div className="text-gray-500 text-center py-10">No notifications</div>
          )}
        </div>
      </div>
    </div>
  );
}