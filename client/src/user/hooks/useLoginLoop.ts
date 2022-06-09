import type { HF } from 'common/model/HookFunction';
import { useDependencies } from 'common/hooks/useDependencies';
import { getApiBaseUrl } from 'config/getApiBaseUrl';
import { userApi } from 'user/services/userApi';
import { useCallback, useEffect, useRef } from 'react';
import { logError } from 'common/services/logging';
import { authActions, selectAuthState } from 'user/services/authSlice';
import { useDispatch, useSelector } from 'common/services/createStore';
import { toastErrorActions } from 'toastError/services/toastErrorSlice';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export type UseLoginLoop = HF<void, void>;

export const useLoginLoop: UseLoginLoop = () => {
    const dispatch = useDispatch();
    const auth = useSelector(selectAuthState);
    const loginAttempts = useRef(auth.loginAttempts);

    const { goBack, goToExternal } = useDependencies(d => d.useRouter)();
    const [fetchToken] = userApi.endpoints.token.useLazyQuery();
    const [fetchUser] = userApi.endpoints.user.useLazyQuery();

    const login = useCallback(async () => {
        try {
            await fetchToken().unwrap();
            await fetchUser().unwrap();
            goBack();
        } catch (error) {
            if (loginAttempts.current <= 1) {
                dispatch(authActions.addAttempt());
                goToExternal(`${getApiBaseUrl()}/login`);
            } else {
                logError(error);
                dispatch(authActions.resetAttempts());
                dispatch(toastErrorActions.set(ToastErrorCode.LoginFailed));
                goBack();
            }
        }

    }, [dispatch, fetchToken, fetchUser, goBack, goToExternal, loginAttempts]);

    useEffect(() => { login(); }, [login]);
};
