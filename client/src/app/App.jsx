import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import '../sass/main.scss';

function App() {
    return (
        <>
            {/* <Navbar /> */}
            <main className='container'>
                <Outlet />
            </main>
        </>
    );
}

export default App;
