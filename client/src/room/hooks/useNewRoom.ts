import { useCallback } from 'react';
import type { HF } from 'common/model/HookFunction';
import { useRouter } from 'next/router';
import { useAppDispatch } from 'model/Store';
import { setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { getRelativeRoomUrl } from 'service/room/getRoomUrl';

interface Return {
    createAndGoToNewRoom: (roomCode: string) => void
}

export type UseNewRoom = HF<void, Return>;

export const useNewRoom: UseNewRoom = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return {
        createAndGoToNewRoom: useCallback(
            (roomCode: string) => {
                dispatch(setRoomPortalCode(roomCode));
                router.push({ pathname: getRelativeRoomUrl(roomCode) });
            },
            [router, dispatch]),
    };
};
