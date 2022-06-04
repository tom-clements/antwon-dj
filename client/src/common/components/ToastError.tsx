import { FC, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'common/services/createStore';
import { selectToastErrorCode, toastErrorActions } from 'toastError/services/toastErrorSlice';
import { getToastErrorContent } from 'common/services/getToastErrorContent';
import { getToastErrorHideDuration } from 'common/services/getToastErrorHideDuration';

export const ToastError: FC = () => {
    const dispatch = useDispatch();
    const errorCode = useSelector(selectToastErrorCode);
    const errorContent = getToastErrorContent(errorCode);
    const onClose = useCallback(() => dispatch(toastErrorActions.clear()), [dispatch]);
    const autoHideDuration = getToastErrorHideDuration();

    if (!errorCode || !errorContent) return null;

    return (
        <Snackbar open={!!errorCode} autoHideDuration={autoHideDuration} onClose={onClose} TransitionComponent={Slide}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                <AlertTitle>{errorContent.title}</AlertTitle>
                <Typography variant="body2">{errorContent.description}</Typography>
                <Typography variant="caption">{errorContent.helpText}</Typography>
            </Alert>
        </Snackbar>
    );
};
