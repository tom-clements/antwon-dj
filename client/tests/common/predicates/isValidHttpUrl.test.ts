import { isValidHttpUrl } from 'common/predicates/isValidHttpUrl';

beforeEach(() => {
    global.URL = jest.fn((value: string) => ({
        protocol: value.startsWith('http:')
            ? 'http:'
            : value.startsWith('https:')
                ? 'https:'
                : null
    })) as any;
});

describe('isValidHttpUrl()', () => {
    type TestCase = [input: string | undefined | null, expectation: boolean];

    const cases: TestCase[] = [
        [undefined, false],
        [null, false],
        ['http://localhost', true],
        ['https://localhost', true],
        ['localhost', false]
    ];

    test.each(cases)('given %p returns %p', (input, expectation) => {
        const result = isValidHttpUrl(input);

        expect(result).toBe(expectation);
    });
});
