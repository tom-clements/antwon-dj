import type { State } from 'common/services/createStore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreadcrumbState {
    stack: string[];
}

const initialState = (): BreadcrumbState => ({
    stack: [],
});

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState: initialState(),
    reducers: {
        push: (state, action: PayloadAction<string>) => ({
            stack: [...state.stack, action.payload],
        }),
        popTo: (state, action: PayloadAction<number>) => ({
            ...state,
            stack: state.stack.slice(0, action.payload + 1),
        }),
        reset: () => initialState(),
    },
});

export const breadcrumbActions = breadcrumbSlice.actions;

export const selectBreadcrumbStack = (state: State) => state.breadcrumb.stack;
