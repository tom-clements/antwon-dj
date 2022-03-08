export function getApiBaseUrl() {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) throw new Error('Missing API_BASE_URL');
    return `${apiBaseUrl.trim().replace(/\/+$/, '')}/`;
}

export function getClientBaseUrl() {
    const clientBaseUrl = process.env.CLIENT_BASE_URL;
    if (!clientBaseUrl) throw new Error('Missing CLIENT_BASE_URL!');
    return `${clientBaseUrl.trim().replace(/\/+$/, '')}/`;
}
