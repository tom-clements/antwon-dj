import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';
import { TokenDto } from 'user/dtos/TokenDto';
import { UserDto } from 'user/dtos/UserDto';

const tagTypes = [
    'user',
];

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: getApiBaseQuery(),
    tagTypes,
    endpoints: builder => ({
        token: builder.query<TokenDto, void>({
            query: () => ({ url: '/user/token', credentials: 'include' }),
            providesTags: ['user'],
        }),
        user: builder.query<UserDto, void>({
            query: () => ({ url: '/user/info' }),
            providesTags: ['user'],
        }),
    }),
});
