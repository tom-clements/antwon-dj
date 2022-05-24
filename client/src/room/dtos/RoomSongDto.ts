import type { SongDto } from 'room/dtos/SongDto';

export interface RoomSongDto extends SongDto {
    'in_active': boolean;
    'is_played': boolean;
    'is_removed': boolean;
    'insert_time': Date;
    'like_count': number;
}
