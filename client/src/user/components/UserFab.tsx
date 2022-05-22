import type { FC } from 'react';
import { UserPopoverMenu } from 'user/components/UserPopoverMenu';
import { styled } from '@mui/material/styles';

const Fab = styled('div')`
    position: absolute;
    top: ${props => props.theme.spacing(2)};
    left: ${props => props.theme.spacing(2)};
`;

export const UserFab: FC = () => {
    return (
        <Fab>
            <UserPopoverMenu/>
        </Fab>
    );
};
