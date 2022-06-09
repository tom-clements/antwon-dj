import { SongModel } from 'room/model/SongModel';

export interface RoomSongModel {
    song: SongModel;

    isPlayed: boolean;
    isRemoved: boolean;
    isInactive: boolean;

    likeCount: number;
    isUserLiked?: boolean;
}
