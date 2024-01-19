import type { Database } from 'bun:sqlite';

export const userTable = 'Users';

export const username = 'username';
export const password = 'password';
export const apiKey = 'apiKey';

export function createUserTable(db: Database) {
    // Create the table
    db.run(`create table if not exists ${userTable} ( ${username} not null varchar(255) primary key, ${password} not null varchar(255), ${apiKey} not null varchar(255) )`);
}
