import type { HF } from 'common/model/HookFunction';
import { useDependencies } from 'common/hooks/useDependencies';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { useCallback, useEffect } from 'react';
import { authActions, selectAuthState } from 'user/services/authSlice';
import { useDispatch, useSelector } from 'common/services/createStore';
import { flush } from 'common/components/PersistedStateProvider';

export type UseLogoutLoop = HF<void, void>;

export const useLogoutLoop: UseLogoutLoop = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthState);
    const { goBack, goToExternal } = useDependencies(d => d.useRouter)();

    const logout = useCallback(async () => {
        if (auth.user || auth.accessToken || auth.idToken) {
            dispatch(authActions.reset());
            await flush();
            goToExternal(`${getApiBaseUrl()}logout`);
        } else {
            goBack();
        }
    }, [dispatch, goBack, goToExternal, auth]);

    useEffect(() => { logout(); }, [logout]);
};
