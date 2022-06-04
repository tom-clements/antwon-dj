import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export const isUiIgnoredToastErrorCode = (code: ToastErrorCode): boolean => {
    if (code === ToastErrorCode.LikeAlreadyExists) return true;
    return false;
};
