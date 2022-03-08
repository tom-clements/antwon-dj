import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'service/Config';
import { SongDto } from 'service/SpotifySearchApi';

interface SongsForSearchResponseDto {
    'song': SongDto;
}

export const spotifyCurrentlyPlayingApi = createApi({
    reducerPath: 'spotifyCurrentlyPlayingApi',
    baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
    tagTypes: ['SpotifyCurrentlyPlaying'],
    endpoints: (builder) => ({
        get: builder.query<SongDto, string>({
            query: roomId => ({ url: `spotifyCurrentlyPlaying?room_guid=${roomId}` }),
            transformResponse: (response: SongsForSearchResponseDto) => response.song,
            providesTags: ['SpotifyCurrentlyPlaying'],
        }),
    }),
});
