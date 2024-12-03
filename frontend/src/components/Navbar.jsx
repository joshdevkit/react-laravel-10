import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider'; // Assuming you have a custom auth provider
import { Link } from 'react-router-dom';
import { Home, LogOut, Menu, User, X } from 'lucide-react'; // Using Lucide icons
import instance from '../axios';

const Navbar = () => {
    const { logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        // Retrieve token from localStorage or other storage method
        const token = localStorage.getItem('access_token');

        // Check if the token exists
        if (token) {
            instance.post("/logout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log('Logged out successfully:', response);

                    window.location.href = '/';
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
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 w-64 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:hidden`}
            >
                <div className="text-xl font-bold mb-6">Dashboard</div>
                <Link to="/" className="block mb-4 flex items-center space-x-3">
                    <Home />
                    <span>Home</span>
                </Link>
                <Link to="" className="block mb-4 flex items-center space-x-3">
                    <User />
                    <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="block text-red-600 flex items-center space-x-3">
                    <LogOut />
                    <span>Logout</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <nav className="bg-gray-800 text-white p-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">Dashboard</div>

                        <div className="lg:hidden">
                            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                                {isMobileMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
