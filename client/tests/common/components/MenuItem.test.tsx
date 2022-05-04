import { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MenuItem } from 'common/components/MenuItem';
import { Login } from '@mui/icons-material';

jest.mock('@mui/icons-material', () => ({
    __esModule: true,
    Login: () => <div>Login</div>,
}));

function testRender(props: ComponentProps<typeof MenuItem>) {
    return render(<MenuItem {...props} />);
}

describe('<MenuItem />', () => {
    it('renders item with text', () => {
        const onClick = jest.fn();

        const { container } = testRender({
            text: 'Test',
            onClick,
        });

        expect(container.textContent).toBe('Test');
    });

    it('can be clicked', () => {
        const onClick = jest.fn();
        const { container } = testRender({
            text: 'Test',
            onClick,
        });

        const item = container.querySelector('li.MuiMenuItem-root');
        fireEvent.click(item!);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('render icon if passed', () => {
        const onClick = jest.fn();
        const { container } = testRender({
            text: 'Test',
            onClick,
            icon: Login
        });

        expect(container.textContent).toBe('LoginTest');
    });
});
