// Edit.js
import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '../../components/_auth/AuthenticatedLayout';
import EditProfileSkeleton from '../../components/skeletons/EditProfileSkeleton';
import Partials from './Partials';
import instance from '../../axios';
import { useAuth } from '../../context/AuthProvider';
import AvatarUpload from './_parts/AvatarUpload';
import ProfileTab from './_parts/ProfileTab';
import PasswordTab from './_parts/PasswordTab';
import TabControl from './_parts/TabControl';

export default function Edit() {
    //USER AUTH
    const { baseUrl, access_token } = useAuth();
    //CLEARNING INPUT
    const fileInputRef = useRef(null);

    //TAB CONTROL
    const handleTabSwitch = (tab) => setSelectedTab(tab);
    const [selectedTab, setSelectedTab] = useState('profile');


    //AUTH USER DETAIL
    const [user, setUser] = useState(null);

    //GENERAL INPUT ERROR HANDLERS
    const [errors, setErrors] = useState({});

    //AVATAR ERROR HANDLER - PREVIEW
    const [avatarError, setAvatarError] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    //FORM DATA FOR AVATAR
    const [formData, setFormData] = useState(new FormData());
    const [avatarFormData, setAvatarFormData] = useState(new FormData());
    //AVATAR CHANGE HANDLER
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));  // Update the preview
            const newAvatarFormData = new FormData();
            newAvatarFormData.append('avatar', file);
            setAvatarFormData(newAvatarFormData);  // Prepare the form data for submission
        }
    };

    //INPUT AVATAR CHANGE - VALUE HANDLER
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //FUNCTION TO SUBMIT AVATAR CHANGE
    const handleSubmitAvatar = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/update-avatar', avatarFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setAvatarPreview(null);
            setAvatarError(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            fetchUser();
        } catch (error) {
            console.error('Error uploading avatar:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                setAvatarError(error.response.data.errors.avatar?.[0] || 'An unexpected error occurred.');
            } else {
                setAvatarError('An unexpected error occurred.');
            }
        }
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
            setErrors({});
            setFormData('')
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };



    const handleInputPasswordChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting Password Data:', formData);
            alert('Password updated successfully!');
        } catch (error) {
            console.error('Error updating password:', error);
            setErrors({
                currentPassword: ['Current password is incorrect'],
                newPassword: ['New password is too short'],
                confirmPassword: ['Passwords do not match'],
            });
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

    const tabs = ['profile', 'password'];

    return (
        <AuthenticatedLayout title="Account Settings - Profile">
            <Partials title="Edit Profile">
                {user ? (
                    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                        <AvatarUpload
                            user={user}
                            avatarError={avatarError}
                            avatarPreview={avatarPreview}
                            handleAvatarChange={handleAvatarChange}
                            handleSubmitAvatar={handleSubmitAvatar}
                            fileInputRef={fileInputRef}
                            baseUrl={baseUrl()}
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">{user.name}</h2>
                            <p className="text-gray-600 mb-2">Email: {user.email}</p>

                            <TabControl selectedTab={selectedTab} tabs={tabs} handleTabSwitch={handleTabSwitch} />

                            {selectedTab === 'profile' && (
                                <ProfileTab
                                    user={user}
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSubmitProfileInfo={handleSubmitProfileInfo}
                                    errors={errors}
                                />
                            )}
                            {selectedTab === 'password' && (
                                <form onSubmit={handleSubmitPassword}>
                                    <PasswordTab
                                        formData={formData}
                                        handleInputChange={handleInputPasswordChange}
                                        errors={errors}
                                    />
                                    <button
                                        type="submit"
                                        className="w-52 py-2 px-4 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                                    >
                                        Update Password
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                ) : (
                    <EditProfileSkeleton />
                )}
            </Partials>
        </AuthenticatedLayout>
    );
}
