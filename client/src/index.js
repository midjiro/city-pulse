import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from 'Router';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import 'normalize.css';
import { getPostList } from 'features/post/postAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(getPostList());

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
);
