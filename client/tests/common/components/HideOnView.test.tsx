import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { HideOnView } from 'common/components/HideOnView';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

jest.mock('@mui/material/useScrollTrigger', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('@mui/material/Slide', () => ({
    __esModule: true,
    default: (props: ComponentProps<typeof Slide>) => (
        <div
            id={'slideTest'}
            data-appear={props.appear}
            data-direction={props.direction}
            data-in={props.in}
        >
            {props.children}
        </div>
    ),
}));

function testRender() {
    return render(<HideOnView><div>Test</div></HideOnView>);
}

describe('<HideOnScroll />', () => {
    it('render children with slide in if not scrolled', () => {
        jest.mocked(useScrollTrigger).mockReturnValue(false);

        const { container } = testRender();

        const slide = container.querySelector('div#slideTest');
        expect(slide?.textContent).toBe('Test');
        expect(slide?.getAttribute('data-appear')).toBe('false');
        expect(slide?.getAttribute('data-direction')).toBe('down');
        expect(slide?.getAttribute('data-in')).toBe('true');
    });

    it('render children with slide out if scrolled', () => {
        jest.mocked(useScrollTrigger).mockReturnValue(true);

        const { container } = testRender();

        const slide = container.querySelector('div#slideTest');
        expect(slide?.textContent).toBe('Test');
        expect(slide?.getAttribute('data-appear')).toBe('false');
        expect(slide?.getAttribute('data-direction')).toBe('down');
        expect(slide?.getAttribute('data-in')).toBe('false');
    });
});
