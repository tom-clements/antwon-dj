import { FC } from 'react';
import Grid from '@mui/material/Grid';
import { RoomCodeForm } from 'room/components/RoomCodeForm';
import { UseRoomPortal, useRoomPortal as _useRoomPortal } from 'room/hooks/useRoomPortal';

interface Props {
    /**
     * Injected `useRoomPortal` hook or default implementation
     */
    useRoomPortal?: UseRoomPortal;
}

export const RoomPortal: FC<Props> = props => {
    const useRoomPortal = props.useRoomPortal ?? _useRoomPortal;
    const {
        currentRoomCode,
        setCurrentRoom,
        goToCurrentRoom,
    } = useRoomPortal();

    return (
        <Grid container alignItems="center" justifyContent="center">
            <RoomCodeForm
                initialRoomCode={currentRoomCode}
                onChange={setCurrentRoom}
                onSubmit={goToCurrentRoom}
                submitText="Go"
            />
        </Grid>
    );
};
