import type { HF, HookReturn } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useRoomIdentityActions, UseRoomIdentityActions } from 'room/hooks/useRoomIdentityActions';
import { useLoginActions, UseLoginActions } from 'user/hooks/useLoginActions';

type LoginActions = HookReturn<UseLoginActions>;
type RoomIdentityActions = HookReturn<UseRoomIdentityActions>;
type BaseReturn = LoginActions & RoomIdentityActions;

interface Return extends BaseReturn {
    linkAccounts: () => void;
}

export type UseRoomPortalButtons = HF<void, Return>;

export const useRoomPortalButtons: UseRoomPortalButtons = () => {
    const { newRoom, myRoom } = useRoomIdentityActions();
    const { login, logout } = useLoginActions();

    return {
        newRoom,
        myRoom,
        linkAccounts: useCallback(
            () => undefined,
            []),
        login,
        logout,
    };
};
