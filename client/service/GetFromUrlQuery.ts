import { ParsedUrlQuery } from 'querystring';

export function getSingleFromUrlQuery(query: ParsedUrlQuery, key: string): string | null {
    const result = query[key];
    return result && !Array.isArray(result)
        ? result
        : null;
}
