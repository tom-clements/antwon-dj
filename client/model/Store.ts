import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { errorSlice } from 'model/slices/ErrorSlice';
import { RoomPortalSlice } from 'model/slices/RoomPortalSlice';
import { UserSlice } from 'model/User';
import { spotifyCurrentlyPlayingApi } from 'model/service/SpotifyCurrentlyPlaying';
import { spotifySearchApi } from 'model/service/SpotifySearchApi';
import { roomApi } from 'model/service/RoomApi';

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            error: errorSlice.reducer,
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
