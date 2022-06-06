import React, { FC } from 'react';
import { Avatar, ListItemAvatar, ListItemText, Skeleton, styled } from '@mui/material';

interface Props {
    title: string;
    artist: string;
    albumUrl: string;
}

const SongItemText = styled(ListItemText)`
    & p, & span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
`;

export const SongItem: FC<Props> = props => {
    return (
        <>
            <ListItemAvatar>
                <Avatar variant="square" src={props.albumUrl} />
            </ListItemAvatar>
            <SongItemText
                primary={props.title}
                secondary={props.artist}
            />
        </>
        
    );
};

export const SongItemSkeleton: FC = () => {
    return (
        <>
            <ListItemAvatar>
                <Skeleton variant="rectangular">
                    <Avatar variant="square" />
                </Skeleton>
            </ListItemAvatar>
            <ListItemText
                primary={<Skeleton />}
                secondary={<Skeleton />}
            />
        </>
    );
};

