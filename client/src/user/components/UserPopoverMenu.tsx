import { FC, forwardRef, ForwardRefRenderFunction, RefObject, useRef, useState } from 'react';
import type { IconType } from 'common/model/IconType';
import { UserModel } from 'user/model/UserModel';
import { UserAvatar } from 'user/components/UserAvatar';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { Login, Logout, Share, ArrowBack, Settings, Chair } from '@mui/icons-material';
import { UseUserMenuClickActions, useUserMenuClickActions as useUserMenuClickActionsImpl } from 'user/hooks/useUserMenuClickActions';

const MenuContainer = styled(Menu)`
    max-width: 256px;
`;

interface Props {
    user: UserModel | null;

    /**
     * Injected `useUserMenuClickActions` hook or default implementation
     */
    useUserMenuClickActions?: UseUserMenuClickActions;
}

interface OpenProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const UserIconButton: ForwardRefRenderFunction<HTMLButtonElement, Props & OpenProps> = (props, ref) => {
    return (
        <Tooltip title="User menu">
            <IconButton
                ref={ref}
                onClick={() => props.setOpen(!props.isOpen)}
                size="small"
                aria-controls={props.isOpen ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={props.isOpen ? 'true' : undefined}
            >
                <UserAvatar user={props.user} />
            </IconButton>
        </Tooltip>
    );
};

const UserIconButtonWithRef = forwardRef(UserIconButton);

interface UserMenuIconItemProps {
    icon?: IconType;
    text: string;
    onClick: () => void;
}

const UserMenuIconItem: FC<UserMenuIconItemProps> = props => {
    return (
        <MenuItem onClick={props.onClick}>
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
        </MenuItem>
    );
};

const UserText = styled(Typography)`
    padding: ${props => props.theme.spacing(0.75, 2)};
    text-align: center;
    cursor: default;
`;

const Spacer = styled('div')`
    margin-top: ${props => props.theme.spacing(1)};
`;

const LoggedInMenuItems: FC<Props> = props => {
    const { useUserMenuClickActions = useUserMenuClickActionsImpl } = props;
    const onMenuClicks = useUserMenuClickActions();
    return (
        <>
            <Spacer />
            <UserText variant="inherit" noWrap>
                {props.user?.name ? props.user?.name : '?'}
            </UserText>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <UserMenuIconItem icon={Chair} text="My Room" onClick={onMenuClicks.myRoom} />
            <UserMenuIconItem icon={Settings} text="Room Settings" onClick={onMenuClicks.roomSettings} />
            <UserMenuIconItem icon={Share} text="Share Room" onClick={onMenuClicks.shareRoom} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <UserMenuIconItem icon={ArrowBack} text="Back" onClick={onMenuClicks.back} />
            <UserMenuIconItem icon={Logout} text="Logout" onClick={onMenuClicks.logout} />
        </>
    );
};

const LoggedOutMenuItems: FC<Props> = props => {
    const { useUserMenuClickActions = useUserMenuClickActionsImpl } = props;
    const onMenuClicks = useUserMenuClickActions();
    return (
        <>
            <Spacer />
            <UserMenuIconItem icon={Share} text="Share Room" onClick={onMenuClicks.shareRoom} />
            <Divider sx={{ mt: 1, mb: 1 }} />
            <UserMenuIconItem icon={ArrowBack} text="Back" onClick={onMenuClicks.back} />
            <UserMenuIconItem icon={Login} text="Login" onClick={onMenuClicks.login} />
        </>
    );
};

const UserMenu: FC<Props & OpenProps & { buttonRef: RefObject<HTMLButtonElement> }> = props => {
    if (!props.buttonRef) return null;

    return (
        <MenuContainer
            anchorEl={props.buttonRef.current}
            id="account-menu"
            open={props.isOpen}
            onClose={() => props.setOpen(false)}
            onClick={() => props.setOpen(false)}
            TransitionComponent={Fade}
            PaperProps={{
                elevation: 0,
                sx: {
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    overflow: 'visible',
                    mt: 0.75,
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 20,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            {
                props.user
                    ? <LoggedInMenuItems {...props} />
                    : <LoggedOutMenuItems {...props} />
            }
        </MenuContainer>
    );
};

export const UserPopoverMenu: FC<Props> = props => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <UserIconButtonWithRef {...props} ref={ref} isOpen={isOpen} setOpen={setOpen} />
            <UserMenu {...props} buttonRef={ref} isOpen={isOpen} setOpen={setOpen} />
        </>
    );
};
