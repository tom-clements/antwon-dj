import { Favorite, FavoriteBorder } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { FC, MouseEvent } from 'react';

interface Props {
    isLiked: boolean;
    onClick: (event?: MouseEvent<HTMLButtonElement>) => void;
}    

export const QueueSongLikeButton: FC<Props> = props => {
    return (
        <IconButton onClick={props.onClick}>
            {props.isLiked ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
    );
};

