import type { FC } from 'react';
import { MenuContainer } from 'common/components/MenuContainer';
import { AccountLinkModel } from 'user/model/AccountLinkModel';
import { LinkAccountItem } from 'user/components/LinkAccountItem';

interface Props {
    accountLinks: AccountLinkModel[];
}

export const LinkAccountsMenu: FC<Props> = props => {
    return (
        <MenuContainer>
            {
                props.accountLinks.map((link, i) => (
                    <LinkAccountItem key={`${link.accountName}_${i}`} accountLink={link} />
                ))
            }
        </MenuContainer>
    );
};
