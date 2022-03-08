import { getApiBaseUrl } from "service/Config";

describe("getApiBaseUrl()", () => {
    const testCases = [
        { API_BASE_URL: "http://localhost", expectation: "http://localhost/" },
        { API_BASE_URL: "http://localhost/", expectation: "http://localhost/" },
        { API_BASE_URL: "   http://localhost/      ", expectation: "http://localhost/" },
        { API_BASE_URL: "http://localhost:8080", expectation: "http://localhost:8080/" },
        { API_BASE_URL: "http://localhost:8080/", expectation: "http://localhost:8080/" },
    ]

    for (const testCase of testCases) {
        it(`returns correct URL from API_BASE_URL = "${testCase.API_BASE_URL}"`, () => {
            process.env.API_BASE_URL = testCase.API_BASE_URL;

            const result = getApiBaseUrl();

            expect(result).toBe(testCase.expectation);
        });
    }
});
