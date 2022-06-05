import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useDependencies } from 'common/hooks/useDependencies';

interface Return {
    login: () => void;
    logout: () => void;
}

export type UseLoginActions = HF<void, Return>;

export const useLoginActions: UseLoginActions = () => {
    const { goTo } = useDependencies(d => d.useBreadcrumbs)();

    return {
        login: useCallback(
            () => goTo('/login'),
            [goTo]),
        logout: useCallback(
            () => goTo('/logout'),
            [goTo]),
    };
};
