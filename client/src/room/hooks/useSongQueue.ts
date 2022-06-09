import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import type { HF } from 'common/model/HookFunction';
import type { Task } from 'common/model/Task';
import type { GuestRoomSongDto } from 'room/dtos/RoomSongDto';
import { getRoomPollingInterval } from 'room/services/getRoomPollingInterval';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
}

// TODO use a model and map from dto
export type UseSongQueue = HF<Props, Task<GuestRoomSongDto[]>>;

export const useSongQueue: UseSongQueue = props => {
    const pollingInterval = getRoomPollingInterval();
    const result = roomApi.endpoints.guestQueue.useQuery(props.roomId, { pollingInterval });
    return mapReduxQueryToTask(result);
};
