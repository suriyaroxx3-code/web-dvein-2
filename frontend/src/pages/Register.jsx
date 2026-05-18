import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Backend URL correct ah irukanu pathukonga (Port 5000)
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.success) {
        alert("Account Created Successfully! Please Login.");
        navigate('/login');
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Server Error. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden font-sans">
       
       {/* Background Decoration (Same as Login) */}
       <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-50 -z-10"/>
       <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-50 rounded-full blur-[80px] -z-10"/>
       
       <motion.div 
         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
         className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 md:p-10 rounded-[2rem] shadow-2xl w-full max-w-md z-10"
       >
         <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Create Account</h2>
            <p className="text-gray-500 text-sm">Join DVein community today</p>
         </div>

         <form onSubmit={handleRegister} className="space-y-5">
           
           {/* Username Field */}
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Full Name</label>
             <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="text" name="username" placeholder="John Doe" onChange={handleChange} required 
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-dveinBlue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700" />
             </div>
           </div>
           
           {/* Email Field */}
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Email Address</label>
             <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="email" name="email" placeholder="name@example.com" onChange={handleChange} required 
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-dveinBlue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700" />
             </div>
           </div>

           {/* Password Field */}
           <div>
             <label className="block text-xs font-bold text-gray-500 uppercase mb-2 ml-1">Password</label>
             <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required 
                    className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-dveinBlue focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium text-gray-700" />
             </div>
           </div>

           {/* Error Message */}
           {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg border border-red-100 text-center font-bold">
              {error}
            </div>
           )}

           <button disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-70">
             {loading ? "Creating Account..." : "Sign Up"}
           </button>
         </form>

         <div className="text-center mt-6 text-sm">
           <span className="text-gray-500">Already have an account? </span>
           <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
         </div>

       </motion.div>
    </div>
  );
};

export default Register;