export function getApiBaseScheme() {
    const scheme = process.env.API_BASE_SCHEME;
    if (!scheme) throw new Error('Missing API base scheme!');
    return scheme;
}

export function getApiBaseHost() {
    const host = process.env.API_BASE_HOST;
    if (!host) throw new Error('Missing API base host!');
    return host;
}

export function getApiBaseStack() {
    const stack = process.env.API_BASE_STACK;
    if (!stack) throw new Error('Missing API base stack!');
    return stack;
}

export function getBaseUrl() {
    return `${getApiBaseScheme()}://${getApiBaseHost()}/${getApiBaseStack()}/`;
}
