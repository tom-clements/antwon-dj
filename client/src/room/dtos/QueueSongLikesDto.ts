import type { SongLikesDto } from 'room/dtos/SongLikesDto';

export interface QueueSongLikesDto {
    [room_song_guid: string]: SongLikesDto;
}
