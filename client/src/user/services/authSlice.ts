import type { State } from 'common/services/createStore';
import { createSlice } from '@reduxjs/toolkit';
import { userApi } from 'user/services/userApi';
import { UserModel } from 'user/model/UserModel';
import { mapUserFromDto } from 'user/mappers/mapUserFromDto';

interface AuthState {
    user: UserModel | null;
    accessToken: string | null;
    idToken: string | null;
    loginAttempts: number;
}

const initialState = (): AuthState => ({
    user: null,
    accessToken: null,
    idToken: null,
    loginAttempts: 0,
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState(),
    reducers: {
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
