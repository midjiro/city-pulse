import { notificationActions } from 'features/notification/notificationReducer';
import { selectCurrentUser } from 'features/selectors';
import { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
    const [user] = useSelector(selectCurrentUser);
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const newSocket = io(process.env.REACT_APP_SOCKET_ENDPOINT, {
            withCredentials: true,
        });

        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [user]);

    useEffect(() => {
        socket?.on('recv-notification', (notification) =>
            dispatch(notificationActions.addNotification(notification))
        );

        return () => socket?.removeAllListeners('recv-notification');
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
