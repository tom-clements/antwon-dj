import { FC } from 'react';
import { styled, Box } from '@mui/material';
import { BottomSheet } from 'components/core/BottomSheet';
import { NowPlaying } from 'components/room/NowPlaying';
import { SongQueue } from 'components/room/SongQueue';
import { NextSong } from 'components/room/NextSong';
import { SongSearch } from 'components/room/SongSearch';
import { Search } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Props {
    roomId: string;
}

const SearchContainer = styled(Box)`
    width: 100%;
    padding: ${props => props.theme.spacing(1, 2, 2)};
`;

const SearchHint = styled(Box)`
    width: 100%;
    position: absolute;
    top: ${props => props.theme.spacing(1.5)};
    right: ${props => props.theme.spacing(2.5)};
    display: flex;
    justify-content: end;
`;

export const Room: FC<Props> = props => {
    return (
        <>
            <NowPlaying roomId={props.roomId} />
            <BottomSheet pullBoxContent={isOpen => <PullBox isOpen={isOpen} roomId={props.roomId} />}>
                <SongQueue roomId={props.roomId} />
            </BottomSheet>
        </>
    );
};

const PullBox: FC<{ isOpen: boolean; roomId: string; }> = props => {
    if (!props.isOpen) {
        return (
            <>
                <NextSong roomId={props.roomId} />
                <SearchHint>
                    <Search htmlColor={grey[500]} />
                </SearchHint>
            </>
        );
    }
    return (
        <>
            <SearchContainer onClick={event => event.stopPropagation()}>
                <SongSearch roomId={props.roomId} />
            </SearchContainer>
            <NextSong roomId={props.roomId} />
        </>
    );
};
