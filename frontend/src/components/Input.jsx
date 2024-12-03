const Input = ({ label, error, ...props }) => {
    return (
        <div className="mb-4">
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                {...props}
                className={`mt-1 block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
