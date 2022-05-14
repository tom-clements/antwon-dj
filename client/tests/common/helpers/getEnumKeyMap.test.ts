import { getEnumKeyMap, getEnumKeyValueMap } from 'common/helpers/getEnumKeyMap';
import { TestEnum1, TestEnum2 } from 'tests/common/helpers/TestEnums';

describe('getEnumKeyMap()', () => {
    const testCases = [
        { input: TestEnum1, expectation: { 'A': 'A', 'B': 'B', 'C': 'C' } },
        { input: TestEnum2, expectation: { 'X': 'X', 'Y': 'Y', 'Z': 'Z' } },
    ];

    for (const testCase of testCases) {
        it(`returns ${testCase.expectation} for ${testCase.input}`, () => {
            const result = getEnumKeyMap(testCase.input, key => key);
            expect(result).toEqual(testCase.expectation);
        });
    }
});

describe('getEnumKeyValueMap()', () => {
    const testCases = [
        { input: TestEnum1, expectation: { 'A': 0, 'B': 1, 'C': 2 } },
        { input: TestEnum2, expectation: { 'X': 1, 'Y': 2, 'Z': 4 } },
    ];

    for (const testCase of testCases) {
        it(`returns ${testCase.expectation} for ${testCase.input}`, () => {
            const result = getEnumKeyValueMap(testCase.input);
            expect(result).toEqual(testCase.expectation);
        });
    }
});
