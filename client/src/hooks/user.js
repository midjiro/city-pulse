import { useState, useEffect } from 'react';
import { User } from 'requests/user';

export const useUserInfo = (userId) => {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            setPending(true);
            setError(null);
            try {
                const res = await User.getUserById(userId);
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
