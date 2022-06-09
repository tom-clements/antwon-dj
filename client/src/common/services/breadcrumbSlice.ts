import type { State } from 'common/services/createStore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BreadcrumbState {
    stack: string[];
}

const initialState = (): BreadcrumbState => ({
    stack: [],
});

const ignorePaths = [
    '/login',
    '/logout'
];

export const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState: initialState(),
    reducers: {
        push: (state, { payload }: PayloadAction<string>) => {
            if (ignorePaths.includes(payload)) return state;
            return {
                ...state,
                stack: [...state.stack, payload],
            };
        },
        popTo: (state, { payload }: PayloadAction<number>) => ({
            ...state,
            stack: state.stack.slice(0, payload + 1),
        }),
        reset: () => initialState(),
    },
});

export const breadcrumbActions = breadcrumbSlice.actions;

export const selectBreadcrumbStack = (state: State) => state.breadcrumb.stack;
