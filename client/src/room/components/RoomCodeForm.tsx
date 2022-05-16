import type { FC } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { RoomCodeInput } from 'room/components/RoomCodeInput';
import { useRoomCodeForm } from 'room/hooks/useRoomCodeForm';

interface Props {
    initialRoomCode: string | null;
    submitText: string;
    onChange: (roomCode: string | null) => void;
    onSubmit: (roomCode: string) => void;
}

export const RoomCodeForm: FC<Props> = props => {
    const {
        roomCode,
        isValid,
        onChange,
        onSubmit,
    } = useRoomCodeForm(props);

    return (
        <form onSubmit={onSubmit}>
            <Grid container item xs={12} spacing={1}>
                <Grid item>
                    <RoomCodeInput
                        roomCode={roomCode}
                        onChange={onChange}
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
