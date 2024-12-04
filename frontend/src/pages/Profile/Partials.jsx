import React from 'react';

export default function Partials({ children, title }) {
    return (
        <div className="p-6 rounded bg-white shadow-md">
            <h1 className="text-xl font-bold mb-4">{title}</h1>
            <div>{children}</div>
        </div>
    );
}
