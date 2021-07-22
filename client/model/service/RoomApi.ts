import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "model/service/ApiGateway";

interface RoomIdByCodeResponseBodyDto {
    "room_guid": string;
}

interface RoomIdByCodeResponseDto {
    status: 200;
    body: RoomIdByCodeResponseBodyDto;
}

}

export const roomApi = createApi({
    reducerPath: "roomApi",
    baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        getRoomIdByCode: builder.query<string, string>({
            query: code => ({ url: `room?room_code=${code}` }),
            transformResponse: (response: RoomIdByCodeResponseDto) => response.body.room_guid,
            providesTags: ["Room"],
        }),
    }),
});