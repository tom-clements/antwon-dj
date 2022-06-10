import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import { mapTaskResult } from 'common/mappers/mapTaskResult';
import type { HF } from 'common/model/HookFunction';
import type { Task } from 'common/model/Task';
import type { SongLikesModel } from 'room/model/SongLikesModel';
import { mapQueueSongLikesFromDto } from 'room/mappers/mapQueueSongLikesFromDto';
import { getRoomPollingInterval } from 'room/services/getRoomPollingInterval';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
    songId: string;
}

export type UseSongLikes = HF<Props, Task<SongLikesModel | null>>;

export const useSongLikes: UseSongLikes = props => {
    const pollingInterval = getRoomPollingInterval().likes;
    const result = roomApi.endpoints.queueSongLikes.useQuery(props.roomId, { pollingInterval });
    const task = mapReduxQueryToTask(result);
    return mapTaskResult(task, t => mapQueueSongLikesFromDto(t)[props.songId] ?? null);
};
