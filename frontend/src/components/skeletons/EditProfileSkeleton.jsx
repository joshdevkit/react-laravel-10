import React from 'react'

export default function EditProfileSkeleton() {
    return (
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 animate-pulse">
            <div className="flex flex-col items-center">
                <div className="w-36 h-36 rounded-full bg-gray-200 mb-4 border-4 border-gray-300"></div>
                <div className="w-full h-6 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded-md mb-4 w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-1/3"></div>
                <div className="flex border-b border-gray-300 mb-4">
                    <div className="h-8 bg-gray-200 rounded-t-md w-20 mr-4"></div>
                    <div className="h-8 bg-gray-200 rounded-t-md w-20"></div>
                </div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-full"></div>
                    <div className="h-4 bg-gray-200 rounded-md w-2/3"></div>
                </div>
            </div>
        </div>
    )
}
