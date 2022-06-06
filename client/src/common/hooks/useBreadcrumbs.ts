import type { HF } from 'common/model/HookFunction';
import { breadcrumbActions, selectBreadcrumbStack } from 'common/services/breadcrumbSlice';
import { useDispatch, useSelector } from 'common/services/createStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export type UseBreadcrumbs = HF<void, void>;

export const useBreadcrumbs: UseBreadcrumbs = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const stack = useSelector(selectBreadcrumbStack);

    useEffect(() => {
        const nextRoute = (path: string) => {
            if (path === '/') {
                dispatch(breadcrumbActions.reset());
            } else {
                const indexOfPath = stack.indexOf(path);
                dispatch(indexOfPath >= 0 ? breadcrumbActions.popTo(indexOfPath) : breadcrumbActions.push(path));
            }
        };

        router.events.on('routeChangeComplete', nextRoute);

        return () => router.events.off('routeChangeComplete', nextRoute);
    }, [router, dispatch, stack]);
};
