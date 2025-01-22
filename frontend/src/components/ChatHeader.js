import React from 'react';

const ChatHeader = ({ identifier, onLogout }) => {
    return (
        <div className="bg-indigo-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-white text-xl font-semibold">Chat Room</h2>
            <div className="flex items-center space-x-4">
                <span className="text-white file:text-sm">Welcome, {identifier}</span>
                <button
                    onClick={onLogout}
                    className="text-white bg-indigo-700 px-3 py-1 rounded hover:bg-indigo-800"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;
