import { getApiBaseUrl } from 'config/getApiBaseUrl';

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

describe('getApiBaseUrl()', () => {
    for (const testCase of urlTestCases) {
        it(`returns correct URL if API_BASE_URL = "${testCase.input}"`, () => {
            process.env.API_BASE_URL = testCase.input;

            const result = getApiBaseUrl();

            expect(result).toBe(testCase.expectation);
        });
    }

    for (const testCase of falsyCases) {
        it(`throws if API_BASE_URL = "${testCase.text}"`, () => {
            process.env.API_BASE_URL = testCase.input;

            expect(() => getApiBaseUrl()).toThrow();
        });
    }
});
