import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { UserAvatar } from 'user/components/UserAvatar';
import { isValidHttpUrl } from 'common/predicates/isValidHttpUrl';

jest.mock('common/predicates/isValidHttpUrl');

function testRender(props: ComponentProps<typeof UserAvatar>) {
    return render(<UserAvatar {...props} />);
}

describe('<UserAvatar />', () => {
    it('renders fallback icon without a user', () => {
        const { container } = testRender({
            user: null
        });

        const iconContainer = container.querySelector('div.MuiAvatar-root');
        expect(iconContainer).toBeDefined();
        expect(iconContainer?.getAttribute('title')).toBe('?');

        const icon = iconContainer?.querySelector('svg.MuiAvatar-fallback');
        expect(icon).toBeDefined();
    });

    it('renders initial icon with a user and an invalid imageUrl', () => {
        jest.mocked(isValidHttpUrl).mockReturnValue(false);

        const { container } = testRender({
            user: { name: 'Name', imageUrl: 'url' }
        });

        const iconContainer = container.querySelector('div.MuiAvatar-root');
        expect(iconContainer?.getAttribute('title')).toBe('Name');

        const textContent = iconContainer?.textContent;
        expect(textContent).toBe('N');
    });

    it('renders image icon with a user and a valid imageUrl', () => {
        jest.mocked(isValidHttpUrl).mockReturnValue(true);

        const { container } = testRender({
            user: { name: 'Name', imageUrl: 'url' }
        });

        const iconContainer = container.querySelector('div.MuiAvatar-root');
        expect(iconContainer?.getAttribute('title')).toBe('Name');

        const icon = iconContainer?.querySelector('img.MuiAvatar-img');
        expect(icon).toBeDefined();
        expect(icon?.getAttribute('alt')).toBe('Name');
    });
});
