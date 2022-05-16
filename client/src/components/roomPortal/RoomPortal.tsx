import { FC, useMemo } from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import { useAppSelector, useAppDispatch } from 'model/Store';
import { selectRoomPortalCode, setRoomPortalCode } from 'model/slices/RoomPortalSlice';
import { getRelativeRoomUrl } from 'service/room/getRoomUrl';
import { RoomCodeForm } from 'room/components/RoomCodeForm';

export const RoomPortal: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const roomCode = useAppSelector(selectRoomPortalCode);

    const onSubmit = useMemo(() => (roomCode: string) => {
        router.push({ pathname: getRelativeRoomUrl(roomCode) });
    }, [router]);

    return (
        <Grid container alignItems="center" justifyContent="center">
            <RoomCodeForm
                initialRoomCode={roomCode}
                onChange={roomCode => dispatch(setRoomPortalCode(roomCode))}
                onSubmit={onSubmit}
                submitText="Go"
            />
        </Grid>
    );
};
