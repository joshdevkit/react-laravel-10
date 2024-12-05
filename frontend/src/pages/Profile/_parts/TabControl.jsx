import React from 'react'

export default function TabControl({ selectedTab, tabs, handleTabSwitch }) {
    return (
        <div className="flex border-b border-gray-200 mb-4">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`px-4 py-2 -mb-px border-b-2 ${selectedTab === tab ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-600'
                        }`}
                    onClick={() => handleTabSwitch(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
}
