import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from 'features/user/userReducer';

export const store = configureStore({
    reducer: {
        userReducer,
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});
