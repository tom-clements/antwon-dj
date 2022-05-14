import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { MenuContainer } from 'common/components/MenuContainer';
import Paper from '@mui/material/Paper';

jest.mock('@mui/material/Paper', () => ({
    __esModule: true,
    default: (props: ComponentProps<typeof Paper>) => (
        <div
            {...props}
            data-elevation={props.elevation}
        >
            {props.children}
        </div>
    ),
}));

function testRender(props: ComponentProps<typeof MenuContainer>) {
    return render(<MenuContainer {...props}>Test</MenuContainer>);
}

describe('<MenuContainer />', () => {
    it('renders <MenuContainer /> with children in <Paper />', () => {
        const { getByText } = testRender({});

        const menuContainer = getByText('Test');
        expect(menuContainer).toHaveAttribute('data-elevation', '0');
    });

    describe('props.disableGutter', () => {
        type TestCase = {
            disableGutter: boolean | undefined;
            expectation: string | undefined;
        };

        const testCases: TestCase[] = [
            {
                disableGutter: undefined,
                expectation: '0px 16px'
            },
            {
                disableGutter: false,
                expectation: '0px 16px'
            },
            {
                disableGutter: true,
                expectation: '0'
            },
        ];

        for (const testCase of testCases) {
            it(`with ${testCase.disableGutter} renders margin: ${testCase.expectation}`, () => {
                const { getByText } = testRender({
                    disableGutter: testCase.disableGutter
                });

                const menuContainer = getByText('Test');

                expect(menuContainer).toHaveStyleRule('margin', testCase.expectation);
            });
        }
    });
});
