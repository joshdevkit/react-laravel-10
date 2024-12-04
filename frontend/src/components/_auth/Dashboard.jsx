import React from 'react';
import AuthenticatedLayout from './AuthenticatedLayout';

const Dashboard = () => {
    return (
        <AuthenticatedLayout title={"Home - Dashboard"}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Card 1</h3>
                    <p className="text-gray-700">This is the first card content.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Card 2</h3>
                    <p className="text-gray-700">This is the second card content.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Card 3</h3>
                    <p className="text-gray-700">This is the third card content.</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Card 4</h3>
                    <p className="text-gray-700">This is the fourth card content.</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
