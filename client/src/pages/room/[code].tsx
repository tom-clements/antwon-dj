import { RootContainer } from 'common/components/RootContainer';
import { Room } from 'room/components/Room';
import { RoomIdProvider } from 'room/components/RoomIdProvider';
import { FullPageSpinner } from 'common/components/FullPageSpinner';
import { useDependencies } from 'common/hooks/useDependencies';
import { ToastErrorCode } from 'toastError/model/ToastErrorCode';

export default function RoomPage() {
    const code = useDependencies(d => d.useParameterFromRouter)('code');
    useDependencies(d => d.useToastErrorRedirect)({
        condition: code === null,
        code: ToastErrorCode.RoomNotFound,
    });

    if (!code) return null;

    return (
        <RootContainer>
            <RoomIdProvider
                initialRoomCode={code}
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <FullPageSpinner />}
            />
        </RootContainer>
    );
}
