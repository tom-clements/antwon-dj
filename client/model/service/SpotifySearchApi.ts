import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";

export interface SongDto {
    "id": string;
    "song_artist": string;
    "song_name": string;
    "song_album_url": string;
}

interface SongsForSearchResponseDto {
    "songs": SongDto[];
}

export const spotifySearchApi = createApi({
    reducerPath: "spotifySearchApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["SpotifySearch"],
    endpoints: (builder) => ({
        getSongsForSearch: builder.query<SongDto[], { query: string, roomId: string }>({
            query: ({ query, roomId }) => ({ url: `spotifySearch?query=${query}&room_guid=${roomId}` }),
            transformResponse: (response: SongsForSearchResponseDto) => response.songs,
            providesTags: ["SpotifySearch"],
        }),
    }),
});
