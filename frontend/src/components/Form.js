import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Form = ({
    fields,
    onSubmit,
    errorMessage,
    successMessage,
    setShowPassword,
    showPassword,
    setShowConfirmPassword,
    showConfirmPassword,
    buttonText, 
}) => {
    return (
        <form onSubmit={onSubmit}>
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label
                        htmlFor={field.name}
                        className="block text-gray-600 font-medium mb-2 text-left"
                    >
                        {field.label}
                    </label>
                    <div className="relative">
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            value={field.value}
                            onChange={field.onChange}
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500"
                            placeholder={field.placeholder}
                        />
                        {field.name === 'password' && (
                            <button
                                type="button"
                                className="absolute right-4 top-3 text-gray-500"
                                onClick={setShowPassword}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        )}
                        {field.name === 'confirmPassword' && (
                            <button
                                type="button"
                                className="absolute right-4 top-3 text-gray-500"
                                onClick={setShowConfirmPassword}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        )}
                    </div>
                </div>
            ))}

            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}

            <button
                type="submit"
                className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
                {buttonText} 
            </button>
        </form>
    );
};

export default Form;
