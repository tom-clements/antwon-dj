import type { FC } from 'react';
import { BottomSheet } from 'common/components/BottomSheet';
import { NowPlaying } from 'room/components/NowPlaying';
import { SongQueue } from 'room/components/SongQueue';
import { SongQueuePullBox } from 'room/components/SongQueuePullBox';

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
