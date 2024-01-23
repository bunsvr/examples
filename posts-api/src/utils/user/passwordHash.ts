import { password } from 'bun';

// Hash using BCrypt
const algorithm: Parameters<typeof password.hash>[1] = 'bcrypt';

export default (passwordText: string) => password.hash(passwordText, algorithm);
