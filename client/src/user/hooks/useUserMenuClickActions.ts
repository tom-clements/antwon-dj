import type { HF, HookReturn } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useRoomIdentityActions, UseRoomIdentityActions } from 'room/hooks/useRoomIdentityActions';
import { useLoginActions, UseLoginActions } from 'user/hooks/useLoginActions';

type LoginActions = HookReturn<UseLoginActions>;
type RoomIdentityActions = Pick<HookReturn<UseRoomIdentityActions>, 'myRoom'>;
type BaseReturn = LoginActions & RoomIdentityActions;

interface Return extends BaseReturn {
    roomSettings: () => void;
    shareRoom: () => void;
}

export type UseUserMenuClickActions = HF<void, Return>;

export const useUserMenuClickActions: UseUserMenuClickActions = () => {
    const { myRoom } = useRoomIdentityActions();
    const { login, logout } = useLoginActions();

    return {
        myRoom,
        roomSettings: useCallback(
            () => undefined,
            []),
        shareRoom: useCallback(
            () => undefined,
            []),
        login,
        logout,
    };
};
