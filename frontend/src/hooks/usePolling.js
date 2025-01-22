import { useEffect } from 'react';

export const usePolling = (fetchMessages) => {
    useEffect(() => {
        const pollInterval = setInterval(fetchMessages, 30000);
        return () => clearInterval(pollInterval);
    }, [fetchMessages]);
};
