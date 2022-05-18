import type { HF } from 'common/model/HookFunction';
import type { ValidationRule } from 'common/model/ValidationRule';
import type { ValidationResult } from 'common/model/ValidationResult';
import { validResult } from 'common/model/ValidationResult';
import { isValidResult } from 'common/predicates/isValidResult';

interface Props {
    /**
     * Collection of validation rules to evaluate
     */
    rules: ValidationRule[];
}

export type UseValidator = HF<Props, ValidationResult>;

/**
 * An eager validation hook. Returns the first invalid result from evaluating the
 * collection of validation rules or a valid result otherwise.
 * @returns A valid or invalid validation result
 */
export const useValidator: UseValidator = props => {
    for (const rule of props.rules) {
        const result = rule.validate();
        if (!isValidResult(result)) return result;
    }

    return validResult();
};
