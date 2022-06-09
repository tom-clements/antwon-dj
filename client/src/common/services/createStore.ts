import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from 'user/services/authSlice';
import { breadcrumbSlice } from 'common/services/breadcrumbSlice';
import { roomPortalSlice } from 'roomPortal/services/roomPortalSlice';
import { themeSlice } from 'styles/services/themeSlice';
import { toastErrorSlice } from 'toastError/services/toastErrorSlice';
import { userSlice } from 'user/services/userSlice';
import { roomApi } from 'room/services/roomApi';
import { userApi } from 'user/services/userApi';

const apiReducers = {
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    breadcrumb: breadcrumbSlice.reducer,
    roomPortal: roomPortalSlice.reducer,
    theme: themeSlice.reducer,
    toastError: toastErrorSlice.reducer,
    user: userSlice.reducer,
    ...apiReducers,
});

const apiMiddleware = [
    roomApi.middleware,
    userApi.middleware,
];

const middleware = [
    ...apiMiddleware,
];

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [
        ...Object.keys(apiReducers)
    ],
};

export function createStore() {
    return configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(...middleware)
    });
}

export type Store = ReturnType<typeof createStore>;
export type State = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];

export const useDispatch = () => _useDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = _useSelector;
