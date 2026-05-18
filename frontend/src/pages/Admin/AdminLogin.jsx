import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Correct URL matching server.js routes
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();

      if (data.success) {
        // Login Success
        localStorage.setItem('adminToken', data.token); 
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin-dashboard');
      } else {
        // Login Failed
        setError(data.message || "Invalid Admin Credentials");
      }
    } catch (err) {
        setError("Server Error. Ensure Backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
            <FaUserShield />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Portal</h2>
        
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
            <input 
              type="text" name="username" onChange={handleChange} required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" name="password" onChange={handleChange} required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center bg-red-50 p-2 rounded">{error}</p>}

          <button disabled={loading} className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition-all">
            {loading ? "Verifying..." : "Access Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;