import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';


import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div className="p-8 text-center">404 Not Found</div>} />
      </Routes>
    </Router>
  );
}
