import { useCallback } from 'react';
import type { HF } from 'common/model/HookFunction';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'common/services/createStore';
import { selectRoomPortalCode, setRoomPortalCode } from 'roomPortal/services/roomPortalSlice';
import { getRelativeRoomUrl } from 'room/services/getRoomUrl';

interface Return {
    currentRoomCode: string | null;
    setCurrentRoom: (roomCode: string | null) => void;
    goToCurrentRoom: (roomCode: string) => void
}

export type UseRoomPortal = HF<void, Return>;

export const useRoomPortal: UseRoomPortal = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const roomCode = useSelector(selectRoomPortalCode);

    return {
        currentRoomCode: roomCode,
        setCurrentRoom: useCallback(
            (roomCode: string | null) => {
                dispatch(setRoomPortalCode(roomCode));
            },
            [dispatch]),
        goToCurrentRoom: useCallback(
            (roomCode: string) => {
                router.push({ pathname: getRelativeRoomUrl(roomCode) });
            },
            [router]),
    };
};
