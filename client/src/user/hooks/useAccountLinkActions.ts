import { useMemo } from 'react';

interface AccountLinkActions {
    link: () => void;
    unlink: () => void;
}

export type UseAccountLinkActions = () => AccountLinkActions;

export const useAccountLinkActions: UseAccountLinkActions = () => {
    return useMemo(() => ({
        link: () => undefined,
        unlink: () => undefined,
    }), []);
};
