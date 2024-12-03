import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Card from './components/Card';
import Input from './components/Input';
import Button from './components/Button';
import { useAuth } from './context/AuthProvider';
import instance from './axios';

function App() {
    const { login, user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    if (user) {
        return <Navigate to="/home" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await instance.post('/login', {
                email,
                password,
            });

            const { access_token, user } = response.data;
            login(user, access_token);
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unknown error occurred. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signin to Start your session.</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        error={errors.email}
                    />
                    <Input
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        error={errors.password}
                    />
                    <Button type="submit">
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                </p>
            </Card>
        </div>
    );
}

export default App;
