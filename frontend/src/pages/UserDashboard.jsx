import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* User Greeting */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-4xl">
                        <FaUserCircle />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Welcome, {user.username}!</h1>
                        <p className="text-gray-500 mt-1">{user.email}</p>
                    </div>
                </div>

                {/* Dashboard Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FaBriefcase/> Job Applications</h2>
                        <p className="text-gray-500 mb-4">Track the status of your applications.</p>
                        <button onClick={() => navigate('/career-hub')} className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold">Find Jobs</button>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><FaGraduationCap/> Enrolled Courses</h2>
                        <p className="text-gray-500 mb-4">Continue learning where you left off.</p>
                        <button onClick={() => navigate('/training')} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold">Browse Courses</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;