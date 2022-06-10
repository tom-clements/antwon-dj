import type { UseSong } from 'room/hooks/useSong';
import { mockSongLikesModel } from 'tests/room/model/SongLikesModel.mock';

type Props = Partial<ReturnType<UseSong>> & Partial<ReturnType<typeof mockSongLikesModel>>;

export const mockUseSong = (props: Props = {}): UseSong => () => ({
    songLikes: mockSongLikesModel(props),
    likeToggle: props.likeToggle ?? (() => undefined),
    deleteSong: props.deleteSong ?? (() => undefined),
});
