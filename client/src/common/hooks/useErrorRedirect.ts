import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ErrorCode } from 'common/model/ErrorCode';
import { setError } from 'common/services/errorSlice';
import { useDispatch } from 'common/services/createStore';

export const useErrorRedirect = (
    condition: boolean,
    errorCode: ErrorCode,
    redirectPath: string
) => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (condition) {
            router.push({ pathname: redirectPath });
            dispatch(setError(errorCode));
        }
    }, [router, dispatch, condition, errorCode, redirectPath]);
};
