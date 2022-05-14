import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';
import { UseAccountLinks, useAccountLinks as _useAccountLinks } from 'user/hooks/useAccountLinks';
import { UseGoBackAction, useGoBackAction as _useGoBackAction } from 'common/hooks/useGoBackAction';

interface Props {
    /**
     * Injected `useAccountLinks` hook or default implementation
     */
    useAccountLinks?: UseAccountLinks;

    /**
     * Injected `useGoBackAction` hook or default implementation
     */
    useGoBackAction?: UseGoBackAction;
}

export const LinkAccounts: FC<Props> = props => {
    const useAccountLinks = props.useAccountLinks ?? _useAccountLinks;
    const accountLinks = useAccountLinks();

    const useGoBackAction = props.useGoBackAction ?? _useGoBackAction;
    const goBack = useGoBackAction();

    return (
        <SettingsView title="Link Accounts" onGoBack={goBack}>
            <LinkAccountsMenu accountLinks={accountLinks} />
        </SettingsView>
    );
};
