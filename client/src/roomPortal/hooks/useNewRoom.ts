import { useCallback } from 'react';
import type { HF } from 'common/model/HookFunction';
import { useDependencies } from 'common/hooks/useDependencies';
import { useDispatch } from 'common/services/createStore';
import { setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { getRelativeRoomUrl } from 'room/services/getRoomUrl';

interface Return {
    createAndGoToNewRoom: (roomCode: string) => void
}

export type UseNewRoom = HF<void, Return>;

export const useNewRoom: UseNewRoom = () => {
    const dispatch = useDispatch();
    const { goTo } = useDependencies(d => d.useRouter)();

    return {
        createAndGoToNewRoom: useCallback(
            (roomCode: string) => {
                dispatch(setRoomPortalCode(roomCode));
                goTo(getRelativeRoomUrl(roomCode));
            },
            [goTo, dispatch]),
    };
};
