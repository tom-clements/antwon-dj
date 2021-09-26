import { RoomPortal } from 'components/RoomPortal';
import Container from '@mui/material/Container';

export default function Home() {
    return (
        <Container sx={{ height: '100vh', display: 'flex' }} maxWidth="md" disableGutters>
            <RoomPortal />
        </Container>
    );
}
