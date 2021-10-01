import Container from '@mui/material/Container';
import { Room } from 'components/room/Room';
import { RoomProvider } from 'components/room/RoomProvider';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';

export default function RoomPage() {
    return (
        <Container sx={{ height: '100vh', display: 'flex' }} maxWidth={false} disableGutters>
            <RoomProvider
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <SpinnerPageSize />}
            />
        </Container>
    );
}
