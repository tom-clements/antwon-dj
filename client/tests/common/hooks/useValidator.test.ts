import { useValidator } from 'common/hooks/useValidator';
import type { ValidationRule } from 'common/model/ValidationRule';
import { isValidResult } from 'common/predicates/isValidResult';
import { FalsyRule } from 'common/validation/FalsyRule';
import { TruthyRule } from 'common/validation/TruthyRule';

describe('useValidator()', () => {
    type TestCase = {
        inputName: string;
        expectationName: 'validResult' | 'invalidResult';
        inputRules: ValidationRule[];
        isTruthyExpectation: boolean;
        whyExpectation?: string;
    };

    const testCases: TestCase[] = [
        {
            inputName: 'one validating rule',
            expectationName: 'validResult',
            inputRules: [new TruthyRule(true)],
            isTruthyExpectation: true,
        },
        {
            inputName: 'two validating rules',
            expectationName: 'validResult',
            inputRules: [new TruthyRule(true), new FalsyRule(false)],
            isTruthyExpectation: true,
        },
        {
            inputName: 'one validating and one invalidating rule',
            expectationName: 'invalidResult',
            inputRules: [new TruthyRule(true), new FalsyRule(true)],
            isTruthyExpectation: false,
            whyExpectation: 'Input \'true\' is truthy'
        },
        {
            inputName: 'one invalidating rule',
            expectationName: 'invalidResult',
            inputRules: [new TruthyRule(false)],
            isTruthyExpectation: false,
            whyExpectation: 'Input \'false\' is falsy'
        },
        {
            inputName: 'two invalidating rules',
            expectationName: 'invalidResult',
            inputRules: [new TruthyRule(false), new FalsyRule(true)],
            isTruthyExpectation: false,
            whyExpectation: 'Input \'false\' is falsy'
        },
    ];
    
    for (const testCase of testCases) {
        it(`returns ${testCase.expectationName} for ${testCase.inputName}`, () => {
            const result = useValidator({ rules: testCase.inputRules });

            expect(isValidResult(result)).toBe(testCase.isTruthyExpectation);

            if (!isValidResult(result)) {
                expect((result.why)).toBe(testCase.whyExpectation);
            }
        });
    }
});
