import type { State } from 'common/services/createStore';
import type { ToastErrorCode } from 'toastError/model/ToastErrorCode';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
    code: ToastErrorCode | null;
}

const initialState = (): ErrorState => ({
    code: null,
});

export const toastErrorSlice = createSlice({
    name: 'error',
    initialState: initialState(),
    reducers: {
        set: (_, action: PayloadAction<ToastErrorCode>) => ({
            code: action.payload,
        }),
        clear: () => initialState(),
    },
});

export const toastErrorActions = toastErrorSlice.actions;

export const selectToastErrorCode = (state: State) => state.toastError.code;
