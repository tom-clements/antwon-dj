import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';

const tagTypes = [
    'user',
];

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: getApiBaseQuery(),
    tagTypes,
    endpoints: (builder) => ({
        tokens: builder.query<void, void>({
            query: () => ({ url: '/user/token', method: 'POST', credentials: 'include' }),
            providesTags: ['login'],
        }),
    }),
});
