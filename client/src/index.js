import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'Router';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { getPostList } from 'features/post/postAPI';
import { getEventList } from 'features/event/eventAPI';
import 'normalize.css';
import { APIProvider } from '@vis.gl/react-google-maps';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getPostList());
store.dispatch(getEventList());

root.render(
    <React.StrictMode>
        <APIProvider apiKey={process.env.REACT_APP_MAP_API_KEY}>
            <Provider store={store}>
                <Router />
            </Provider>
        </APIProvider>
    </React.StrictMode>
);
