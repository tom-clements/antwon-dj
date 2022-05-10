import { useMemo } from 'react';

interface UserPopoverMenuActions {
    myRoom: () => void;
    roomSettings: () => void;
    shareRoom: () => void;
    back: () => void;
    login: () => void;
    logout: () => void;
}

export type UseUserMenuClickActions = () => UserPopoverMenuActions;

export const useUserMenuClickActions: UseUserMenuClickActions = () => {
    return useMemo(() => ({
        myRoom: () => undefined,
        roomSettings: () => undefined,
        shareRoom: () => undefined,
        back: () => undefined,
        login: () => undefined,
        logout: () => undefined,
    }), []);
};
