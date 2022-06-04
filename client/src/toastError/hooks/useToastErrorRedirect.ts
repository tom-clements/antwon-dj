import type { HF } from 'common/model/HookFunction';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'common/services/createStore';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';
import { toastErrorActions } from 'toastError/services/toastErrorSlice';

interface Props {
    condition: boolean;
    code: ToastErrorCode;
    redirectPath?: string;
}

export type UseToastErrorRedirect = HF<Props, void>;

export const useToastErrorRedirect: UseToastErrorRedirect = props => {
    const { condition, code, redirectPath = '/' } = props;
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (condition) {
            router.push({ pathname: redirectPath });
            dispatch(toastErrorActions.set(code));
        }
    }, [router, dispatch, condition, code, redirectPath]);
};
