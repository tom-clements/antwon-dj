import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'model/Store';
import { ErrorCode } from 'model/enums/ErrorCode';

interface ErrorState {
    code: ErrorCode | null;
}

function getInitialErrorState(): ErrorState {
    return {
        code: null,
    };
}

function mapErrorCodeState(_initialState: ErrorState, code: ErrorCode): ErrorState {
    return { code };
}

export const errorSlice = createSlice({
    name: 'error',
    initialState: getInitialErrorState(),
    reducers: {
        setError: (state, action: PayloadAction<ErrorCode>) => mapErrorCodeState(state, action.payload),
        clearError: () => getInitialErrorState(),
    },
});

export const { setError, clearError } = errorSlice.actions;

export const selectErrorCode = (state: RootState) => state.error.code;
