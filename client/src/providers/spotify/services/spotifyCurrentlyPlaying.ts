import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { SongDto } from 'providers/spotify/services/spotifySearchApi';

export const spotifyCurrentlyPlayingApi = createApi({
    reducerPath: 'spotifyCurrentlyPlayingApi',
    baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
    tagTypes: ['SpotifyCurrentlyPlaying'],
    endpoints: (builder) => ({
        get: builder.query<SongDto, string>({
            query: roomId => ({ url: `room/${roomId}/playing` }),
            providesTags: ['SpotifyCurrentlyPlaying'],
        }),
    }),
});
