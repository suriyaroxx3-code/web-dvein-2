import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FaLock, FaEnvelope, FaUser } from 'react-icons/fa'; // User Icon

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' }); // User uses Email
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        // User Login URL
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/user-dashboard'); // Normal user redirect
            window.location.reload();
        } else {
            setError(data.message || "Invalid credentials.");
        }
    } catch {
        setError("Server Error.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* User Login UI - No Admin Text Here */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-3xl">
            <FaUser />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">User Login</h2> {/* Correct Title */}
          <p className="text-gray-500 text-sm">Welcome Back!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5" placeholder="user@example.com" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Password</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5" placeholder="••••••••" />
          </div>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <button disabled={loading} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <Link to="/register" className="text-blue-600 font-bold hover:underline">Create an Account</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
