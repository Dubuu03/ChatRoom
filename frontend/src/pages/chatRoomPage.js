import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import { useAuthData } from '../hooks/useAuthData';
import { useMessages } from '../hooks/useMessages';
import { usePolling } from '../hooks/usePolling';

const ChatRoom = () => {
    const { getAuthData } = useAuthData();
    const navigate = useNavigate();
    const messageEndRef = useRef(null);
    const [newMessage, setNewMessage] = useState('');

    // Get messages and error handling
    const { messages, isLoading, error, fetchMessages, sendMessage } = useMessages(getAuthData);

    // Poll for new messages
    usePolling(fetchMessages);

    const handleLogout = useCallback(() => {
        // Remove authentication data from storage
        ['token', 'identifier'].forEach(key => {
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
        });
        navigate('/login');
    }, [navigate]);

    // Initialize component and fetch messages
    useEffect(() => {
        try {
            // Attempt to fetch messages
            getAuthData();  // If no auth data, this will throw an error
            fetchMessages(); // Fetch messages if authenticated
        } catch (error) {
            // If authentication fails or error occurs, redirect to login
            console.error('Authentication failed or error occurred:', error);
            navigate('/login');
        }
    }, [getAuthData, navigate, fetchMessages]);

    useEffect(() => {
        if (messages.length > 0) {
            // Scroll to the bottom when new messages arrive
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = useCallback(() => {
        if (newMessage.trim()) {
            sendMessage(newMessage);
            setNewMessage('');
        }
    }, [newMessage, sendMessage]);

    // Show loading state while data is being fetched
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <ChatHeader identifier={getAuthData().identifier} onLogout={handleLogout} />
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        {error}
                    </div>
                )}
                <ChatMessages messages={messages} identifier={getAuthData().identifier} messageEndRef={messageEndRef} />
                <ChatInput
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    onSendMessage={handleSendMessage}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};

export default ChatRoom;
