import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

interface Return {
    isRoot: boolean;
    goTo: (path: string) => void;
    goBack: () => void;
}

export type UseBreadcrumbs = HF<void, Return>;

export const useBreadcrumbs: UseBreadcrumbs = () => {
    const router = useRouter();

    // TODO fix naive approach to this. We need to track a
    // loose stack of last pages too - the user can browse arbitrarily.
    // We need to either go to the last page, or if there is none and
    // we are not root index, go to the root index.
    return {
        isRoot: router.route === '/',
        goTo: useCallback(
            (path: string) => router.push({ pathname: path }),
            [router]),
        goBack: useCallback(
            () => router.back(),
            [router]),
    };
};
