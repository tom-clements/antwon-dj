import type { RoomSongDto } from 'room/dtos/RoomSongDto';
import type { RoomSongModel } from 'room/model/RoomSongModel';
import { mapSongFromDto } from 'room/mappers/mapSongFromDto';

export const mapRoomSongFromDto = (dto: RoomSongDto): RoomSongModel => ({
    id: dto.room_song_guid,
    song: mapSongFromDto(dto),
    isPlayed: dto.is_played,
    isRemoved: dto.is_removed,
    isInactive: dto.is_inactive,
});
