import type { SongLikesModel } from 'room/model/SongLikesModel';

type Props = Partial<SongLikesModel>;

export const mockSongLikesModel = (props: Props = {}): SongLikesModel => ({
    isLiked: props.isLiked ?? false,
    likeCount: props.likeCount ?? 0,
});
