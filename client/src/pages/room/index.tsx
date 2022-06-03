import { useRouter } from 'next/router';
import { RootContainer } from 'common/components/RootContainer';
import { Room } from 'room/components/Room';
import { RoomProvider } from 'room/components/RoomProvider';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { getSingleFromUrlQuery } from 'common/services/getSingleFromUrlQuery';
import { ErrorCode } from 'common/model/ErrorCode';
import { ErrorRedirect } from 'common/components/ErrorRedirect';

export default function RoomPage() {
    const router = useRouter();
    if (!router.isReady) return null;

    const code = getSingleFromUrlQuery(router.query, 'code');

    if (!code) return <ErrorRedirect errorCode={ErrorCode.Unknown} />; 
    
    return (
        <RootContainer>
            <RoomProvider
                initialRoomCode={code}
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <FullPageSpinner />}
            />
        </RootContainer>
    );
}
