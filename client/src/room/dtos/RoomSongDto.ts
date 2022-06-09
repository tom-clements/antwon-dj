import type { SongDto } from 'room/dtos/SongDto';

export interface GuestRoomSongDto extends SongDto {
    room_song_guid: string;
    is_inactive: boolean;
    insert_time: Date;
    is_played: boolean;
    is_removed: boolean;
    like_count: number;
}

export interface UserRoomSongDto extends SongDto {
    room_song_guid: string;
    is_inactive: boolean;
    insert_time: Date;
    is_played: boolean;
    is_removed: boolean;
    like_count: number;
    is_user_liked: boolean;
}
