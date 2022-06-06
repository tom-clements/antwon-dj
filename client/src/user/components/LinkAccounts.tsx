import type { FC } from 'react';
import { SettingsView } from 'common/components/SettingsView';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';
import { useDependencies } from 'common/hooks/useDependencies';

export const LinkAccounts: FC = () => {
    const { goBack } = useDependencies(d => d.useRouter)();
    const accountLinks = useDependencies(d => d.useAccountLinks)();

    return (
        <SettingsView title="Link Accounts" onGoBack={goBack}>
            <LinkAccountsMenu accountLinks={accountLinks} />
        </SettingsView>
    );
};
