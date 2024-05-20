import { Outlet } from 'react-router-dom';
import '../sass/main.scss';

function App() {
    return (
        <>
            <main className="container">
                <Outlet />
            </main>
        </>
    );
}

export default App;
