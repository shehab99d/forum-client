import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaUsers, FaHome, FaCogs, FaBars, FaTimes, FaBullhorn } from 'react-icons/fa';
import Forumify from '../../Forumify';

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const isAdminHome = location.pathname === '/admin'; // adjust as needed

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#0f0f0f] text-white">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 text-2xl text-white"
            >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-b from-[#1a1a1a] to-[#2c2c2c] p-6 z-40 shadow-xl
                transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
                    <Forumify />
                    <h2 className="text-2xl font-bold text-yellow-400">Admin Panel</h2>
                </div>

                {/* Navigation */}
                {/* import {NavLink} from 'react-router-dom'; */}

                {/* // ... */}

                <nav className="space-y-6">
                    <NavLink
                        to="admin-dashboard"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-1 rounded-md transition duration-200
            ${isActive
                                ? 'text-yellow-400 border-l-4 border-yellow-400 bg-[#1a1a1a]'
                                : 'text-gray-300 hover:text-yellow-400'}`
                        }
                    >
                        <FaHome /> Dashboard
                    </NavLink>

                    <NavLink
                        to="manage-user"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-1 rounded-md transition duration-200
            ${isActive
                                ? 'text-yellow-400 border-l-4 border-yellow-400 bg-[#1a1a1a]'
                                : 'text-gray-300 hover:text-yellow-400'}`
                        }
                    >
                        <FaUsers /> Manage Users
                    </NavLink>

                    <NavLink
                        to="make/announcement"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-1 rounded-md transition duration-200
            ${isActive
                                ? 'text-yellow-400 border-l-4 border-yellow-400 bg-[#1a1a1a]'
                                : 'text-gray-300 hover:text-yellow-400'}`
                        }
                    >
                        <FaBullhorn /> Make Announcement
                    </NavLink>

                    <NavLink
                        to="settings"
                        onClick={() => setSidebarOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-2 py-1 rounded-md transition duration-200
            ${isActive
                                ? 'text-yellow-400 border-l-4 border-yellow-400 bg-[#1a1a1a]'
                                : 'text-gray-300 hover:text-yellow-400'}`
                        }
                    >
                        <FaCogs /> Settings
                    </NavLink>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto relative">
                {/* Background Image */}
                <img
                    src="/bg-4.jpg"
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
                />

                {/* Admin Welcome Section */}
                {isAdminHome && (
                    <div className="relative z-10 bg-black/50 backdrop-blur-md rounded-xl p-10 max-w-4xl mx-auto text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-400 text-center">
                            🔐 Welcome to the Admin Dashboard
                        </h1>
                        <p className="text-center text-lg md:text-xl text-gray-300 mb-6">
                            Manage users, announcements, and system settings from one powerful control center.
                        </p>

                        {/* Optional Admin Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Total Users</h3>
                                <p className="text-3xl font-bold mt-2">32</p>
                            </div>
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Admins</h3>
                                <p className="text-3xl font-bold mt-2">3</p>
                            </div>
                            <div className="bg-yellow-600/20 p-6 rounded-lg shadow-md text-center">
                                <h3 className="text-xl font-semibold text-yellow-300">Announcements</h3>
                                <p className="text-3xl font-bold mt-2">8</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Nested Routes */}
                <div className="mt-10 relative z-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
