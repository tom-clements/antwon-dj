import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SongDto } from 'model/service/SpotifySearchApi';
import { SongList } from 'components/room/SongList';

export const SongListContainer = styled(Box)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: ${props => props.theme.spacing(1, 1, 1, 0.25)};
    border-radius: ${props => props.theme.spacing(1)};
    border: 2px solid ${props => props.theme.palette.primary.main};
`;

interface Props {
    songs: SongDto[];
    onSelectSong: (song: SongDto) => void;
}

export const SongSearchList: FC<Props> = props => {
    return (
        <SongListContainer>
            <SongList
                songs={props.songs}
                onSelectSong={props.onSelectSong}
            />
        </SongListContainer>
    );
};
