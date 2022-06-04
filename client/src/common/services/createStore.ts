import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { roomPortalSlice } from 'roomPortal/services/roomPortalSlice';
import { themeSlice } from 'styles/services/themeSlice';
import { toastErrorSlice } from 'toastError/services/toastErrorSlice';
import { userSlice } from 'user/services/userSlice';
import { roomApi } from 'room/services/roomApi';

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            roomPortal: roomPortalSlice.reducer,
            theme: themeSlice.reducer,
            toastError: toastErrorSlice.reducer,
            user: userSlice.reducer,
            [roomApi.reducerPath]: roomApi.reducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...[
            roomApi.middleware,
        ]),
        preloadedState: preloadedState,
    });
}

export type Store = ReturnType<typeof createStore>;
export type State = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];

export const useDispatch = () => _useDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = _useSelector;
