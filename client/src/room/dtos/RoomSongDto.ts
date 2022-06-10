import type { SongDto } from 'room/dtos/SongDto';

export interface RoomSongDto extends SongDto {
    room_song_guid: string;
    is_inactive: boolean;
    insert_time: Date;
    is_played: boolean;
    is_removed: boolean;
}
