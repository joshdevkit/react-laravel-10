import React from 'react';

const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white border border-gray-300 p-6 rounded-lg shadow-md ${className}`}>
            {children}
        </div>
    );
};

export default Card;
