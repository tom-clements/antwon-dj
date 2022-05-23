import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'config/getApiBaseUrl';

export const getApiBaseQuery = () => {
    return fetchBaseQuery({ baseUrl: getApiBaseUrl() });
};
