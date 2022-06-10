import { SongModel } from 'room/model/SongModel';

export interface RoomSongModel {
    id: string;
    song: SongModel;

    isPlayed: boolean;
    isRemoved: boolean;
    isInactive: boolean;

    likeCount: number;
    isUserLiked?: boolean;
}
