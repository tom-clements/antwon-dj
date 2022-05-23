import type { FC } from 'react';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

const Root = styled(Container)`
    height: 100%;
    display: flex;
    position: fixed;
`;

export const RootContainer: FC = props => {
    return (
        <Root maxWidth={false} disableGutters>
            {props.children}
        </Root>
    );
};
