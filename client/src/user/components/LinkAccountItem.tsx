import type { FC, PropsWithChildren } from 'react';
import { styled } from '@mui/material/styles';
import { AccountLinkModel, AccountLinkModelType } from 'user/model/AccountLinkModel';
import { UseAccountLinkActions, useAccountLinkActions as _useAccountLinkActions } from 'user/hooks/useAccountLinkActions';
import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SpotifyIcon } from 'common/components/icons/SpotifyIcon';
import { Link, LinkOff } from '@mui/icons-material';

interface Props {
    accountLink: AccountLinkModel;

    /**
     * Injected `useAccountLinkActions` hook or default implementation
     */
    useAccountLinkActions?: UseAccountLinkActions;
}

const LinkCard = styled(Card)`
    width: 100%;
    margin: ${props => props.theme.spacing(2, 0)};
`;

const CardColumns = styled(Box)`
    display: flex;
    align-items: center;
`;

const getProviderColour = (type: AccountLinkModelType): keyof ButtonPropsColorOverrides => {
    switch (type) {
        case AccountLinkModelType.Spotify:
            return 'spotifyGreen';
        default:
            throw new Error(`${type} does not have a valid colour mapping.`);
    }
};

const ProviderIconContainerImpl = (props: PropsWithChildren<{ type: AccountLinkModelType }>) => {
    return (
        <div {...props}>
            {props.children}
        </div>
    );
};

const ProviderIconContainer = styled(ProviderIconContainerImpl)`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${props => props.theme.spacing(6)};
    width: ${props => props.theme.spacing(9)};
    height: ${props => props.theme.spacing(9)};
    background: ${props => props.theme.palette[getProviderColour(props.type)]?.main ?? 'none'};
    border-radius: ${props => props.theme.spacing(2)};
    padding: ${props => props.theme.spacing(4.75)};
`;

const ProviderIcon = (props: { type: AccountLinkModelType }) => {
    const { type } = props;
    switch (type) {
        case AccountLinkModelType.Spotify:
            return <SpotifyIcon fontSize='inherit' />;
        default:
            throw new Error(`${type} does not have a valid icon mapping.`);
    }
};

const LinkDetails = styled(Box)`
    margin-right: auto;
    padding: ${props => props.theme.spacing(0, 2, 0, 3)};
`;

const LinkStatus: FC<Props> = props => {
    if (!props.accountLink.isLinked) return null;
    const { linkUser, linkDate } = props.accountLink;
    return (
        <>
            <Typography variant="body2">
                {`Connected as ${linkUser ?? 'Unknown'}`}
            </Typography>
            <Typography variant="caption">
                {`Linked on ${linkDate?.toUTCString() ?? 'Unknown'}`}
            </Typography>
        </>
    );
};

const LinkButton = styled(Button)`
    min-width: ${props => props.theme.spacing(15)};
`;

export const LinkAccountItem: FC<Props> = props => {
    const { useAccountLinkActions = _useAccountLinkActions } = props;
    const actions = useAccountLinkActions();

    const { accountName, isLinked, type } = props.accountLink;

    return (
        <LinkCard>
            <CardContent>
                <CardColumns>
                    <ProviderIconContainer type={type}>
                        <ProviderIcon type={type} />
                    </ProviderIconContainer>
                    <LinkDetails>
                        <Typography variant={isLinked ? 'subtitle1' : 'h6'}>
                            {accountName}
                        </Typography>
                        <LinkStatus {...props} />
                    </LinkDetails>
                    <LinkButton
                        variant="contained"
                        size="large"
                        color={isLinked ? 'error' : 'primary'}
                        onClick={() => isLinked ? actions.unlink() : actions.link()}
                        startIcon={isLinked ? <Link /> : <LinkOff />}
                    >
                        {isLinked ? 'Unlink' : 'Link'}
                    </LinkButton>
                </CardColumns>
            </CardContent>
        </LinkCard>
    );
};
