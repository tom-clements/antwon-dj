import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';

export interface Return {
    clearQueue: () => void;
    deleteRoom: () => void;
}

export type UseRoomSettingActions = HF<void, Return>;

export const useRoomSettingActions: UseRoomSettingActions = () => {
    return {
        clearQueue: useCallback(
            () => undefined,
            []),
        deleteRoom: useCallback(
            () => undefined,
            []),
    };
};
