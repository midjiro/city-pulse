import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Profile } from 'pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentUser } from 'features/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from 'features/user/userAPI';
import { CreatePost } from 'pages/CreatePost';
import { CreateEvent } from 'pages/CreateEvent';
import { Protected } from 'components/Protected';
import { Settings } from 'pages/Settings';
import { PostDetails } from 'pages/PostDetails';
import { EventDetails } from 'pages/EventDetails';
import { Navbar } from 'components/Navbar';
import { MapView } from 'pages/MapView';

export const Router = () => {
    const [user] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(autoLogin());
    }, [user, dispatch]);

    return (
        <BrowserRouter>
            <ToastContainer position='top-center' limit={1} />
            <Navbar user={user} />

            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='sign-in' element={<SignIn user={user} />} />
                    <Route path='sign-up' element={<SignUp user={user} />} />
                    <Route
                        path='post/:publicationID'
                        element={<PostDetails />}
                    />
                    <Route
                        path='event/:publicationID'
                        element={<EventDetails />}
                    />
                    <Route
                        path='event/map-view/:publicationID'
                        element={<MapView />}
                    />
                    <Route
                        path='post/create'
                        element={
                            <Protected>
                                <CreatePost />
                            </Protected>
                        }
                    />
                    <Route
                        path='event/create'
                        element={
                            <Protected>
                                <CreateEvent />
                            </Protected>
                        }
                    />

                    <Route path='user/:userID' element={<Profile />} />
                    <Route
                        path='settings'
                        element={
                            <Protected>
                                <Settings />
                            </Protected>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
