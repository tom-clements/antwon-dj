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

// TODO clarify what RoomPortal is. It is the contents of the index page, that can
// take you to a room. The "RoomPortal" state slice is, regrettably, different. It
// is 'sort-of' the current room. I should make this clearer.
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
