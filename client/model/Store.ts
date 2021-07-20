import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "model/User";
import { roomApi } from "model/service/RoomApi";

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            user: UserSlice.reducer,
            [roomApi.reducerPath]: roomApi.reducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(...[
            roomApi.middleware,
        ]),
        preloadedState: preloadedState,
    });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
