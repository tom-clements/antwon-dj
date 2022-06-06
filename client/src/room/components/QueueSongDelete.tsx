import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';

interface Props {
    onClick: () => void;
}    

export const DeleteIcon: FC<Props> = props => {
    return (
        <IconButton onClick={props.onClick}>
            <Delete/>
        </IconButton>
    );
};

