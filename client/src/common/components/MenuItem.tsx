import type { FC } from 'react';
import type { IconType } from 'common/model/IconType';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

interface Props {
    icon?: IconType;
    text: string;
    onClick: () => void;
}

export const MenuItem: FC<Props> = props => {
    return (
        <MuiMenuItem onClick={props.onClick}>
            {
                props.icon
                    ? (
                        <ListItemIcon>
                            <props.icon fontSize="small" />
                        </ListItemIcon>
                    )
                    : null
            }
            <Typography variant="inherit" noWrap>
                {props.text}
            </Typography>
        </MuiMenuItem>
    );
};
