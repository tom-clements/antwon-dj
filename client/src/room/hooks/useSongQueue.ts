import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import type { HF } from 'common/model/HookFunction';
import type { Task } from 'common/model/Task';
import type { GuestRoomSongDto, UserRoomSongDto } from 'room/dtos/RoomSongDto';
import { getRoomPollingInterval } from 'room/services/getRoomPollingInterval';
import { roomApi } from 'room/services/roomApi';

interface Props {
    roomId: string;
}

export type UseSongGuestQueue = HF<Props, Task<GuestRoomSongDto[]>>;

export const useSongGuestQueue: UseSongGuestQueue = props => {
    const pollingInterval = getRoomPollingInterval();
    const result = roomApi.endpoints.guestQueue.useQuery(props.roomId, { pollingInterval });
    return mapReduxQueryToTask(result);
};

export type UseSongUserQueue = HF<Props, Task<UserRoomSongDto[]>>;

export const useSongUserQueue: UseSongUserQueue = props => {
    const pollingInterval = getRoomPollingInterval();
    const result = roomApi.endpoints.userQueue.useQuery(props.roomId, { pollingInterval });
    return mapReduxQueryToTask(result);
};
