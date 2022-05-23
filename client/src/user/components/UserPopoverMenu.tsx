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
import { MenuItem } from 'common/components/MenuItem';
import { DarkModeMenuItem } from 'styles/components/DarkModeMenuItem';
import { isLoggedIn } from 'user/predicates/isLoggedIn';
import { hasRoom } from 'user/predicates/hasRoom';
import { useDependencies } from 'common/hooks/useDependencies';

const MenuContainer = styled(Menu)`
    max-width: 256px;
`;

interface OpenProps {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

const UserIconButton: ForwardRefRenderFunction<HTMLButtonElement, OpenProps> = (props, ref) => {
    const deps = useDependencies(d => ({
        useUser: d.useUser,
    }));

    const user = deps.useUser();

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

const BackItem: FC = () => {
    const useBreadcrumbs = useDependencies(d => d.useBreadcrumbs);
    const { isRoot, goBack } = useBreadcrumbs();

    if (isRoot) return null;

    return (
        <MenuItem icon={ArrowBack} text="Back" onClick={goBack} />
    );
};

const LoggedInMenuItems: FC = () => {
    const deps = useDependencies(d => ({
        useUser: d.useUser,
        useUserMenuClickActions: d.useUserMenuClickActions,
        useDarkMode: d.useDarkMode,
    }));
    const user = deps.useUser();
    const actions = deps.useUserMenuClickActions();

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
                        <MenuItem icon={Chair} text="My Room" onClick={actions.myRoom} />
                        <MenuItem icon={Settings} text="Room Settings" onClick={actions.roomSettings} />
                        <MenuItem icon={Share} text="Share Room" onClick={actions.shareRoom} />
                    </>
            }
            <Divider sx={{ mt: 1, mb: 1 }} />
            <DarkModeMenuItem useDarkMode={deps.useDarkMode} />
            <BackItem />
            <MenuItem icon={Logout} text="Logout" onClick={actions.logout} />
        </>
    );
};

const LoggedOutMenuItems: FC = () => {
    const deps = useDependencies(d => ({
        useUserMenuClickActions: d.useUserMenuClickActions,
        useDarkMode: d.useDarkMode,
    }));
    const actions = deps.useUserMenuClickActions();

    return (
        <>
            <DarkModeMenuItem useDarkMode={deps.useDarkMode} />
            <BackItem />
            <MenuItem icon={Login} text="Login" onClick={actions.login} />
        </>
    );
};

const UserMenu: FC<OpenProps & { buttonRef: RefObject<HTMLButtonElement> }> = props => {
    const deps = useDependencies(d => ({
        useUser: d.useUser,
    }));

    const user = deps.useUser();

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

export const UserPopoverMenu: FC = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <UserIconButtonWithRef ref={ref} isOpen={isOpen} setOpen={setOpen} />
            <UserMenu buttonRef={ref} isOpen={isOpen} setOpen={setOpen} />
        </>
    );
};
