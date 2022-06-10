import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import type { HF } from 'common/model/HookFunction';
import type { Task } from 'common/model/Task';
import type { SongDto } from 'room/dtos/SongDto';
import { getRoomPollingInterval } from 'room/services/getRoomPollingInterval';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
}

export type UseNowPlaying = HF<Props, Task<SongDto>>;

export const useNowPlaying: UseNowPlaying = props => {
    const pollingInterval = getRoomPollingInterval();
    const result = roomApi.endpoints.playing.useQuery(props.roomId, { pollingInterval });
    return mapReduxQueryToTask(result);
};
