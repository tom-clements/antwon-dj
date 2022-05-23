import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';
import { SongDto } from 'providers/spotify/services/spotifySearchApi';

export const spotifyCurrentlyPlayingApi = createApi({
    reducerPath: 'spotifyCurrentlyPlayingApi',
    baseQuery: getApiBaseQuery(),
    tagTypes: ['SpotifyCurrentlyPlaying'],
    endpoints: (builder) => ({
        get: builder.query<SongDto, string>({
            query: roomId => ({ url: `room/${roomId}/playing` }),
            providesTags: ['SpotifyCurrentlyPlaying'],
        }),
    }),
});
