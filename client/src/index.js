import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'Router';
import { Provider } from 'react-redux';
import { APIProvider } from '@vis.gl/react-google-maps';
import { store } from 'app/store';
import { getPublicationList } from 'features/publication/publicationAPI';
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getPublicationList());

root.render(
    <React.StrictMode>
        <APIProvider apiKey={process.env.REACT_APP_MAP_API_KEY}>
            <Provider store={store}>
                <Router />
            </Provider>
        </APIProvider>
    </React.StrictMode>
);
