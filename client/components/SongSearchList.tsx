import { FC } from 'react';
import styled from 'styled-components';
import { SongDto } from 'model/service/SpotifySearchApi';
import { Song } from 'components/Song';

export const SongListContainer = styled.div`
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;

    border-width: 0.05em;
    border-style: solid;
    border-top: none;

    background-color: ${props => props.theme.field.base.backgroundColor};
    border-color: ${props => props.theme.field.base.borderColor};
`;

interface Props {
    songs: SongDto[];
    onSelectSong: (song: SongDto) => void;
}

export const SongSearchList: FC<Props> = props => {
    return (
        <SongListContainer>
            {props.songs.map(s => <Song key={s.id} song={s} skipTopBorder onClick={props.onSelectSong} />)}
        </SongListContainer>
    );
};
