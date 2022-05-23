import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { State } from 'common/services/createStore';

enum UserStatus {
    Empty = 'empty',
    Signed = 'signed',
}

interface UserEmptyState {
    kind: UserStatus.Empty;
}

interface UserDetails {
    cognitoId: string;
}

interface UserSignedState extends UserDetails {
    kind: UserStatus.Signed;
}

type UserState<S = UserStatus> = S extends keyof S
    ? Extract<UserEmptyState | UserSignedState, { kind: S }>
    : { kind: S };

function isOfUserStatus<S extends UserStatus>(state: UserState, kind: S): state is UserState<S> {
    return state.kind === kind;
}

function getInitialUserState(): UserState {
    return { kind: UserStatus.Empty };
}

export const userSlice = createSlice({
    name: 'user',
    initialState: getInitialUserState(),
    reducers: {
        signIn: (_state, action: PayloadAction<UserDetails>) => ({ kind: UserStatus.Signed, ...action.payload }),
        signOut: () => ({ kind: UserStatus.Empty }),
    },
});

export const { signIn, signOut } = userSlice.actions;

export const isSignedIn = (state: State): boolean => isOfUserStatus(state.user, UserStatus.Signed);
