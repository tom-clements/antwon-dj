import { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { UserPopoverMenu } from 'user/components/UserPopoverMenu';

jest.mock('user/components/UserAvatar', () => ({
    __esModule: true,
    UserAvatar: () => null,
}));

function testRender(props: ComponentProps<typeof UserPopoverMenu>) {
    return render(<UserPopoverMenu {...props} />);
}

const onClickProps = {
    myRoom: jest.fn(),
    roomSettings: jest.fn(),
    shareRoom: jest.fn(),
    back: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
};

beforeEach(() => {
    jest.resetAllMocks();
});

describe('<UserPopoverMenu />', () => {
    it('renders icon button', () => {
        const { container } = testRender({
            user: { name: 'Name' },
            onClick: onClickProps,
        });

        const button = container.querySelector('button.MuiIconButton-root');
        expect(button).toBeDefined();
        expect(button?.getAttribute('aria-label')).toBe('User menu');
    });

    it('renders menu when icon button receives onClick', () => {
        const { container } = testRender({
            user: { name: 'Name' },
            onClick: onClickProps,
        });

        const button = container.querySelector('button.MuiIconButton-root');
        fireEvent.click(button!);

        const menu = container.querySelector('div.MuiMenu-paper');
        expect(menu).toBeDefined();
    });

    describe('when user logged in', () => {
        type TestCase = [menuText: string, expectedMockCallbackKey: keyof typeof onClickProps];

        const cases: TestCase[] = [
            ['My Room', 'myRoom'],
            ['Room Settings', 'roomSettings'],
            ['Share Room', 'shareRoom'],
            ['Back', 'back'],
            ['Logout', 'logout'],
        ];

        test.each(cases)('has "%s" menu item with appropriate "%s" callback', (menuText, expectedMockCallbackKey) => {
            const { container, getByText } = testRender({
                user: { name: 'Name' },
                onClick: onClickProps,
            });
            const button = container.querySelector('button.MuiIconButton-root');
            fireEvent.click(button!);

            const menuItem = getByText(menuText);
            expect(menuItem).toBeDefined();

            fireEvent.click(menuItem);

            const mockCallback = onClickProps[expectedMockCallbackKey];
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('when user logged out', () => {
        type TestCase = [menuText: string, expectedMockCallbackKey: keyof typeof onClickProps];

        const cases: TestCase[] = [
            ['Share Room', 'shareRoom'],
            ['Back', 'back'],
            ['Login', 'login'],
        ];

        test.each(cases)('has "%s" menu item with appropriate "%s" callback', (menuText, expectedMockCallbackKey) => {
            const { container, getByText } = testRender({
                user: null,
                onClick: onClickProps,
            });
            const button = container.querySelector('button.MuiIconButton-root');
            fireEvent.click(button!);

            const menuItem = getByText(menuText);
            expect(menuItem).toBeDefined();

            fireEvent.click(menuItem);

            const mockCallback = onClickProps[expectedMockCallbackKey];
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });
});
