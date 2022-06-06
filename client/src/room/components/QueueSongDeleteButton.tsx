import type { FC } from 'react';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

interface Props {
    onClick: () => void;
}    

export const QueueSongDeleteButton: FC<Props> = props => {
    return (
        <IconButton onClick={props.onClick}>
            <Delete/>
        </IconButton>
    );
};
