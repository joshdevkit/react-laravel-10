
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, User, LogOut, Menu, X } from 'lucide-react';
import instance from '../../axios';
import { useAuth } from '../../context/AuthProvider';


export default function AuthenticatedLayout({ children, title }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { logout } = useAuth();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        const token = localStorage.getItem('access_token');

        if (token) {
            instance
                .post("/logout", {}, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    logout();
                })
                .catch(error => {
                    console.error('Logout failed:', error);
                });
        } else {
            console.error("No token found.");
        }
    };
    return (
        <div className="flex h-screen">
            <div className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 w-64 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64`}>
                <div className="text-xl font-bold mb-6">Laravel 10 React</div>
                <Link to="/" className="block mb-4 flex items-center space-x-3">
                    <Home />
                    <span>Home</span>
                </Link>
                <Link to="/profile" className="block mb-4 flex items-center space-x-3">
                    <User />
                    <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="block text-red-600 flex items-center space-x-3">
                    <LogOut />
                    <span>Logout</span>
                </button>
            </div>

            <div className="flex-1 flex flex-col">
                <nav className="bg-gray-800 text-white p-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">{title}</div>
                        <button onClick={toggleSidebar} className="lg:hidden">
                            {isSidebarOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </nav>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
