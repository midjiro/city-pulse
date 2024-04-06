import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentUser } from 'features/user/userReducer';

export const Protected = ({ children }) => {
    const [user] = useSelector(selectCurrentUser);
    return user ? children : <Navigate to='/' />;
};
