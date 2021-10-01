import { FC } from 'react';
import { styled } from '@mui/material/styles';
import { BottomSheet } from 'components/core/BottomSheet';
import { NowPlaying } from 'components/room/NowPlaying';
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
            <NowPlaying roomId={props.roomId} />
            <BottomSheet pullBoxContent={isOpen => <PullBox isOpen={isOpen} roomId={props.roomId} />}>
                <SongQueue roomId={props.roomId} />
            </BottomSheet>
        </RoomRoot>
    );
};

const PullBox: FC<{ isOpen: boolean; roomId: string; }> = props => {
    if (!props.isOpen) {
        return (
            <NextSong roomId={props.roomId} />
        );
    }
    return (
        <>
            <NextSong roomId={props.roomId} />
        </>
    );
};
