import type { FC } from 'react';
import { RoomPortalButton } from 'room/components/RoomPortalButton';
import { UseUser, useUser as _useUser } from 'user/hooks/useUser';
import { Add, Chair, Link, Login, Logout } from '@mui/icons-material';
import { isLoggedIn } from 'user/predicates/isLoggedIn';
import { hasRoom } from 'user/predicates/hasRoom';
import { UseRoomPortalButtons, useRoomPortalButtons as _useRoomPortalButtons } from 'room/hooks/useRoomPortalButtons';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

interface Props {
    /**
     * Injected `useUser` hook or default implementation
     */
    useUser?: UseUser;

    /**
     * Injected `useRoomPortalButtons` hook or default implementation
     */
    useRoomPortalButtons?: UseRoomPortalButtons;
}

const RoomButton: FC<Required<Props>> = props => {
    const user = props.useUser();
    const actions = props.useRoomPortalButtons();

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

const LinkButton: FC<Required<Props>> = props => {
    const user = props.useUser();
    const actions = props.useRoomPortalButtons();

    if (!isLoggedIn(user)) return null;

    return (
        <RoomPortalButton icon={Link} text={'Link Accounts'} onClick={actions.linkAccounts} />
    );
};

const LoginButton: FC<Required<Props>> = props => {
    const user = props.useUser();
    const actions = props.useRoomPortalButtons();

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

const ButtonStack = styled(Stack)`
    margin-top: ${props => props.theme.spacing(3)};
`;

export const RoomPortalButtons: FC<Props> = props => {
    const { useUser = _useUser } = props;
    const { useRoomPortalButtons = _useRoomPortalButtons } = props;

    return (
        <ButtonStack spacing={1} direction={'column'}>
            <RoomButton useUser={useUser} useRoomPortalButtons={useRoomPortalButtons} />
            <LinkButton useUser={useUser} useRoomPortalButtons={useRoomPortalButtons} />
            <LoginButton useUser={useUser} useRoomPortalButtons={useRoomPortalButtons} />
        </ButtonStack>
    );
};
