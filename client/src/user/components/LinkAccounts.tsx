import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';
import { useDependencies } from 'common/hooks/useDependencies';

export const LinkAccounts: FC = () => {
    const useBreadcrumbs = useDependencies(d => d.useBreadcrumbs);
    const { goBack } = useBreadcrumbs();

    const useAccountLinks = useDependencies(d => d.useAccountLinks);
    const accountLinks = useAccountLinks();

    return (
        <SettingsView title="Link Accounts" onGoBack={goBack}>
            <LinkAccountsMenu accountLinks={accountLinks} />
        </SettingsView>
    );
};
