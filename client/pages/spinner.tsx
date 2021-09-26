import Container from '@mui/material/Container';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';

export default function SpinnerPage() {
    return (
        <Container sx={{ height: '100vh', display: 'flex' }} maxWidth="md" disableGutters>
            <SpinnerPageSize />
        </Container>
    );
}
