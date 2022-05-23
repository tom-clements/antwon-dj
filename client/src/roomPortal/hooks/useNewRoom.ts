import { useCallback } from 'react';
import type { HF } from 'common/model/HookFunction';
import { useRouter } from 'next/router';
import { useDispatch } from 'common/services/createStore';
import { setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { getRelativeRoomUrl } from 'room/services/getRoomUrl';

interface Return {
    createAndGoToNewRoom: (roomCode: string) => void
}

export type UseNewRoom = HF<void, Return>;

export const useNewRoom: UseNewRoom = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    return {
        createAndGoToNewRoom: useCallback(
            (roomCode: string) => {
                dispatch(setRoomPortalCode(roomCode));
                router.push({ pathname: getRelativeRoomUrl(roomCode) });
            },
            [router, dispatch]),
    };
};
