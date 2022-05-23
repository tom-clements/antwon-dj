import type { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Spinner } from 'common/components/Spinner';

export const FullPageSpinner: FC = () => {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Spinner scale={7} />
        </Grid>
    );
};
