import { FC } from 'react';
import { BottomSheet } from 'components/core/BottomSheet';
import { NowPlaying } from 'components/room/NowPlaying';
import { SongQueue } from 'components/room/SongQueue';
import { SongQueuePullBox } from 'components/room/SongQueuePullBox';

interface Props {
    roomId: string;
}

export const Room: FC<Props> = props => {
    return (
        <>
            <NowPlaying roomId={props.roomId} />
            <BottomSheet pullBoxContent={isOpen => <SongQueuePullBox isOpen={isOpen} roomId={props.roomId} />}>
                <SongQueue roomId={props.roomId} />
            </BottomSheet>
        </>
    );
};
