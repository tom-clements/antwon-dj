import { useMemo } from 'react';

export interface RoomSettingActions {
    clearQueue: () => void;
    deleteRoom: () => void;
}

export type UseRoomSettingActions = () => RoomSettingActions;

export const useRoomSettingActions: UseRoomSettingActions = () => {
    return useMemo(() => ({
        clearQueue: () => undefined,
        deleteRoom: () => undefined,
    }), []);
};
