import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';
import type { SongDto } from 'room/dtos/SongDto';
import type { GuestRoomSongDto, UserRoomSongDto } from 'room/dtos/RoomSongDto';

const tagTypes = [
    'room',
    'room:queue',
    'room:search',
    'room:playing',
];

export const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: getApiBaseQuery(),
    tagTypes,
    endpoints: (builder) => ({
        roomId: builder.query<string, string>({
            query: roomCode => ({ url: `code/${roomCode}` }),
            providesTags: ['room'],
        }),
        createRoom: builder.query<void, string>({
            query: roomCode => ({ url: 'room', method: 'POST', body: { 'room_code': roomCode } }),
        }),
        room: builder.query<void, string>({
            query: roomId => ({ url: `room/${roomId}` }),
            providesTags: ['room'],
        }),
        deleteRoom: builder.mutation<void, string>({
            query: roomId => ({ url: `room/${roomId}`, method: 'DELETE' }),
            invalidatesTags: tagTypes,
        }),
        guestQueue: builder.query<GuestRoomSongDto[], string>({
            query: roomId => ({ url: `room/${roomId}/queue/guest` }),
            providesTags: ['room:queue'],
        }),
        userQueue: builder.query<UserRoomSongDto[], string>({
            query: roomId => ({ url: `room/${roomId}/queue/user` }),
            providesTags: ['room:queue'],
        }),
        queue: builder.mutation<void, { roomId: string, song: SongDto }>({
            query: ({ roomId, song }) => ({ url: `room/${roomId}/queue`, method: 'POST', body: song }),
            invalidatesTags: ['room:queue'],
        }),
        search: builder.query<SongDto[], { roomId: string, query: string }>({
            query: ({ query, roomId }) => ({ url: `room/${roomId}/search?query=${query}` }),
            providesTags: ['room:search'],
        }),
        playing: builder.query<SongDto, string>({
            query: roomId => ({ url: `room/${roomId}/playing` }),
            providesTags: ['room:playing'],
        }),
        like: builder.query<SongDto, { roomId: string, songId: string }>({
            query: ({ roomId, songId }) => ({ url: `room/${roomId}/queue/like`, method: 'POST', body: { 'room_song_guid': songId } }),
            providesTags: ['room:queue'],
        }),
        unlike: builder.query<SongDto, { roomId: string, songId: string }>({
            query: ({ roomId, songId }) => ({ url: `room/${roomId}/queue/like`, method: 'DELETE', body: { 'room_song_guid': songId } }),
            providesTags: ['room:queue'],
        }),
    }),
});
