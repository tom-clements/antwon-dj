import type { HF } from 'common/model/HookFunction';
import { Task } from 'common/model/Task';
import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import { roomApi } from 'room/services/roomApi';
import { RoomModel } from 'room/model/RoomModel';
import { mapTaskResult } from 'common/mappers/mapTaskResult';
import { mapRoomFromDto } from 'room/mappers/mapRoomFromDto';

interface Props {
    roomId: string;
}

export type UseRoom = HF<Props, Task<RoomModel>>;

export const useRoom: UseRoom = props => {
    const result = roomApi.endpoints.room.useQuery(props.roomId);
    const task = mapReduxQueryToTask(result);
    return mapTaskResult(task, t => mapRoomFromDto(t));
};
