import type { HF } from 'common/model/HookFunction';
import { useDependencies } from 'common/hooks/useDependencies';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { userApi } from 'user/services/userApi';
import { useCallback, useEffect } from 'react';
import { logError } from 'common/services/logging';

export type UseLoginLoop = HF<void, void>;

export const useLoginLoop: UseLoginLoop = () => {
    const { goBack, goToExternal } = useDependencies(d => d.useRouter)();
    const [fetchToken] = userApi.endpoints.token.useLazyQuery();
    const [fetchUser] = userApi.endpoints.user.useLazyQuery();

    const login = useCallback(async () => {
        try {
            // Try getting new token and re-fetching user
            await fetchToken().unwrap();
            await fetchUser().unwrap();
            goBack();
        } catch (error) {
            // Redirect back to the API for fresh login flow
            logError(error);
            goToExternal(`${getApiBaseUrl()}/login`);
        }
    }, [fetchToken, fetchUser, goBack, goToExternal]);

    useEffect(() => { login(); }, [login]);
};
