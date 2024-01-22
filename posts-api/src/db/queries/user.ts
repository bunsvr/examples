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
 * Check whether API key exists
 */
export const apiKeyExists = db.query<1, {
    [$apiKey]: string
}>(`select 1 from ${userTable} where ${userTable}.${apiKey} = ${$apiKey}`);

/**
 * Search for user with matching API keys
 */
export const usernameWithKey = db.query<{
    [username]: string
}, {
    [$apiKey]: string
}>(`select ${username} from ${userTable} where ${userTable}.${apiKey} = ${$apiKey}`);

/**
 * Update the API key of a specific user based on username
 */
export const updateKeyByUsername = db.query<void, {
    [$username]: string,
    [$apiKey]: string
}>(`update ${userTable} set ${apiKey} = ${$apiKey} where ${username} = ${$username}`);


/**
 * Update the password of a specific user based on API key
 */
export const updatePassByKey = db.query<void, {
    [$password]: string,
    [$apiKey]: string
}>(`update ${userTable} set ${password} = ${$password} where ${apiKey} = ${$apiKey}`);

/**
 * Create a new user
 */
export const createUser = db.query<null, {
    [$username]: string,
    [$password]: string,
    [$apiKey]: string
}>(`insert into ${userTable} (${username}, ${password}, ${apiKey}) values (${$username}, ${$password}, ${$apiKey})`);

