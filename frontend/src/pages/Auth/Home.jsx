import React from 'react';
import Navbar from '../../components/Navbar';

const Homepage = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen bg-gray-100 py-6 px-4">
                <div className="container mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Homepage;
