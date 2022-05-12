import type { FC } from 'react';
import type { IconType } from 'common/model/IconType';
import type { StyleProps } from 'common/model/ReactTypes';
import type { Spacing } from '@mui/system/createTheme/createSpacing';
import { MenuItemPadding } from 'common/model/MenuItemPadding';
import { styled } from '@mui/material/styles';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

interface Props {
    text: string;
    onClick: () => void;
    icon?: IconType;
    padding?: MenuItemPadding;
    divider?: boolean;
}

const MenuItemImplementation: FC<Props & StyleProps> = props => {
    return (
        <MuiMenuItem
            className={props.className}
            style={props.style}
            onClick={props.onClick}
            divider={props.divider}
        >
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

const getMenuItemPadding = (
    spacing: Spacing,
    menuItemPadding?: MenuItemPadding
) => {
    const key = menuItemPadding ?? MenuItemPadding.Default;
    switch (+key) {
        case MenuItemPadding.Default:
            return spacing(0.75, 2);
        case MenuItemPadding.Large:
            return spacing(2, 3);
    }
};

export const MenuItem = styled(MenuItemImplementation)`
    width: 100%;
    padding: ${props => getMenuItemPadding(props.theme.spacing, props.padding)};
`;
