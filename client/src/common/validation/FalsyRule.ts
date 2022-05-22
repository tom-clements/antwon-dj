import type { ValidationRule } from 'common/model/ValidationRule';
import { invalidResult, validResult } from 'common/model/ValidationResult';

export class FalsyRule implements ValidationRule {
    constructor(private input: any) {
    }

    validate = () => !this.input
        ? validResult()
        : invalidResult(`Input '${this.input}' is truthy`);
}
