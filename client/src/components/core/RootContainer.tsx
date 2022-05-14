import type { FC } from 'react';
import Container from '@mui/material/Container';

export const RootContainer: FC = props => {
    return (
        <Container sx={{ height: '100%', display: 'flex', position: 'fixed' }} maxWidth={false} disableGutters>
            {props.children}
        </Container>
    );
};
