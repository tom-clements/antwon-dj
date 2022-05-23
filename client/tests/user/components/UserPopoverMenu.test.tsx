import type { ComponentProps } from 'react';
import type { Dependencies } from 'common/services/DependencyContext';
import { fireEvent, render } from '@testing-library/react';
import { UserPopoverMenu } from 'user/components/UserPopoverMenu';
import { UseUserMenuClickActions } from 'user/hooks/useUserMenuClickActions';
import { UseDarkMode } from 'styles/hooks/useDarkMode';
import { DarkModeMenuItem } from 'styles/components/DarkModeMenuItem';
import { DependencyProvider } from 'common/components/DependencyProvider';

jest.mock('user/components/UserAvatar', () => ({
    __esModule: true,
    UserAvatar: () => null,
}));

jest.mock('styles/components/DarkModeMenuItem', () => ({
    __esModule: true,
    DarkModeMenuItem: (props: ComponentProps<typeof DarkModeMenuItem>) => {
        if (!props.useDarkMode) return null;
        const { toggle } = props.useDarkMode();
        return (
            <div onClick={toggle}>Dark Mode</div>
        );
    },
}));

function testRender(
    deps: Partial<Dependencies>,
    props?: ComponentProps<typeof UserPopoverMenu>
) {
    return render(
        <DependencyProvider {...deps}>
            <UserPopoverMenu {...props} />
        </DependencyProvider>
    );
}

const onMenuClicks = {
    myRoom: jest.fn(),
    roomSettings: jest.fn(),
    shareRoom: jest.fn(),
    goBack: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    darkMode: jest.fn(),
};

const useUserMenuClickActions: UseUserMenuClickActions = () => onMenuClicks;

const useDarkMode: UseDarkMode = () => ({
    mode: 'dark',
    toggle: onMenuClicks.darkMode,
});

describe('<UserPopoverMenu />', () => {
    it('renders icon button', () => {
        const { container } = testRender({
            useBreadcrumbs: () => ({ isRoot: false, goBack: onMenuClicks.goBack }),
            useUser: () => ({ name: 'Name' }),
            useUserMenuClickActions,
            useDarkMode,
        });

        const button = container.querySelector('button.MuiIconButton-root');
        expect(button).toBeDefined();
        expect(button?.getAttribute('aria-label')).toBe('User menu');
    });

    it('renders menu when icon button receives onClick', () => {
        const { container } = testRender({
            useBreadcrumbs: () => ({ isRoot: false, goBack: onMenuClicks.goBack }),
            useUser: () => ({ name: 'Name' }),
            useUserMenuClickActions,
            useDarkMode,
        });

        const button = container.querySelector('button.MuiIconButton-root');
        fireEvent.click(button!);

        const menu = container.querySelector('div.MuiMenu-paper');
        expect(menu).toBeDefined();
    });

    describe('when user logged in', () => {
        type TestCase = [menuText: string, expectedMockCallbackKey: keyof typeof onMenuClicks];

        const cases: TestCase[] = [
            ['My Room', 'myRoom'],
            ['Room Settings', 'roomSettings'],
            ['Dark Mode', 'darkMode'],
            ['Share Room', 'shareRoom'],
            ['Back', 'goBack'],
            ['Logout', 'logout'],
        ];

        test.each(cases)('has "%s" menu item with appropriate "%s" callback', (menuText, expectedMockCallbackKey) => {
            const { container, getByText } = testRender({
                useBreadcrumbs: () => ({ isRoot: false, goBack: onMenuClicks.goBack }),
                useUser: () => ({ name: 'Name', roomId: '0' }),
                useUserMenuClickActions,
                useDarkMode,
            });
            const button = container.querySelector('button.MuiIconButton-root');
            fireEvent.click(button!);

            const menuItem = getByText(menuText);
            expect(menuItem).toBeDefined();

            fireEvent.click(menuItem);

            const mockCallback = onMenuClicks[expectedMockCallbackKey];
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('when user logged out', () => {
        type TestCase = [menuText: string, expectedMockCallbackKey: keyof typeof onMenuClicks];

        const cases: TestCase[] = [
            ['Dark Mode', 'darkMode'],
            ['Back', 'goBack'],
            ['Login', 'login'],
        ];

        test.each(cases)('has "%s" menu item with appropriate "%s" callback', (menuText, expectedMockCallbackKey) => {
            const { container, getByText } = testRender({
                useBreadcrumbs: () => ({ isRoot: false, goBack: onMenuClicks.goBack }),
                useUser: () => null,
                useUserMenuClickActions,
                useDarkMode,
            });
            const button = container.querySelector('button.MuiIconButton-root');
            fireEvent.click(button!);

            const menuItem = getByText(menuText);
            expect(menuItem).toBeDefined();

            fireEvent.click(menuItem);

            const mockCallback = onMenuClicks[expectedMockCallbackKey];
            expect(mockCallback).toHaveBeenCalledTimes(1);
        });
    });
});
