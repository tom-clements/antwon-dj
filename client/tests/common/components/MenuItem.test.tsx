import { ComponentProps } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MenuItem } from 'common/components/MenuItem';
import { Login } from '@mui/icons-material';
import { MenuItemPadding } from 'common/model/MenuItemPadding';

jest.mock('@mui/icons-material', () => ({
    __esModule: true,
    Login: () => <div>Login</div>,
}));

const onClick = jest.fn();

function testRender(props: Partial<ComponentProps<typeof MenuItem>>) {
    return render((
        <MenuItem
            {...props}
            text={props.text ?? 'Test'}
            onClick={props.onClick ?? onClick}
        />
    ));
}

describe('<MenuItem />', () => {
    it('renders item with text', () => {
        const { getByText } = testRender({});

        const linkItem = getByText('Test').parentElement;
        expect(linkItem).toHaveTextContent('Test');
    });

    it('can be clicked', () => {
        const { getByText } = testRender({});

        const linkItem = getByText('Test').parentElement;
        fireEvent.click(linkItem!);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    describe('props.icon', () => {
        it('render icon if passed', () => {
            const { getByText } = testRender({
                icon: Login
            });

            const linkItem = getByText('Test').parentElement;
            expect(linkItem).toHaveTextContent('LoginTest');
        });
    });

    describe('props.padding', () => {
        type TestCase = {
            input: MenuItemPadding | undefined;
            expectation: string;
        };

        const testCases: TestCase[] = [
            {
                input: undefined,
                expectation: '6px 16px'
            },
            {
                input: MenuItemPadding.Default,
                expectation: '6px 16px'
            },
            {
                input: MenuItemPadding.Large,
                expectation: '16px 24px'
            },
        ];

        for (const testCase of testCases) {
            const name = testCase.input != undefined ? MenuItemPadding[testCase.input] : 'undefined';
            it(`with ${name} renders ${testCase.expectation}`, () => {
                const { getByText } = testRender({
                    padding: testCase.input
                });

                const linkItem = getByText('Test').parentElement;
                expect(linkItem).toHaveStyleRule('padding', testCase.expectation);
            });
        }
    });

    describe('props.divider', () => {
        type TestCase = {
            renderDivider: boolean | undefined;
            expectation: string | undefined;
        };

        const testCases: TestCase[] = [
            {
                renderDivider: undefined,
                expectation: undefined
            },
            {
                renderDivider: false,
                expectation: undefined
            },
            {
                renderDivider: true,
                expectation: '1px solid rgba(0, 0, 0, 0.12)'
            },
        ];

        for (const testCase of testCases) {
            it(`with ${testCase.renderDivider} renders border-bottom: ${testCase.expectation}`, () => {
                const { getByText } = testRender({
                    divider: testCase.renderDivider
                });

                const linkItem = getByText('Test').parentElement;

                if (testCase.expectation) {
                    expect(linkItem).toHaveStyleRule('border-bottom', testCase.expectation);
                } else {
                    expect(linkItem).not.toHaveStyleRule('border-bottom', undefined);
                }
            });
        }
    });
});
