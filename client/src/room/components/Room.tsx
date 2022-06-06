import type { FC } from 'react';
import { BottomSheet } from 'common/components/BottomSheet';
import { NowPlaying } from 'room/components/NowPlaying';
import { Queue } from 'room/components/Queue';
import { SongQueuePullBox } from 'room/components/QueueSongPullBox';

interface Props {
    roomId: string;
}

export const Room: FC<Props> = props => {
    return (
        <>
            <NowPlaying roomId={props.roomId} />
            <BottomSheet pullBoxContent={isOpen => <SongQueuePullBox isOpen={isOpen} roomId={props.roomId} />}>
                <Queue roomId={props.roomId} />
            </BottomSheet>
        </>
    );
};
