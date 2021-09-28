import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { BottomSheet } from 'components/core/BottomSheet';
import { SongQueue } from 'components/room/SongQueue';
import { NextSong } from 'components/room/NextSong';

interface Props {
    roomId: string;
}

const RoomRoot = styled('div')`
`;

export const Room: FC<Props> = props => {
    return (
        <RoomRoot>
            <BottomSheet
                pullBoxContent={<NextSong roomId={props.roomId} />}
            >
                <SongQueue roomId={props.roomId} />
            </BottomSheet>
        </RoomRoot>
    );
};
