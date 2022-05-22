import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';

export interface Return {
    newRoom: () => void;
    myRoom: () => void;
}

export type UseRoomIdentityActions = HF<void, Return>;

export const useRoomIdentityActions: UseRoomIdentityActions = () => {
    return {
        newRoom: useCallback(
            () => undefined,
            []),
        myRoom: useCallback(
            () => undefined,
            []),
    };
};
