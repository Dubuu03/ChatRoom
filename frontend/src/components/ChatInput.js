import React from 'react';

const ChatInput = ({ newMessage, setNewMessage, onSendMessage }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
        }
    };

    return (
        <div className="bg-gray-100 p-4 flex items-center space-x-2">
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type a message"
            />
            <button
                onClick={onSendMessage}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
