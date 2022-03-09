import { getClientBaseUrl } from 'service/config/getClientBaseUrl';

const urlTestCases = [
    { input: 'http://localhost', expectation: 'http://localhost/' },
    { input: 'http://localhost/', expectation: 'http://localhost/' },
    { input: '   http://localhost/      ', expectation: 'http://localhost/' },
    { input: 'http://localhost:8080', expectation: 'http://localhost:8080/' },
    { input: 'http://localhost:8080/', expectation: 'http://localhost:8080/' },
];

const falsyCases = [
    { input: '', text: '\'\'' },
];

describe('getClientBaseUrl()', () => {
    for (const testCase of urlTestCases) {
        it(`returns correct URL if CLIENT_BASE_URL = "${testCase.input}"`, () => {
            process.env.CLIENT_BASE_URL = testCase.input;

            const result = getClientBaseUrl();

            expect(result).toBe(testCase.expectation);
        });
    }

    for (const testCase of falsyCases) {
        it(`throws if CLIENT_BASE_URL = "${testCase.text}"`, () => {
            process.env.CLIENT_BASE_URL = testCase.input;

            expect(() => getClientBaseUrl()).toThrow();
        });
    }
});
