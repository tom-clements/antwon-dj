import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "model/User";

export function createStore(preloadedState: any) {
    return configureStore({
        reducer: {
            user: UserSlice.reducer,
        },
        preloadedState: preloadedState,
    });
}

export type Store = ReturnType<typeof createStore>;
export type RootState = ReturnType<Store["getState"]>;
export type AppDispatch = Store["dispatch"];
