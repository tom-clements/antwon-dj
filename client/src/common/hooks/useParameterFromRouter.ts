import { useRouter } from 'next/router';
import { getParameterFromUrlQuery } from 'common/services/getParameterFromUrlQuery';

/**
 * @returns The key's parameter as a string if present, null otherwise. If the underlying
 * `next/router` is not ready, this will return undefined.
 */
export const useParameterFromRouter = (key: string): string | null | undefined => {
    const router = useRouter();
    if (!router.isReady) return undefined;
    return getParameterFromUrlQuery(router.query, key);
};
