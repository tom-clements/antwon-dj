import Container from '@mui/material/Container';
import { Room } from 'components/Room';
import { RoomProvider } from 'components/RoomProvider';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';

export default function RoomPage() {
    return (
        <Container sx={{ height: '100vh', display: 'flex' }} maxWidth="md" disableGutters>
            <RoomProvider
                render={roomId => <Room roomId={roomId} />}
                renderLoading={() => <SpinnerPageSize />}
            />
        </Container>
    );
}
