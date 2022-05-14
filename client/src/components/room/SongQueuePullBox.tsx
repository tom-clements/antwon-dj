import type { FC } from 'react';
import { styled, Box } from '@mui/material';
import { NextSong } from 'components/room/NextSong';
import { SongSearch } from 'components/room/SongSearch';
import { Search } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

interface Props {
    roomId: string;
    isOpen: boolean;
}

const PullBoxContainer = styled(Box)`
    min-height: 72px;
`;

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

export const SongQueuePullBox: FC<Props> = props => {
    if (!props.isOpen) {
        return (
            <PullBoxContainer>
                <NextSong roomId={props.roomId} isOpen={false} />
                <SearchHint>
                    <Search htmlColor={grey[500]} />
                </SearchHint>
            </PullBoxContainer>
        );
    }
    return (
        <PullBoxContainer>
            <SearchContainer onClick={event => event.stopPropagation()}>
                <SongSearch roomId={props.roomId} />
            </SearchContainer>
            <NextSong roomId={props.roomId} isOpen={true} />
        </PullBoxContainer>
    );
};
