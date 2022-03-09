
import { getClientBaseUrl } from 'service/config/getClientBaseUrl';
import { getRelativeRoomUrl, getFullRoomUrl } from 'service/room/getRoomUrl';

jest.mock('service/config/getClientBaseUrl');
const mocks = {
    getClientBaseUrl: getClientBaseUrl as jest.Mock<ReturnType<typeof getClientBaseUrl>>
};

const testCases = [
    { input: 'ABCDEF', expectation: '/room/ABCDEF' },
    { input: 'ABCDEF', expectation: '/room/ABCDEF' },
    { input: '123456', expectation: '/room/123456' },
    { input: '123456', expectation: '/room/123456' },
];

describe('getRelativeRoomUrl()', () => {
    for (const testCase of testCases) {
        it(`returns correct relative URL for code = '${testCase.input}'`, () => {
            const result = getRelativeRoomUrl(testCase.input);

            expect(result).toBe(testCase.expectation);
        });
    }
});

describe('getFullRoomUrl()', () => {
    for (const testCase of testCases) {
        it(`returns correct full URL for code = '${testCase.input}'`, () => {
            const clientBaseUrl = 'https://localhost/';
            mocks.getClientBaseUrl.mockReturnValue(clientBaseUrl);

            const result = getFullRoomUrl(testCase.input);

            expect(result).toBe(`${clientBaseUrl}${testCase.expectation}`);
        });
    }
});
