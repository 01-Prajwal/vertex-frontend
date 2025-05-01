import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreditCard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Failed to load user.</div>;

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
    <div className="px-6 py-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">WaveConnect Credits</h3>
          <p className="text-indigo-100 text-sm">Balance as of Apr 30, 2025</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div className="mt-6">
        <div className="text-3xl font-bold text-white">{user?.credits?.toLocaleString()}</div>
      </div>
      <div className="mt-6 flex justify-between">
        <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md text-sm font-medium">
          Top Up
        </button>
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium">
          View History
        </button>
      </div>
    </div>
  </div>
  );
}
