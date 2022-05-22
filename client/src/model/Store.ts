import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { errorSlice } from 'model/slices/ErrorSlice';
import { RoomPortalSlice } from 'model/slices/RoomPortalSlice';
import { UserSlice } from 'model/User';
import { spotifyCurrentlyPlayingApi } from 'service/SpotifyCurrentlyPlaying';
import { spotifySearchApi } from 'service/SpotifySearchApi';
import { roomApi } from 'service/RoomApi';
import { themeSlice } from 'styles/services/themeSlice';

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            error: errorSlice.reducer,
            theme: themeSlice.reducer,
            roomPortal: RoomPortalSlice.reducer,
            user: UserSlice.reducer,
            [spotifyCurrentlyPlayingApi.reducerPath]: spotifyCurrentlyPlayingApi.reducer,
            [spotifySearchApi.reducerPath]: spotifySearchApi.reducer,
            [roomApi.reducerPath]: roomApi.reducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...[
            spotifyCurrentlyPlayingApi.middleware,
            spotifySearchApi.middleware,
            roomApi.middleware,
        ]),
        preloadedState: preloadedState,
    });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store['getState']>;
export type AppDispatch = Store['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
