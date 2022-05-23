import type { FC } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { RoomCodeInput } from 'roomPortal/components/RoomCodeInput';
import { useRoomCodeForm } from 'roomPortal/hooks/useRoomCodeForm';

interface Props {
    initialRoomCode: string | null;
    submitText: string;
    onChange?: (roomCode: string | null) => void; // TODO remove this option
    onSubmit: (roomCode: string) => void;
}

export const RoomCodeForm: FC<Props> = props => {
    const {
        roomCode,
        isValid,
        setRoomCode,
        onSubmit,
    } = useRoomCodeForm(props);

    return (
        <form onSubmit={onSubmit}>
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <RoomCodeInput
                        roomCode={roomCode}
                        onChange={setRoomCode}
                    /></Grid>
                <Grid item alignItems="stretch" sx={{ display: 'flex' }}>
                    <Button type="submit" variant="contained" disabled={!isValid}>
                        {props.submitText}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
