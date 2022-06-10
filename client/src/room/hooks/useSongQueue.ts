import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import type { HF } from 'common/model/HookFunction';
import type { Task } from 'common/model/Task';
import type { RoomSongDto } from 'room/dtos/RoomSongDto';
import { getRoomPollingInterval } from 'room/services/getRoomPollingInterval';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
}

export type UseSongQueue = HF<Props, Task<RoomSongDto[]>>;

export const useSongQueue: UseSongQueue = props => {
    const pollingInterval = getRoomPollingInterval().queue;
    const result = roomApi.endpoints.songQueue.useQuery(props.roomId, { pollingInterval });
    return mapReduxQueryToTask(result);
};
