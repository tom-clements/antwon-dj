import { RootContainer } from 'components/core/RootContainer';
import { Room } from 'components/room/Room';
import { RoomProvider } from 'components/room/RoomProvider';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';

export default function RoomPage() {
    return (
        <RootContainer>
            <RoomProvider
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <SpinnerPageSize />}
            />
        </RootContainer>
    );
}
