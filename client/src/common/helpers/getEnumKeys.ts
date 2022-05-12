export const getEnumKeys = <T>(enumValue: T): [keyof T] => {
    return Object.keys(enumValue).filter(i => isNaN(Number(i))) as unknown as [keyof T];
};
