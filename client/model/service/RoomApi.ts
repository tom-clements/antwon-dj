import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";
import { SongDto } from "model/service/SpotifySearchApi";

interface RoomIdByCodeResponseBodyDto {
    "room_guid": string;
}

interface RoomIdByCodeResponseDto {
    status: 200;
    body: RoomIdByCodeResponseBodyDto;
}

interface RoomQueueResponseDto {
    status: 200;
    body: RoomQueueResponseBodyDto;
}

interface RoomSongDto extends SongDto {
    "in_active": boolean;
    "is_played": boolean;
    "is_removed": boolean;
    "insert_time": Date;
}

interface RoomQueueResponseBodyDto {
    "room_queue": RoomSongDto[];
}

function isRoomQueueResponseBody(obj: any): obj is RoomQueueResponseBodyDto {
    return "room_queue" in obj;
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["Room", "RoomQueue"],
    endpoints: (builder) => ({
        getRoomIdByCode: builder.query<string, string>({
            query: code => ({ url: `room?room_code=${code}` }),
            transformResponse: (response: RoomIdByCodeResponseDto) => response.body.room_guid,
            providesTags: ["Room"],
        }),
        getRoomQueue: builder.query<RoomSongDto[], string>({
            query: roomId => ({ url: `roomQueue?room_guid=${roomId}` }),
            transformResponse: (response: RoomQueueResponseDto) => response.body.room_queue,
        }),
    }),
});
