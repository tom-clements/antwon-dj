import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";
import { SongDto } from "model/service/SpotifySearchApi";

interface SongsForSearchResponseDto {
    "song": SongDto;
}

export const spotifyCurrentlyPlayingApi = createApi({
    reducerPath: "spotifyCurrentlyPlayingApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["SpotifyCurrentlyPlaying"],
    endpoints: (builder) => ({
        get: builder.query<SongDto, string>({
            query: roomId => ({ url: `spotifyCurrentlyPlaying?room_guid=${roomId}` }),
            transformResponse: (response: SongsForSearchResponseDto) => response.song,
            providesTags: ["SpotifyCurrentlyPlaying"],
        }),
    }),
});
