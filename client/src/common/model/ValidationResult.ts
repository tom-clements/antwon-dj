export interface ValidResult {
    isValid: true;
}

export interface InvalidResult {
    isValid: false;
    why: string;
}

export type ValidationResult = ValidResult | InvalidResult;

export const validResult = (): ValidResult => ({
    isValid: true,
});

export const invalidResult = (why: string): InvalidResult => ({
    isValid: false,
    why,
});
