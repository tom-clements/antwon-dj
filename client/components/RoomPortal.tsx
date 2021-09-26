import { FC, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { RoomCodeInput } from 'components/RoomCodeInput';
import { Spinner } from 'components/core/Spinner';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { roomApi } from 'model/service/RoomApi';

function isValidRoomCode(roomCode: string | null): roomCode is string {
    if (roomCode === null) return false;
    return roomCode.length === 6;
}

export const RoomPortal: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector(selectRoomPortalCode);
    const [trigger, result] = roomApi.endpoints.getRoomIdByCode.useLazyQuery();

    const isPending = result.isLoading || result.isFetching;
    const hasRoomId = result.isSuccess && result.data;
    const roomId = hasRoomId ? result.data : null;

    const canGoToRoom = isValidRoomCode(roomCode);
    const onRoomSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (canGoToRoom) trigger(roomCode);
    };

    useEffect(() => {
        if (roomId) router.push({
            pathname: 'room',
            query: { code: roomCode, },
        });
    }, [router, roomId, roomCode]);

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
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!canGoToRoom}
                        >
                            {isPending ? <Spinner scale={0.8} /> : 'Go'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};
