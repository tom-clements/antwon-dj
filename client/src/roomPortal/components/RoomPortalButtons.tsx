import type { FC } from 'react';
import { RoomPortalButton } from 'roomPortal/components/RoomPortalButton';
import { Add, Chair, Link, Login, Logout } from '@mui/icons-material';
import { isLoggedIn } from 'user/predicates/isLoggedIn';
import { hasRoom } from 'user/predicates/hasRoom';
import { useDependencies } from 'common/hooks/useDependencies';
import Stack from '@mui/material/Stack';

const RoomButton: FC = () => {
    const user = useDependencies(d => d.useUser)();
    const actions = useDependencies(d => d.useRoomPortalButtons)();

    if (!isLoggedIn(user)) return null;

    return (
        <>
            {
                !hasRoom(user)
                    ? <RoomPortalButton icon={Add} text={'New Room'} onClick={actions.newRoom} />
                    : <RoomPortalButton icon={Chair} text={'My Room'} onClick={actions.myRoom} />
            }
        </>
    );
};

const LinkButton: FC = () => {
    const user = useDependencies(d => d.useUser)();
    const actions = useDependencies(d => d.useRoomPortalButtons)();

    if (!isLoggedIn(user)) return null;

    return (
        <RoomPortalButton icon={Link} text={'Link Accounts'} onClick={actions.linkAccounts} />
    );
};

const LoginButton: FC = () => {
    const user = useDependencies(d => d.useUser)();
    const actions = useDependencies(d => d.useRoomPortalButtons)();

    return (
        <>
            {
                !isLoggedIn(user)
                    ? <RoomPortalButton icon={Login} text={'Login'} onClick={actions.login} />
                    : <RoomPortalButton icon={Logout} text={'Logout'} onClick={actions.logout} />
            }
        </>
    );
};

export const RoomPortalButtons: FC = () => {
    return (
        <Stack spacing={1} direction={'column'}>
            <RoomButton />
            <LinkButton />
            <LoginButton />
        </Stack>
    );
};
