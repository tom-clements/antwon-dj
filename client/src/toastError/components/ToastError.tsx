import { FC, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'common/services/createStore';
import { selectToastErrorCode, toastErrorActions } from 'toastError/services/toastErrorSlice';
import { getToastErrorContent } from 'toastError/services/getToastErrorContent';
import { getToastErrorHideDuration } from 'toastError/services/getToastErrorHideDuration';
import { isUiIgnoredToastErrorCode } from 'toastError/predicates/isUiIgnoredToastErrorCode';

export const ToastError: FC = () => {
    const dispatch = useDispatch();
    const code = useSelector(selectToastErrorCode);
    const content = getToastErrorContent(code);
    const onClose = useCallback(() => dispatch(toastErrorActions.clear()), [dispatch]);
    const autoHideDuration = getToastErrorHideDuration();

    if (!code || !content || isUiIgnoredToastErrorCode(code)) return null;

    return (
        <Snackbar open={!!code} autoHideDuration={autoHideDuration} onClose={onClose} TransitionComponent={Slide}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                <AlertTitle>{content.title}</AlertTitle>
                <Typography variant="body2">{content.description}</Typography>
                <Typography variant="caption">{content.helpText}</Typography>
            </Alert>
        </Snackbar>
    );
};
