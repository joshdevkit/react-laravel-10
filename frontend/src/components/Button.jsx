import React from 'react';

const Button = ({ children, type = 'button', onClick, className = '', ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
