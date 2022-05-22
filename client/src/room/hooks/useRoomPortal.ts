import { useCallback } from 'react';
import type { HF } from 'common/model/HookFunction';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { getRelativeRoomUrl } from 'service/room/getRoomUrl';

interface Return {
    currentRoomCode: string | null;
    setCurrentRoom: (roomCode: string | null) => void;
    goToCurrentRoom: (roomCode: string) => void
}

export type UseRoomPortal = HF<void, Return>;

export const useRoomPortal: UseRoomPortal = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector(selectRoomPortalCode);

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
