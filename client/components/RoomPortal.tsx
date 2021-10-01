import { FC, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { RoomCodeInput } from 'components/RoomCodeInput';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';

function isValidRoomCode(roomCode: string | null): roomCode is string {
    if (roomCode === null) return false;
    return roomCode.length === 6;
}

export const RoomPortal: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector(selectRoomPortalCode);

    const canGoToRoom = isValidRoomCode(roomCode);
    const onRoomSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (canGoToRoom) {
            router.push({
                pathname: 'room',
                query: { code: roomCode },
            });
        }
    };

    return (
        <Grid container alignItems="center" justifyContent="center">
            <form onSubmit={onRoomSubmit}>
                <Grid container item xs={12} spacing={1}>
                    <Grid item>
                        <RoomCodeInput
                            roomCode={roomCode}
                            onChange={roomCode => dispatch(setRoomPortalCode(roomCode))}
                        /></Grid>
                    <Grid item alignItems="stretch" sx={{ display: 'flex' }}>
                        <Button type="submit" variant="contained" disabled={!canGoToRoom}>Go</Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};
