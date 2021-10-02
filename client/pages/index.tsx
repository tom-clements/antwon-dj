import { RoomPortal } from 'components/roomPortal/RoomPortal';
import Container from '@mui/material/Container';

export default function Home() {
    return (
        <Container sx={{ height: '100%', display: 'flex', position: 'fixed' }} maxWidth="md" disableGutters>
            <RoomPortal />
        </Container>
    );
}
