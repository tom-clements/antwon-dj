import { useEffect } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import type { HF } from 'common/model/HookFunction';
import { Task } from 'common/model/Task';
import { useSelector, useDispatch } from 'common/services/createStore';
import { mapReduxQueryToTask } from 'common/mappers/mapReduxQueryToTask';
import { roomApi } from 'room/services/roomApi';
import { selectRoomPortalCode, setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { useDependencies } from 'common/hooks/useDependencies';
import { isFaultedTask } from 'common/predicates/isTask';
import { mapFaultToToastErrorCode } from 'toastError/mappers/mapFaultToToastErrorCode';
import { mapTaskResult } from 'common/mappers/mapTaskResult';

interface Props {
    initialRoomCode?: string;
}

interface Return {
    id: string;
    code: string;
}

export type UseRoomId = HF<Props, Task<Return>>;

export const useRoomId: UseRoomId = props => {
    const { initialRoomCode } = props;

    const dispatch = useDispatch();
    const roomCodeFromState = useSelector(selectRoomPortalCode);
    const result = roomApi.endpoints.roomId.useQuery(roomCodeFromState ?? skipToken);

    useEffect(() => {
        if (initialRoomCode !== undefined) {
            if (roomCodeFromState !== initialRoomCode) {
                dispatch(setRoomPortalCode(initialRoomCode));
            }
        }
    }, [dispatch, roomCodeFromState, initialRoomCode]);

    // TODO undo this 'hack', need to improve room flow dramatically!
    const finalRoomCode = initialRoomCode ?? roomCodeFromState ?? '';

    const task = mapReduxQueryToTask(result);
    const fault = isFaultedTask(task) ? task.fault : undefined;

    useDependencies(d => d.useFaultLogging)(fault);

    useDependencies(d => d.useToastErrorRedirect)({
        condition: !!fault || !finalRoomCode,
        code: mapFaultToToastErrorCode(fault, 'room'),
    });

    return mapTaskResult(task, roomId => ({
        id: roomId,
        code: finalRoomCode,
    }));
};
