import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { LinkAccounts } from 'user/components/LinkAccounts';
import { mockAccountLinksFactory } from 'tests/user/helpers/mockAccountLinksFactory';
import { SettingsView } from 'common/components/SettingsView';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';

jest.mock('common/components/SettingsView', () => ({
    __esModule: true,
    SettingsView: (props: ComponentProps<typeof SettingsView>) => (
        <div id='settingsView' data-title={props.title} data-on-go-back={props.onGoBack?.toString()}>
            {props.children}
        </div>
    ),
}));

jest.mock('user/components/LinkAccountsMenu', () => ({
    __esModule: true,
    LinkAccountsMenu: (props: ComponentProps<typeof LinkAccountsMenu>) => (
        <div id='linkAccountsMenu' data-account-links={JSON.stringify(props.accountLinks)}>
        </div>
    ),
}));

function testRender(props: ComponentProps<typeof LinkAccounts>) {
    return render(<LinkAccounts {...props} />);
}

const accountLinks = mockAccountLinksFactory(false)();
const useAccountLinks = () => accountLinks;

const goBackAction = jest.fn();
const useGoBackAction = () => goBackAction;

describe('<LinkAccounts />', () => {
    it('renders <SettingsView /> with <LinkAccountsMenu />', () => {
        const { container } = testRender({
            useAccountLinks,
            useGoBackAction,
        });

        const settingsView = container.querySelector('#settingsView');
        expect(settingsView).toBeDefined();
        expect(settingsView?.getAttribute('data-title')).toBe('Link Accounts');
        expect(settingsView?.getAttribute('data-on-go-back')).toBe(goBackAction.toString());

        const linkAccountsMenu = settingsView?.querySelector('#linkAccountsMenu');
        expect(linkAccountsMenu).toBeDefined();
        expect(linkAccountsMenu?.getAttribute('data-account-links')).toBe(JSON.stringify(accountLinks));
    });
});
