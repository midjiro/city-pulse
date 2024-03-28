import { useEffect } from 'react';
import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { selectCurrentUser } from 'features/user/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from 'features/user/userAPI';
import 'react-toastify/dist/ReactToastify.css';
import '../sass/main.scss';

function App() {
    const [user] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(autoLogin());
    }, [user]);
    return (
        <>
            <ToastContainer position='top-center' limit={1} />
            <Navbar />
            <main className='container'>
                <Outlet />
            </main>
        </>
    );
}

export default App;
