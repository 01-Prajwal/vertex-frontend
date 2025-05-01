import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    occupation: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          bio: data.user.bio || '',
          occupation: data.user.occupation || ''
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load profile data. Please try again.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const showToast = (message, isError = false) => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
      isError ? 'bg-red-500' : 'bg-green-500'
    } transition-opacity duration-500`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 500);
    }, 3000);
  };
  const handleSubmit = async () => {
    setSaving(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/complete-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          bio: formData.bio,
          occupation: formData.occupation
        })
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }
  
      const data = await response.json();
      console.log("Profile updated:", data.user);
      showToast("Profile updated successfully");
      navigate("/dashboard");
      // Optionally show toast or redirect here
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };
  

  const handleCancel = () => {
    console.log('Edit canceled');
    // In a real app, this would redirect to profile page
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <button 
          onClick={handleCancel} 
          className="mr-2 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
            Occupation
          </label>
          <input
            type="text"
            name="occupation"
            id="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            rows="4"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {saving ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;