import type { HF } from 'common/model/HookFunction';
import { useCallback } from 'react';
import { useRouter as _useRouter } from 'next/router';
import { useSelector } from 'common/services/createStore';
import { selectBreadcrumbStack } from 'common/services/breadcrumbSlice';
import { logError } from 'common/services/logging';

interface Return {
    isHome: boolean;
    goTo: (path?: string) => void;
    goToExternal: (externalPath: string) => void;
    goBack: () => void;
}

export type UseRouter = HF<void, Return>;

export const useRouter: UseRouter = () => {
    const router = _useRouter();
    const stack = useSelector(selectBreadcrumbStack);

    return {
        isHome: router.route === '/',
        goTo: useCallback(
            (path?: string) => router.push({ pathname: path ?? '/' }),
            [router]),
        goToExternal: useCallback(
            (externalPath: string) => router.push(externalPath),
            [router]),
        goBack: useCallback(
            () => {
                const pathStack = [...stack];
                const currentPath = pathStack.pop() ?? '/';
                if (currentPath !== router.asPath) {
                    logError(new Error('Breadcrumb state out-of-sync! Going to root'));
                    router.push({ pathname: '/' });
                } else {
                    const lastPath = pathStack.pop() ?? '/';
                    router.push({ pathname: lastPath });
                }
            },
            [router, stack]),
    };
};
