import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';

export interface SongDto {
    'song_uri': string;
    'song_artist': string;
    'song_name': string;
    'song_album_url': string;
}

interface SongsForSearchResponseDto {
    'songs': SongDto[];
}

export const spotifySearchApi = createApi({
    reducerPath: 'spotifySearchApi',
    baseQuery: getApiBaseQuery(),
    tagTypes: ['SpotifySearch'],
    endpoints: (builder) => ({
        getSongsForSearch: builder.query<SongDto[], { query: string, roomId: string }>({
            query: ({ query, roomId }) => ({ url: `room/${roomId}/search?query=${query}` }),
            transformResponse: (response: SongsForSearchResponseDto) => response.songs,
            providesTags: ['SpotifySearch'],
        }),
    }),
});
