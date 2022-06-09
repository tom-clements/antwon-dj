import type { GuestRoomSongDto, UserRoomSongDto } from 'room/dtos/RoomSongDto';
import type { RoomSongModel } from 'room/model/RoomSongModel';
import { mapSongFromDto } from 'room/mappers/mapSongFromDto';

export const mapSongFromGuestDto = (dto: GuestRoomSongDto): RoomSongModel => ({
    song: mapSongFromDto(dto),
    isPlayed: dto.is_played,
    isRemoved: dto.is_removed,
    isInactive: dto.is_inactive,
    likeCount: dto.like_count,
});

export const mapSongFromUserDto = (dto: UserRoomSongDto): RoomSongModel => ({
    ...mapSongFromGuestDto(dto),
    isUserLiked: dto.is_user_liked,
});
