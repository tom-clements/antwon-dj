import type { FC } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'common/services/createStore';
import { ErrorCode } from 'common/model/ErrorCode';
import { selectErrorCode, clearError } from 'common/services/errorSlice';

function getRoomErrorContent(errorCode?: ErrorCode | null) {
    switch (errorCode) {
        case ErrorCode.RoomNotFound:
            return {
                title:
                    <>I can&apos;t hear you, Clem Fandango!</>,
                description:
                    <>Oops, it looks like the room you were looking for does not exist.</>,
                helpText:
                    <>Please try again and check the code with the host.</>,
            };
        default:
            return null;
    }
}

export const ErrorToast: FC = () => {
    const dispatch = useDispatch();
    const errorCode = useSelector(selectErrorCode);
    const errorContent = getRoomErrorContent(errorCode);

    if (!errorCode || !errorContent) return null;
    const onClose = () => dispatch(clearError());

    return (
        <Snackbar open={!!errorCode} autoHideDuration={10000} onClose={onClose} TransitionComponent={Slide}>
            <Alert onClose={onClose} severity="error" sx={{ width: '100%' }}>
                <AlertTitle>{errorContent.title}</AlertTitle>
                <Typography variant="body2">{errorContent.description}</Typography>
                <Typography variant="caption">{errorContent.helpText}</Typography>
            </Alert>
        </Snackbar>
    );
};