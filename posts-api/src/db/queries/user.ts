import db from '@db';
import * as user from '@db/table/user';

/**
 * Search for user with matching username
 */
export const userExists = db.query<1, {
    [user.$name]: string
}>(`select 1 from ${user.table} where ${user.table}.${user.name} = ${user.$name}`);

/**
 * Get credentials
 */
export const credentials = db.query<{
    [user.password]: string,
    [user.apiKey]: string
}, {
    [user.$name]: string
}>(`select ${user.apiKey}, ${user.password} from ${user.table} where ${user.table}.${user.name} = ${user.name} limit 1`);

/**
 * Check whether API key exists
 */
export const apiKeyExists = db.query<1, {
    [user.$apiKey]: string
}>(`select 1 from ${user.table} where ${user.table}.${user.apiKey} = ${user.$apiKey}`);

/**
 * Search for user with matching API keys
 */
export const usernameWithKey = db.query<{
    [user.name]: string
}, {
    [user.$apiKey]: string
}>(`select ${user.name} from ${user.table} where ${user.table}.${user.apiKey} = ${user.$apiKey}`);

/**
 * Update the API key of a specific user based on username
 */
export const updateKeyByUsername = db.query<void, {
    [user.$name]: string,
    [user.$apiKey]: string
}>(`update ${user.table} set ${user.apiKey} = ${user.$apiKey} where ${user.name} = ${user.$name}`);


/**
 * Update the password of a specific user based on API key
 */
export const updatePassByKey = db.query<void, {
    [user.$password]: string,
    [user.$apiKey]: string
}>(`update ${user.table} set ${user.password} = ${user.$password} where ${user.apiKey} = ${user.$apiKey}`);

/**
 * Create a new user
 */
export const createUser = db.query<null, {
    [user.$name]: string,
    [user.$password]: string,
    [user.$apiKey]: string
}>(`insert into ${user.table} (${user.name}, ${user.password}, ${user.apiKey}) values (${user.$name}, ${user.$password}, ${user.$apiKey})`);

