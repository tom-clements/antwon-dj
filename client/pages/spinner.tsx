import Container from '@mui/material/Container';
import { SpinnerPageSize } from 'components/core/SpinnerPageSize';

export default function SpinnerPage() {
    return (
        <Container sx={{ height: '100%', display: 'flex', position: 'fixed' }} maxWidth="md" disableGutters>
            <SpinnerPageSize />
        </Container>
    );
}
