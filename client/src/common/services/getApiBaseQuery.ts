import type { State } from 'common/services/createStore';
import { getIsLocal } from 'config/getIsLocal';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { selectAuthState } from 'user/services/authSlice';

const isLocal = getIsLocal();

export const getApiBaseQuery = () => {
    return fetchBaseQuery({
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
};
