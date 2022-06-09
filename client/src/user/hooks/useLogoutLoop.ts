import type { HF } from 'common/model/HookFunction';
import { useDependencies } from 'common/hooks/useDependencies';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { useEffect } from 'react';
import { authActions, selectAuthState } from 'user/services/authSlice';
import { useDispatch, useSelector } from 'common/services/createStore';

export type UseLogoutLoop = HF<void, void>;

export const useLogoutLoop: UseLogoutLoop = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthState);
    const { goBack, goToExternal } = useDependencies(d => d.useRouter)();

    useEffect(() => {
        if (auth.user || auth.accessToken || auth.idToken) {
            dispatch(authActions.reset());
            goToExternal(`${getApiBaseUrl()}/logout`);
        } else {
            goBack();
        }
    }, [dispatch, goBack, goToExternal, auth]);
};
