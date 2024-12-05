import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import instance from '../../axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError('Passwords do not match');
            return;
        }

        setIsSubmitting(true);

        try {
            await instance.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Register error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <Card className="w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create your account</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        error={errors.name}
                    />
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
                    <Input
                        label="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        placeholder="Confirm your password"
                        error={errors.password_confirmation}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Registering Account...' : 'Register'}
                    </Button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to="/" className="text-blue-500">Sign in</Link>
                </p>
            </Card>
        </div>
    );
};

export default Register;
