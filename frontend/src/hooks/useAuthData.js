import { useCallback } from 'react';

export const useAuthData = () => {
    const getAuthData = useCallback(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const identifier = localStorage.getItem('identifier') || sessionStorage.getItem('identifier');

        if (!token || !identifier) {
            throw new Error('Authentication data missing');
        }
        return { token, identifier };
    }, []);

    return { getAuthData };
};
