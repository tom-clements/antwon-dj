import { getEnumKeys } from 'common/helpers/getEnumKeys';

export const getEnumKeyMap = <T, R>(enumValue: T, mapper: (key: keyof T) => R): Record<keyof T, R> => {
    const keys = getEnumKeys(enumValue);
    return keys.reduce((obj: any, key) => (obj[key] = mapper(key), obj), {});
};

export const getEnumKeyValueMap = <T>(enumValue: T) => {
    return getEnumKeyMap(enumValue, key => enumValue[key]);
};
