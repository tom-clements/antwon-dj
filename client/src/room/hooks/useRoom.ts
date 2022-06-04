import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import type { HF } from 'common/model/HookFunction';
import { Task } from 'common/model/Task';
import { useSelector, useDispatch } from 'common/services/createStore';
import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import { roomApi } from 'room/services/roomApi';
import { selectRoomPortalCode, setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { useToastErrorRedirect } from 'toastError/hooks/useToastErrorRedirect';
import { isFaultedTask } from 'common/predicates/isTask';
import { mapFaultToToastErrorCode } from 'toastError/mappers/mapFaultToToastErrorCode';

interface Props {
    initialRoomCode: string;
}

// TODO use a model and map from dto
export type UseRoom = HF<Props, Task<string>>;

export const useRoom: UseRoom = props => {
    const { initialRoomCode } = props;

    const dispatch = useDispatch();
    const roomCodeFromState = useSelector(selectRoomPortalCode);
    const result = roomApi.endpoints.roomId.useQuery(roomCodeFromState ?? skipToken);

    useEffect(() => {
        if (roomCodeFromState !== initialRoomCode) dispatch(setRoomPortalCode(initialRoomCode));
    }, [dispatch, roomCodeFromState, initialRoomCode]);

    const task = mapReduxQueryToTask(result);

    useToastErrorRedirect(
        isFaultedTask(task),
        mapFaultToToastErrorCode(isFaultedTask(task) ? task.fault : undefined, 'room'));

    return task;
};
