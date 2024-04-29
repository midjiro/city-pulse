import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from 'features/user/userReducer';
import publicationReducer from 'features/publication/publicationReducer';
import filterReducer from 'features/filter/filterSlice';

export const store = configureStore({
    reducer: {
        userReducer,
        publicationReducer,
        filterReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
