import { useState, useCallback } from 'react';
import api from '../utils/api';

export const useMessages = (getAuthData) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const { token } = getAuthData();

            const response = await api.get('/messages', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [getAuthData]);

    const sendMessage = useCallback(async (messageText) => {
        if (!messageText.trim()) return;

        try {
            const { token, identifier } = getAuthData();

            const messageObj = {
                text: messageText.trim(),
                identifier,
                timestamp: new Date().toISOString(),
                user: identifier
            };

            const response = await api.post('/messages', messageObj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            setMessages(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Failed to send message:', error);
            setError('Failed to send message. Please try again.');
        }
    }, [getAuthData]);

    return { messages, isLoading, error, fetchMessages, sendMessage };
};
