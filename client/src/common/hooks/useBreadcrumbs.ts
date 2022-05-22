import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface Return {
    isRoot: boolean;
    goBack: () => void;
}

export type UseBreadcrumbs = HF<void, Return>;

export const useBreadcrumbs: UseBreadcrumbs = () => {
    const router = useRouter();

    return {
        isRoot: router.route === '/',
        goBack: useCallback(
            () => router.back(),
            [router]),
    };
};
