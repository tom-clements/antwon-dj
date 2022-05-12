import type { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Spinner } from 'components/core/Spinner';

export const SpinnerPageSize: FC = () => {
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Spinner scale={7} />
        </Grid>
    );
};
