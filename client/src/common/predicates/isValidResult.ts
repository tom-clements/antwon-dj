import type { ValidationResult, ValidResult } from 'common/model/ValidationResult';

export const isValidResult = (result: ValidationResult): result is ValidResult => {
    return result.isValid;
};
