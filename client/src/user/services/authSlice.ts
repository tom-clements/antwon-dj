import type { State } from 'common/services/createStore';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'user/services/userApi';
import { UserModel } from 'user/model/UserModel';
import { mapUserFromDto } from 'user/mappers/mapUserFromDto';
import { TokenDto } from 'user/dtos/TokenDto';
import { isLoggedIn } from 'user/predicates/isLoggedIn';

interface AuthState {
    user: UserModel | null;
    accessToken: string | null;
    idToken: string | null;
    loginAttempts: number;
    refreshCount: number;
}

const initialState = (): AuthState => ({
    user: null,
    accessToken: null,
    idToken: null,
    loginAttempts: 0,
    refreshCount: 0,
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState(),
    reducers: {
        refreshToken: (state, { payload }: PayloadAction<TokenDto>) => ({
            ...state,
            idToken: payload.id_token,
            accessToken: payload.access_token,
            refreshCount: state.refreshCount + 1,
        }),
        addLoginAttempt: state => ({
            ...state,
            loginAttempts: state.loginAttempts + 1,
        }),
        resetLoginAttempts: state => ({
            ...state,
            loginAttempts: 0,
        }),
        reset: () => initialState(),
    },
    extraReducers: builder => {
        builder.addMatcher(
            userApi.endpoints.token.matchFulfilled,
            (state, { payload }) => {
                state.idToken = payload.id_token;
                state.accessToken = payload.access_token;
            });
        builder.addMatcher(
            userApi.endpoints.user.matchFulfilled,
            (state, { payload }) => {
                state.user = mapUserFromDto(payload);
            });
    },
});

export const authActions = authSlice.actions;

export const selectAuthState = (state: State) => state.auth;
export const selectUser = (state: State) => state.auth.user;
export const selectIsLoggedIn = (state: State) => isLoggedIn(state.auth.user);
