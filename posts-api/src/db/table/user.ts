import createTable from '@db/utils/createTable';

// Constants
export const table = 'Users';

export const name = 'name';
export const password = 'password';
export const apiKey = 'apiKey';

export const $name = `$${name}`;
export const $password = `$${password}`;
export const $apiKey = `$${apiKey}`;

// Table init
export const init = createTable(table, {
    [name]: 'text not null',
    [password]: 'text not null',
    [apiKey]: 'text not null'
}, [name, apiKey]);
