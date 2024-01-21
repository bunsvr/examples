import db from '@db';
import {
    apiKey, userTable, username, password,
    $username, $password, $apiKey
} from '@db/user';

/**
 * Search for user with matching username
 */
export const userExists = db.query<1, {
    [$username]: string
}>(`select 1 from ${userTable} where ${userTable}.${username} = ${$username}`);

/**
 * Get credentials
 */
export const credentials = db.query<{
    [password]: string,
    [apiKey]: string
}, {
    [$username]: string
}>(`select ${apiKey}, ${password} from ${userTable} where ${userTable}.${username} = ${$username} limit 1`);

/**
 * Search for user with matching API keys
 */
export const usernameWithKey = db.query<{
    [username]: string
}, {
    [$apiKey]: string
}>(`select ${username} from ${userTable} where ${userTable}.${apiKey} = ${$apiKey}`);

export const updateAPIKey = db.query<void, {
    [$username]: string,
    [$apiKey]: string
}>(`update ${userTable} set ${apiKey} = ${$apiKey} where ${username} = ${$username}`)

/**
 * Create a new user
 */
export const createUser = db.query<null, {
    [$username]: string,
    [$password]: string,
    [$apiKey]: string
}>(`insert into ${userTable} (${username}, ${password}, ${apiKey}) values (${$username}, ${$password}, ${$apiKey})`);

