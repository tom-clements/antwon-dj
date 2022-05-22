import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';

interface Return {
    login: () => void;
    logout: () => void;
}

export type UseLoginActions = HF<void, Return>;

export const useLoginActions: UseLoginActions = () => {
    return {
        login: useCallback(
            () => undefined,
            []),
        logout: useCallback(
            () => undefined,
            []),
    };
};
