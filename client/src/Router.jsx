import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home';
import App from 'app/App';
import { SignIn } from 'pages/SignIn';
import { SignUp } from 'pages/SignUp';
import { Profile } from 'pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectCurrentUser } from 'features/user/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from 'features/user/userAPI';
import { CreatePost } from 'pages/CreatePost';
import { CreateEvent } from 'pages/CreateEvent';
import { Protected } from 'components/Protected';
import { ProfileSettings } from 'pages/ProfileSettings';
import { ProfilePublications } from 'pages/ProfilePublications';
import { PostDetails } from 'pages/PostDetails';
import { EventDetails } from 'pages/EventDetails';

export const Router = () => {
    const [user] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) dispatch(autoLogin());
    }, [user]);
    return (
        <BrowserRouter>
            <ToastContainer position='top-center' limit={1} />

            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    <Route path='sign-in' element={<SignIn />} />
                    <Route path='sign-up' element={<SignUp />} />
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
                    <Route path='post/:postID' element={<PostDetails />} />
                    <Route path='event/:eventID' element={<EventDetails />} />
                </Route>
                <Route
                    path='profile'
                    element={
                        <Protected>
                            <Profile />
                        </Protected>
                    }
                >
                    <Route
                        index
                        element={
                            <Protected>
                                <ProfilePublications />
                            </Protected>
                        }
                    />
                    <Route
                        path='settings'
                        element={
                            <Protected>
                                <ProfileSettings />
                            </Protected>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
