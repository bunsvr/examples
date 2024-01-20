import type { Database } from 'bun:sqlite';

export const userTable = 'Users';

export const username = 'username';
export const password = 'password';
export const apiKey = 'apiKey';

export const $username = `$${username}`;
export const $password = `$${password}`;
export const $apiKey = `$${apiKey}`;

export function createUserTable(db: Database) {
    // Create the table
    db.run(`create table if not exists ${userTable} ( ${username} text not null, ${password} text not null, ${apiKey} text not null, primary key (${username}, ${apiKey}) )`);
}
