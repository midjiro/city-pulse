import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../sass/main.scss';

function App() {
    return (
        <>
            <ToastContainer />
            <Navbar />
            <main className='container'>
                <Outlet />
            </main>
        </>
    );
}

export default App;
