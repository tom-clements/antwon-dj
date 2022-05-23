import { FC } from 'react';
import Grid from '@mui/material/Grid';
import { RoomCodeForm } from 'roomPortal/components/RoomCodeForm';
import { RoomPortalButtons } from 'roomPortal/components/RoomPortalButtons';
import { UserFab } from 'user/components/UserFab';
import { useDependencies } from 'common/hooks/useDependencies';

// TODO clarify what RoomPortal is. It is the contents of the index page, that can
// take you to a room. The "RoomPortal" state slice is, regrettably, different. It
// is 'sort-of' the current room. I should make this clearer.
export const RoomPortal: FC = () => {
    const {
        currentRoomCode,
        setCurrentRoom,
        goToCurrentRoom,
    } = useDependencies(d => d.useRoomPortal)();

    return (
        <>
            <Grid container spacing={6}>
                <Grid container justifyContent="center" alignItems="end" item xs={12}>
                    <RoomCodeForm
                        initialRoomCode={currentRoomCode}
                        onChange={setCurrentRoom}
                        onSubmit={goToCurrentRoom}
                        submitText="Go"
                    />
                </Grid>
                <Grid container item justifyContent="center" alignItems="start" xs={12}>
                    <RoomPortalButtons />
                </Grid>
            </Grid>
            <UserFab />
        </>
    );
};
