import { useState, useEffect } from 'react';
import * as services from 'services/user';

export const useUserInfo = (userId) => {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setPending(true);
            setError(null);
            try {
                const res = await services.getUserById(userId);
                setUser(res);
            } catch (error) {
                setError(error);
            } finally {
                setPending(false);
            }
        };

        if (userId) {
            fetchUserInfo().catch((error) => console.error(error));
        }
    }, [userId]);

    return { user, error, pending };
};
