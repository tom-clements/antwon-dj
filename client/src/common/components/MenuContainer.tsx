import type { FC } from 'react';
import type { StyleProps } from 'common/model/ReactTypes';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface Props {
    disableGutter?: boolean;
}

const MenuContainerImplementation: FC<Props & StyleProps> = props => {
    return (
        <Paper elevation={0} className={props.className} style={props.style}>
            {props.children}
        </Paper>
    );
};

export const MenuContainer = styled(MenuContainerImplementation)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: ${props => props.disableGutter ? 0 : props.theme.spacing(0, 2)};
`;
