import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";
import { selectFromJson } from "model/service/SafeJsonParse";

interface RoomIdByCodeResponseBodyDto {
    "room_guid": string;
}

interface RoomIdByCodeResponseDto {
    status: 200;
    body: string;
}

function isRoomIdByCodeResponseBody(obj: any): obj is RoomIdByCodeResponseBodyDto {
    return "room_guid" in obj;
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        getRoomIdByCode: builder.query<string, string>({
            query: code => ({ url: `room?room_code=${code}` }),
            transformResponse: (response: RoomIdByCodeResponseDto) => selectFromJson(isRoomIdByCodeResponseBody, response.body, r => r.room_guid),
            providesTags: ["Room"],
        }),
    }),
});
