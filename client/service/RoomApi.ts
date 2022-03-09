import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiBaseUrl } from 'service/config/getApiBaseUrl';
import { SongDto } from 'service/SpotifySearchApi';

interface RoomIdByCodeResponseDto {
    'room_guid': string;
}

interface RoomQueueResponseDto {
    'room_queue': RoomSongDto[];
}

export interface RoomSongDto extends SongDto {
    'in_active': boolean;
    'is_played': boolean;
    'is_removed': boolean;
    'insert_time': Date;
}


interface RoomSongPostDto extends SongDto {
    'room_guid': string;
}

function mapRoomSongPostDto(dto: RoomSongPostDto) {
    return {
        song_uri: dto.song_uri,
        song_name: dto.song_name,
        song_artist: dto.song_artist,
        song_album_url: dto.song_album_url,
        room_guid: dto.room_guid,
    };
}

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({ baseUrl: getApiBaseUrl() }),
    tagTypes: ['Room', 'RoomQueue'],
    endpoints: (builder) => ({
        getRoomIdByCode: builder.query<string, string>({
            query: code => ({ url: `room?room_code=${code}` }),
            transformResponse: (response: RoomIdByCodeResponseDto) => response.room_guid,
            providesTags: ['Room'],
        }),
        getRoomQueue: builder.query<RoomSongDto[], string>({
            query: roomId => ({ url: `roomQueue?room_guid=${roomId}` }),
            transformResponse: (response: RoomQueueResponseDto) => response.room_queue,
            providesTags: ['RoomQueue'],
        }),
        addSongToQueue: builder.mutation<void, RoomSongPostDto>({
            query: song => ({ url: 'roomQueue', method: 'POST', body: mapRoomSongPostDto(song) }),
            invalidatesTags: ['RoomQueue'],
        }),
    }),
});
