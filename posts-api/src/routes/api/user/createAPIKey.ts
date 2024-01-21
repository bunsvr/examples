export default (username: string) => {
    username += Date.now();
    return Bun.CryptoHasher.hash('sha256', username, 'base64');
}
