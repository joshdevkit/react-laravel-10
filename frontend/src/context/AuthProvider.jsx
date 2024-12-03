import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [access_token, setAccessToken] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('access_token');

        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser)); // Parse the user object from localStorage
            setAccessToken(savedToken); // Set the access token
        }
    }, []);

    const login = (user, token) => {
        setUser(user);
        setAccessToken(token);
        localStorage.setItem('user', JSON.stringify(user)); // Store user object in localStorage
        localStorage.setItem('access_token', token); // Store access token in localStorage
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    };

    return (
        <AuthContext.Provider value={{ user, access_token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
