export const isValidHttpUrl = (value: string | undefined | null) => {
    if (!value) return false;

    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
};
