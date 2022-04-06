import _ from 'lodash';
import { FC } from 'react';
import TextField from '@mui/material/TextField';

interface Props {
    roomCode: string | null;
    onChange: (roomCode: string | null) => void;
}

function sanitiseRoomCode(roomCode: string | null) {
    if (_.isEmpty(roomCode)) return null;
    return roomCode?.toUpperCase() ?? null;
}

/**
 * This really needs actual validation
 */
export const RoomCodeInput: FC<Props> = props => {
    return (
        <TextField
            label={'room code'}
            inputProps={{
                minLength: 6,
                maxLength: 6,
            }}
            sx={{
                width: '7.5em',
            }}
            value={props.roomCode ?? ''}
            onChange={event => props.onChange(sanitiseRoomCode(event.target.value))}
        />
    );
};
