import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileSummary = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
            {user?.name?.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-sm font-medium text-gray-900">{user?.name}</h3>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4">
          <button className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-md text-sm font-medium" onClick={() => navigate("/profile") }>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
