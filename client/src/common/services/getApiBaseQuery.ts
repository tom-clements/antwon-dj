import type { State } from 'common/services/createStore';
import { getIsLocal } from 'config/getIsLocal';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { authActions, selectAuthState } from 'user/services/authSlice';
import { TokenDto } from 'user/dtos/TokenDto';
import { toastErrorActions } from 'toastError/services/toastErrorSlice';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

const isLocal = getIsLocal();

const baseQuery = fetchBaseQuery({
    baseUrl: getApiBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
        const { accessToken, idToken } = selectAuthState(getState() as State);
        if (accessToken && idToken) {
            if (isLocal) {
                headers.set('authorization', `Bearer ${idToken}`);
                headers.set('local_authorization', accessToken);
            } else {
                headers.set('authorization', `Bearer ${accessToken}`);
            }
        }

        return headers;
    },
});

const withReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // Try refreshing the tokens on any 401's once if we already have credentials
    if (result.error && result.error.status === 401) {
        const auth = selectAuthState(api.getState() as State);
        if (auth.idToken || auth.accessToken) {
            const refreshResult = await baseQuery('/token', api, extraOptions);
            if (refreshResult.data) {
                api.dispatch(authActions.refreshToken(refreshResult.data as TokenDto));
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(toastErrorActions.set(ToastErrorCode.RefreshFailed));
                api.dispatch(authActions.reset());
            }
        } else {
            api.dispatch(toastErrorActions.set(ToastErrorCode.Unauthorized));
        }
    }

    return result;
}

export const getApiBaseQuery = () => withReauth;
