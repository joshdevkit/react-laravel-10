import React from 'react'

export default function AvatarUpload({
    user,
    avatarError,
    avatarPreview,
    handleAvatarChange,
    handleSubmitAvatar,
    fileInputRef,
    baseUrl
}) {
    return (
        <form onSubmit={handleSubmitAvatar} className="flex flex-col items-center">
            <img
                src={
                    avatarPreview ? avatarPreview : user?.avatar_url ? `${baseUrl}/storage/${user.avatar_url}` : '/default-avatar.png'
                }
                alt="Avatar"
                className="w-24 h-24 rounded-full object-contain bg-gray-400 border-2 border-gray-500 shadow-lg mb-4"
            />
            <label className="block w-full text-center">
                {avatarError && <p className="text-sm text-red-500 mb-2">{avatarError}</p>}
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
    );
}
