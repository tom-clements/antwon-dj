import { FC, forwardRef, ForwardRefRenderFunction, RefObject, useRef, useState } from 'react';
import { UserAvatar } from 'user/components/UserAvatar';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { Login, Logout, Share, ArrowBack, Settings, Chair } from '@mui/icons-material';
import { UseUserMenuClickActions, useUserMenuClickActions as _useUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';
import { UseUser, useUser as _useUser } from 'user/hooks/useUser';
import { MenuItem } from 'common/components/MenuItem';
import { UseDarkMode } from 'styles/hooks/useDarkMode';
import { DarkModeMenuItem } from 'styles/components/DarkModeMenuItem';
import { isLoggedIn } from 'user/predicates/isLoggedIn';
import { hasRoom } from 'user/predicates/hasRoom';

const MenuContainer = styled(Menu)`
    max-width: 256px;
`;

interface Props {
    /**
     * Injected `useUser` hook or default implementation
     */
    useUser?: UseUser;

    /**
     * Injected `useUserMenuClickActions` hook or default implementation
     */
    useUserMenuClickActions?: UseUserMenuClickActions;

    /**
     * Injected `useDarkMode` hook or default implementation
     */
    useDarkMode?: UseDarkMode;
}

interface OpenProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const UserIconButton: ForwardRefRenderFunction<HTMLButtonElement, Props & OpenProps> = (props, ref) => {
    const { useUser = _useUser } = props;
    const user = useUser();

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
                <UserAvatar user={user} />
            </IconButton>
        </Tooltip>
    );
};

const UserIconButtonWithRef = forwardRef(UserIconButton);

const UserText = styled(Typography)`
    padding: ${props => props.theme.spacing(0.75, 2)};
    text-align: center;
    cursor: default;
`;

const Spacer = styled('div')`
    margin-top: ${props => props.theme.spacing(0.5)};
`;

const LoggedInMenuItems: FC<Props> = props => {
    const { useUser = _useUser } = props;
    const user = useUser();

    const { useUserMenuClickActions = _useUserMenuClickActions } = props;
    const onMenuClicks = useUserMenuClickActions();

    return (
        <>
            <Spacer />
            <UserText variant="inherit" noWrap>
                {user?.name ? user?.name : '?'}
            </UserText>
            {
                !hasRoom(user)
                    ? null
                    : <>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <MenuItem icon={Chair} text="My Room" onClick={onMenuClicks.myRoom} />
                        <MenuItem icon={Settings} text="Room Settings" onClick={onMenuClicks.roomSettings} />
                        <MenuItem icon={Share} text="Share Room" onClick={onMenuClicks.shareRoom} />
                    </>
            }
            <Divider sx={{ mt: 1, mb: 1 }} />
            <DarkModeMenuItem useDarkMode={props.useDarkMode} />
            <MenuItem icon={ArrowBack} text="Back" onClick={onMenuClicks.back} />
            <MenuItem icon={Logout} text="Logout" onClick={onMenuClicks.logout} />
        </>
    );
};

const LoggedOutMenuItems: FC<Props> = props => {
    const { useUserMenuClickActions = _useUserMenuClickActions } = props;
    const onMenuClicks = useUserMenuClickActions();
    return (
        <>
            <DarkModeMenuItem useDarkMode={props.useDarkMode} />
            <MenuItem icon={ArrowBack} text="Back" onClick={onMenuClicks.back} />
            <MenuItem icon={Login} text="Login" onClick={onMenuClicks.login} />
        </>
    );
};

const UserMenu: FC<Props & OpenProps & { buttonRef: RefObject<HTMLButtonElement> }> = props => {
    const { useUser = _useUser } = props;
    const user = useUser();

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
                isLoggedIn(user)
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
