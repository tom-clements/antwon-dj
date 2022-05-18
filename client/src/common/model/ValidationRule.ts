import { ValidationResult } from 'common/model/ValidationResult';

export interface ValidationRule {
    validate: () => ValidationResult;
}
