export function getBaseUrl() {
    const scheme = "https";

    /**
     * Warning - realistically, this should not be accessible beyond dev / if repo goes public!
     */
    const host = "m5ua2jc51a.execute-api.eu-west-2.amazonaws.com";
    
    /**
     * This should update via environment variables or similar at a later stage
     */
    const stack = "dev";

    return `${scheme}://${host}/${stack}/`;
}
