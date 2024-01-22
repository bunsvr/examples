import { password, type Password } from 'bun';

// Hash using BCrypt
const algorithm: Password.Argon2Algorithm = { algorithm: 'argon2id' };

export default (passwordText: string) => password.hash(passwordText, algorithm);
