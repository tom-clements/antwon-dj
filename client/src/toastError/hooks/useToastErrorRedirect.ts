import type { HF } from 'common/model/HookFunction';
import { useEffect } from 'react';
import { useDispatch } from 'common/services/createStore';
import { useDependencies } from 'common/hooks/useDependencies';
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
    const dispatch = useDispatch();
    const { goTo } = useDependencies(d => d.useRouter)();

    useEffect(() => {
        if (condition) {
            goTo(redirectPath);
            dispatch(toastErrorActions.set(code));
        }
    }, [goTo, dispatch, condition, code, redirectPath]);
};
