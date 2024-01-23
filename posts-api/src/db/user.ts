import type { Database } from 'bun:sqlite';
import createTable from './utils/createTable';

export const table = 'Users';

export const name = 'name';
export const password = 'password';
export const apiKey = 'apiKey';

export const $name = `$${name}`;
export const $password = `$${password}`;
export const $apiKey = `$${apiKey}`;

export function createUserTable(db: Database) {
    createTable(db, table, {
        [name]: 'text not null',
        [password]: 'text not null',
        [apiKey]: 'text not null'
    }, [name, apiKey]);
}
