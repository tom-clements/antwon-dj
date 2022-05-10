import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { LinkAccountItem } from 'user/components/LinkAccountItem';
import { LinkAccountsMenu } from 'user/components/LinkAccountsMenu';
import { mockAccountLinksFactory } from 'tests/user/helpers/mockAccountLinksFactory';

jest.mock('user/components/LinkAccountItem', () => ({
    __esModule: true,
    LinkAccountItem: (props: ComponentProps<typeof LinkAccountItem>) => (
        <div id='linkAccountItem' data-account-link={JSON.stringify(props.accountLink)}>
        </div>
    ),
}));

function testRender(props: ComponentProps<typeof LinkAccountsMenu>) {
    return render(<LinkAccountsMenu {...props} />);
}

describe('<LinkAccountsMenu />', () => {
    it('renders a list of <LinkAccountItem />', () => {
        const accountLinks = mockAccountLinksFactory(false)();

        const { container } = testRender({
            accountLinks,
        });

        const linkItems = container.querySelectorAll('#linkAccountItem');
        expect(linkItems).toBeDefined();
        expect(linkItems.length).toBe(accountLinks.length);

        for (let i = 0; i < linkItems.length; i++) {
            expect(linkItems[i]?.getAttribute('data-account-link')).toBe(JSON.stringify(accountLinks[i]));
        }
    });
});
