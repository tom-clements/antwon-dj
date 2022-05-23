export function getClientBaseUrl() {
    const clientBaseUrl = process.env.CLIENT_BASE_URL;
    if (!clientBaseUrl) throw new Error('Missing CLIENT_BASE_URL!');
    return `${clientBaseUrl.trim().replace(/\/+$/, '')}/`;
}
