import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useNotifications = () => {
    const success = useCallback((message) => toast.success(message), []);
    const error = useCallback((message) => toast.error(message), []);
    const info = useCallback((message) => toast.info(message), []);

    return { success, error, info };
};