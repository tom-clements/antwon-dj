import { useRouter } from 'next/router';
import { RootContainer } from 'common/components/RootContainer';
import { Room } from 'components/room/Room';
import { RoomProvider } from 'components/room/RoomProvider';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { getSingleFromUrlQuery } from 'service/GetFromUrlQuery';
import { ErrorCode } from 'model/enums/ErrorCode';
import { ErrorRedirect } from 'components/error/ErrorRedirect';

export default function RoomPage() {
    const router = useRouter();
    if (!router.isReady) return null;

    const code = getSingleFromUrlQuery(router.query, 'code');

    if (!code) return <ErrorRedirect errorCode={ErrorCode.Unknown} />; 
    
    return (
        <RootContainer>
            <RoomProvider
                roomCodeFromPage={code}
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <FullPageSpinner />}
            />
        </RootContainer>
    );
}
