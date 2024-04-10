import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'Router';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import { getPostList } from 'features/post/postAPI';
import { getEventList } from 'features/event/eventAPI';
import 'normalize.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getPostList());
store.dispatch(getEventList());

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
);
