import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from 'features/user/userReducer';
import publicationReducer from 'features/publication/publicationReducer';
import filterReducer from 'features/filter/filterSlice';
import notificationReducer from 'features/notification/notificationReducer';
import storage from 'redux-persist/lib/storage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import draftsReducer from 'features/drafts/draftsSlice';

const isInDevelopmentMode =
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['draftsReducer'],
};

const rootReducer = combineReducers({
    userReducer,
    publicationReducer,
    filterReducer,
    notificationReducer,
    draftsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        isInDevelopmentMode
            ? [
                  ...getDefaultMiddleware({
                      serializableCheck: {
                          ignoredActions: [
                              FLUSH,
                              REHYDRATE,
                              PAUSE,
                              PERSIST,
                              PURGE,
                              REGISTER,
                          ],
                      },
                  }),
                  logger,
              ]
            : getDefaultMiddleware({
                  serializableCheck: {
                      ignoredActions: [
                          FLUSH,
                          REHYDRATE,
                          PAUSE,
                          PERSIST,
                          PURGE,
                          REGISTER,
                      ],
                  },
              }),
});

export const persistor = persistStore(store);
