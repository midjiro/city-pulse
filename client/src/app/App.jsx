import { Navbar } from 'components/Navbar';
import { Outlet } from 'react-router-dom';

import '../sass/main.scss';
import { SearchModal } from 'components/Search';
import { useRef } from 'react';

function App() {
    const searchModalRef = useRef();
    return (
        <>
            <Navbar searchModalRef={searchModalRef} />
            <main className='container'>
                <Outlet />
            </main>
            <SearchModal ref={searchModalRef} />
        </>
    );
}

export default App;
