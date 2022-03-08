export function getApiBaseUrl() {
    const apiBaseUrl = process.env.API_BASE_URL;
    if (!apiBaseUrl) throw new Error('Missing API base stack!');
    return `${apiBaseUrl.trim().replace(/\/+$/, '')}/`;
}
