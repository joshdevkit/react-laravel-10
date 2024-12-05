import React from 'react';
import Input from '../../../components/Input';

export default function ProfileTab({
    user,
    formData,
    handleInputChange,
    handleSubmitProfileInfo,
    errors,
}) {
    return (
        <div>
            <form onSubmit={handleSubmitProfileInfo}>
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name || ''}
                    onChange={handleInputChange}
                    error={errors.name && errors.name[0]}
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email || user?.email || ''}
                    onChange={handleInputChange}
                    error={errors.email && errors.email[0]}
                    disabled={true}
                />

                <button
                    type="submit"
                    className="mt-4 w-36 md:w-36 sm:w-full xs:w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Update Info
                </button>
            </form>
        </div>
    );
}
