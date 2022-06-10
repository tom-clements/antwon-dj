import type { SongLikesDto } from 'room/dtos/SongLikesDto';
import type { SongLikesModel } from 'room/model/SongLikesModel';

export const mapSongLikesFromDto = (dto: SongLikesDto): SongLikesModel => ({
    isLiked: dto.is_liked,
    likeCount: dto.like_count,
});
