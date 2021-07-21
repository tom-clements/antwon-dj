import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";
import { selectFromJson } from "model/service/SafeJsonParse";

interface RoomIdByCodeResponseDto {
    status: 200;
    body: {
        "room_guid": string;
    };
}

function isRoomIdByCodeResponseBody(obj: any): obj is RoomIdByCodeResponseDto["body"] {
    return "room_guid" in obj;
}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        getRoomIdByCode: builder.query<string, string>({
            query: code => ({ url: `room?room_code=${code}` }),
            transformResponse: (response: string) => selectFromJson(isRoomIdByCodeResponseBody, response.body, r => r.room_guid),
            providesTags: ["Room"],
        }),
    }),
});
