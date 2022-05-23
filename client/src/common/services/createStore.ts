import { TypedUseSelectorHook, useDispatch as _useDispatch, useSelector as _useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { errorSlice } from 'common/services/errorSlice';
import { roomPortalSlice } from 'roomPortal/services/roomPortalSlice';
import { userSlice } from 'user/services/userSlice';
import { spotifyCurrentlyPlayingApi } from 'providers/spotify/services/spotifyCurrentlyPlaying';
import { spotifySearchApi } from 'providers/spotify/services/spotifySearchApi';
import { roomApi } from 'room/services/roomApi';
import { themeSlice } from 'styles/services/themeSlice';

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            error: errorSlice.reducer,
            roomPortal: roomPortalSlice.reducer,
            theme: themeSlice.reducer,
            user: userSlice.reducer,
            [roomApi.reducerPath]: roomApi.reducer,
            [spotifyCurrentlyPlayingApi.reducerPath]: spotifyCurrentlyPlayingApi.reducer,
            [spotifySearchApi.reducerPath]: spotifySearchApi.reducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...[
            roomApi.middleware,
            spotifyCurrentlyPlayingApi.middleware,
            spotifySearchApi.middleware,
        ]),
        preloadedState: preloadedState,
    });
}

export type Store = ReturnType<typeof createStore>;
export type State = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];

export const useDispatch = () => _useDispatch<Dispatch>();
export const useSelector: TypedUseSelectorHook<State> = _useSelector;
