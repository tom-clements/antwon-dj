import type { SongLikesModel } from 'room/model/SongLikesModel';

export interface QueueSongLikesModel {
    [songId: string]: SongLikesModel;
}
