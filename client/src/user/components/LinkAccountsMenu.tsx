import { FC } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { AccountLinkModel } from 'user/model/AccountLinkModel';
import { LinkAccountItem } from 'user/components/LinkAccountItem';

interface Props {
    accountLinks: AccountLinkModel[];
}

const MenuContainer = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${props => props.theme.spacing(3, 4)};
`;

export const LinkAccountsMenu: FC<Props> = props => {
    return (
        <MenuContainer elevation={0}>
            {
                props.accountLinks.map((link, i) => (
                    <LinkAccountItem key={`${link.accountName}_${i}`} accountLink={link} />
                ))
            }
        </MenuContainer>
    );
};
