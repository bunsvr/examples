export const apiKeyLength = 30;

export default function createAPIKey() {
    let key = '';

    for (let i = 0; i < apiKeyLength; ++i)
        key += ((Math.random() * 36) | 0).toString(36);

    return key;
}
