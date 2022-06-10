import { resultedTask } from 'common/model/Task';
import type { SongLikesModel } from 'room/model/SongLikesModel';
import type { UseSongLikes } from 'room/hooks/useSongLikes';
import { mockSongLikesModel } from 'tests/room/model/SongLikesModel.mock';

type Props = Partial<SongLikesModel>;

export const mockUseSongLikes = (props: Props = {}): UseSongLikes => () => {
    return resultedTask(mockSongLikesModel(props));
};
