import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    try {
      return token && token.split('.').length === 3 ? jwtDecode(token) : null;
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem('token');
      return null;
    }
  });
  const [savedPosts, setSavedPosts] = useState([]);
  const [activities, setActivities] = useState([]);
  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      setUser(jwtDecode(token));
    } catch (error) {
      console.error("Login failed, invalid token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };
  const savePost = (post) => {
    setSavedPosts((prev) => [...prev, post]);
  };
  
  const removeSavedPost = (postId) => {
    setSavedPosts((prev) => prev.filter((p) => p.id !== postId));
  };
  const updateActivities = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/users/activity`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch activity");

      const formatted = data.activities.map((act, idx) => ({
        id: idx,
        type: act.type,
        content: `You ${act.type}d "${act.contentTitle}"`,
        time: new Date(act.timestamp).toLocaleString(),
      }));

      setActivities(formatted);
    } catch (error) {
      console.error("Activity fetch failed:", error);
    }
  };
  return (
<AuthContext.Provider
  value={{
    user,
    login,
    logout,
    savedPosts,
    savePost,
    removeSavedPost,
    activities,
    updateActivities
  }}
>
  {children}
</AuthContext.Provider>

  );
};
