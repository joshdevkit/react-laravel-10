import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';
import App from './App';
import Register from './pages/Auth/Register';
import Dashboard from './components/_auth/Dashboard';

import Edit from './pages/Profile/Edit';

const RouterComponent = () => {
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/home"
                    element={user ? <Dashboard /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={user ? <Edit /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default RouterComponent;
