import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '../../components/_auth/AuthenticatedLayout';
import EditProfileSkeleton from '../../components/skeletons/EditProfileSkeleton';
import Partials from './Partials';
import instance from '../../axios';
import { useAuth } from '../../context/AuthProvider';
export default function Edit() {


    const fileInputRef = useRef(null);

    const { baseUrl, access_token } = useAuth();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [selectedTab, setSelectedTab] = useState('profile');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [formData, setFormData] = useState(new FormData());
    const handleTabSwitch = (tab) => setSelectedTab(tab);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));

            const newFormData = new FormData();
            newFormData.append('avatar', file);
            setFormData(newFormData);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitProfileInfo = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.put('/profile', formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setUser(response.data.user);
            alert('Profile updated successfully!');
            setErrors({});
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleSubmitAvatar = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/update-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setAvatarPreview(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            fetchUser();

        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    useEffect(() => {
        if (access_token) {
            fetchUser();
        }
    }, [access_token]);

    const fetchUser = async () => {
        try {
            const response = await instance.get('/profile', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setUser(response.data.user);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    return (
        <AuthenticatedLayout title="Account Settings - Profile">
            <Partials title="Edit Profile">
                {user ? (
                    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                        <form onSubmit={handleSubmitAvatar} className="flex flex-col items-center">
                            <img
                                src={user?.avatar_url ? `${baseUrl()}/storage/${user.avatar_url}` : avatarPreview}
                                className="w-32 h-32 rounded-full object-contain bg-gray-400 border-2 border-gray-500 shadow-lg mb-4"
                            />

                            <label className="block">
                                <span className="text-sm font-medium text-gray-700">Upload Avatar</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                    onChange={handleAvatarChange}
                                    ref={fileInputRef}
                                />
                            </label>
                            <button
                                type="submit"
                                className="mt-4 w-36 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Update Avatar
                            </button>
                        </form>

                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">{user.name}</h2>
                            <p className="text-gray-600 mb-2">Email: {user.email}</p>
                            <div className="flex border-b border-gray-200 mb-4">
                                <button
                                    className={`px-4 py-2 -mb-px border-b-2 ${selectedTab === 'profile' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'
                                        }`}
                                    onClick={() => handleTabSwitch('profile')}
                                >
                                    Profile
                                </button>
                                <button
                                    className={`px-4 py-2 -mb-px border-b-2 ${selectedTab === 'password' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'
                                        }`}
                                    onClick={() => handleTabSwitch('password')}
                                >
                                    Password
                                </button>
                            </div>
                            {selectedTab === 'profile' && (
                                <div>
                                    <form onSubmit={handleSubmitProfileInfo}>
                                        <label className="block mb-4">
                                            <span className="text-sm font-medium text-gray-700">Name</span>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>}
                                        </label>

                                        <label className="block mb-4">
                                            <span className="text-sm font-medium text-gray-700">Email</span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
                                        </label>

                                        <button
                                            type="submit"
                                            className="mt-4 w-36 md:w-36 sm:w-full xs:w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                        >
                                            Update Info
                                        </button>
                                    </form>

                                </div>
                            )}
                            {selectedTab === 'password' && (
                                <div>
                                    <label className="block mb-4">
                                        <span className="text-sm font-medium text-gray-700">Current Password</span>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </label>
                                    <label className="block mb-4">
                                        <span className="text-sm font-medium text-gray-700">New Password</span>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </label>
                                    <label className="block mb-4">
                                        <span className="text-sm font-medium text-gray-700">Confirm Password</span>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <EditProfileSkeleton></EditProfileSkeleton>
                )}
            </Partials>
        </AuthenticatedLayout>
    );
}
