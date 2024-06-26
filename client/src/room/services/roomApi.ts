import { createApi } from '@reduxjs/toolkit/query/react';
import { getApiBaseQuery } from 'common/services/getApiBaseQuery';
import type { RoomDto } from 'room/dtos/RoomDto';
import type { SongDto } from 'room/dtos/SongDto';
import type { RoomSongDto } from 'room/dtos/RoomSongDto';
import type { QueueSongLikesDto } from 'room/dtos/QueueSongLikesDto';

const tagTypes = [
    'room',
    'room:queue',
    'room:queue:likes',
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
        createRoom: builder.mutation<void, string>({
            query: roomCode => ({ url: 'room', method: 'POST', body: { 'room_code': roomCode } }),
        }),
        room: builder.query<RoomDto, string>({
            query: roomId => ({ url: `room/${roomId}` }),
            providesTags: ['room'],
        }),
        deleteRoom: builder.mutation<void, string>({
            query: roomId => ({ url: `room/${roomId}`, method: 'DELETE' }),
            invalidatesTags: tagTypes,
        }),
        songQueue: builder.query<RoomSongDto[], string>({
            query: roomId => ({ url: `room/${roomId}/queue/songs` }),
            providesTags: ['room:queue'],
        }),
        queueSongLikes: builder.query<QueueSongLikesDto, string>({
            query: roomId => ({ url: `room/${roomId}/queue/likes` }),
            providesTags: ['room:queue:likes'],
        }),
        queueSong: builder.mutation<void, { roomId: string, song: SongDto }>({
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
        like: builder.mutation<void, { roomId: string, songId: string }>({
            query: ({ roomId, songId }) => ({ url: `room/${roomId}/queue/like`, method: 'POST', body: { 'room_song_guid': songId } }),
            invalidatesTags: ['room:queue:likes'],
        }),
        unlike: builder.mutation<void, { roomId: string, songId: string }>({
            query: ({ roomId, songId }) => ({ url: `room/${roomId}/queue/like`, method: 'DELETE', body: { 'room_song_guid': songId } }),
            invalidatesTags: ['room:queue:likes'],
        }),
    }),
});
