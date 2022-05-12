import { getEnumKeys } from 'common/helpers/getEnumKeys';
import { TestEnum1, TestEnum2 } from 'tests/common/helpers/TestEnums';

describe('getEnumKeys()', () => {
    const testCases = [
        { input: TestEnum1, expectation: ['A', 'B', 'C'] },
        { input: TestEnum2, expectation: ['Z', 'Y', 'X'] },
    ];

    for (const testCase of testCases) {
        it(`returns ${testCase.expectation} for ${testCase.input}`, () => {
            const result = getEnumKeys(testCase.input);

            expect(result).toEqual(testCase.expectation);
        });
    }
});
