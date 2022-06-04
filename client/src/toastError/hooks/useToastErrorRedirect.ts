import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'common/services/createStore';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';
import { toastErrorActions } from 'toastError/services/toastErrorSlice';

export const useToastErrorRedirect = (
    condition: boolean,
    errorCode: ToastErrorCode,
    redirectPath = '/'
) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (condition) {
            router.push({ pathname: redirectPath });
            dispatch(toastErrorActions.set(errorCode));
        }
    }, [router, dispatch, condition, errorCode, redirectPath]);
};
