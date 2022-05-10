import { ComponentProps } from 'react';
import { render } from '@testing-library/react';
import { LinkAccountItem } from 'user/components/LinkAccountItem';
import { mockAccountLinksFactory } from 'tests/user/helpers/mockAccountLinksFactory';
import type { AccountLinkModel } from 'user/model/AccountLinkModel';

jest.mock('@mui/icons-material', () => ({
    __esModule: true,
    Link: () => null,
    LinkOff: () => null,
}));

function testRender(props: ComponentProps<typeof LinkAccountItem>) {
    return render(<LinkAccountItem {...props} />);
}

type TestCase = {
    input: AccountLinkModel;
    expectedTextContent: string;
};

describe('<LinkAccountItem />', () => {
    const accountLinks = mockAccountLinksFactory(false)();
    const testCases: TestCase[] = accountLinks.map(link => ({
        input: link,
        expectedTextContent: link.accountName,
    }));

    for (const testCase of testCases) {
        it(`renders account card with <LinkButton /> for ${testCase.input.type}`, () => {
            const { container } = testRender({
                accountLink: testCase.input
            });

            expect(container.textContent).toContain(testCase.expectedTextContent);
        });
    }
});
