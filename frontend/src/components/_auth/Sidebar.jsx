import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, LogOut, X } from 'lucide-react';
import instance from '../../axios';
import { useAuth } from '../../context/AuthProvider';
const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {

    const { logout } = useAuth();

    const handleLogout = () => {


        const token = localStorage.getItem('access_token');

        if (token) {
            instance.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    logout()
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        } else {
            console.error("No token found.");
        }
    }

    return (
        <div className={`lg:block fixed inset-0 z-50 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-gray-900 bg-opacity-75 lg:translate-x-0 lg:relative lg:bg-transparent`}>
            <div className={`lg:w-64 bg-gray-800 text-white p-6 space-y-6 h-full`}>
                <button
                    onClick={toggleSidebar}
                    className="lg:hidden absolute top-4 right-4 text-white"
                >
                    <X />
                </button>
                <div className="space-y-4">
                    <Link to="/" className="flex items-center space-x-3 text-white">
                        <Home /> <span>Home</span>
                    </Link>
                    <Link to="" className="flex items-center space-x-3 text-white">
                        <User /> <span>Profile</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center space-x-3 text-white">
                        <LogOut /> <span className='text-red-600'>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
