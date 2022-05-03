import { ComponentProps } from 'react';
import type { AnyChildProps } from 'common/model/ReactTypes';
import { fireEvent, render } from '@testing-library/react';
import { SettingsView } from 'common/components/SettingsView';

jest.mock('common/components/HideOnView', () => ({
    __esModule: true,
    HideOnView: (props: AnyChildProps) => (
        <div id='hideOnView'>
            {props.children}
        </div>
    ),
}));

jest.mock('@mui/icons-material', () => ({
    __esModule: true,
    ArrowBack: () => null,
}));

function testRender(props: ComponentProps<typeof SettingsView>) {
    return render(<SettingsView {...props} />);
}

beforeEach(() => {
    jest.resetAllMocks();
});

describe('<SettingsView />', () => {
    it('renders hide-able app bar with a titled toolbar', () => {
        const { container } = testRender({
            title: 'Settings',
        });

        const hideOnView = container.querySelector('div#hideOnView');
        expect(hideOnView).toBeDefined();

        const appBar = container.querySelector('div.MuiAppBar-root');
        expect(appBar).toBeDefined();

        const toolbar = container.querySelector('div.MuiToolbar-root');
        expect(toolbar).toBeDefined();
        expect(toolbar?.textContent).toBe('Settings');
    });

    describe('<BackButton />', () => {
        it('does not render when onGoBack is omitted', () => {
            const { container } = testRender({
                title: 'Settings',
                onGoBack: undefined,
            });

            const backButton = container.querySelector('button.MuiButtonBase-root');

            expect(backButton).toBeNull();
        });

        it('renders when onGoBack is provided', () => {
            const onGoBack = jest.fn();
            const { container } = testRender({
                title: 'Settings',
                onGoBack
            });

            const backButton = container.querySelector('button.MuiButtonBase-root');

            expect(backButton).toBeDefined();
        });

        it('when clicked calls onGoBack', () => {
            const onGoBack = jest.fn();
            const { container } = testRender({
                title: 'Settings',
                onGoBack
            });
            const backButton = container.querySelector('button.MuiButtonBase-root');

            fireEvent.click(backButton!);
            expect(onGoBack).toHaveBeenCalledTimes(1);
        });
    });
});
