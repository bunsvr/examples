import users from '@db/table/users';
import query from '@db/utils/query';

const userExistsQuery = `select 1 from ${users} where ${users.$name} = $name` as const;
/**
 * Search for user with matching username
 */
export const userExists = query<1, typeof userExistsQuery>(userExistsQuery);

const getCredentialsQuery = `select ${users[':password']}, ${users[':apiKey']} from ${users} where ${users.$name} = $name limit 1` as const;
/**
 * Get credentials
 */
export const credentials = query<{
    password: string,
    apiKey: string
}, typeof getCredentialsQuery>(getCredentialsQuery);

const apiKeyExistsQuery = `select 1 from ${users} where ${users.$apiKey} = $apiKey` as const;
/**
 * Check whether API key exists
 */
export const apiKeyExists = query<1, typeof apiKeyExistsQuery>(apiKeyExistsQuery);

const getUsernameWithKey = `select ${users[':name']} from ${users} where ${users.$apiKey} = $apiKey` as const;
/**
 * Search for user with matching API keys
 */
export const usernameWithKey = query<{
    name: string
}, typeof getUsernameWithKey>(getUsernameWithKey);

const updateKeyByUsernameQuery = `update ${users} set apiKey = $apiKey where ${users.$name} = $name` as const;
/**
 * Update the API key of a specific user based on username
 */
export const updateKeyByUsername = query<void, typeof updateKeyByUsernameQuery>(updateKeyByUsernameQuery);

const updatePassByKeyQuery = `update ${users} set password = $password where ${users.$apiKey} = $apiKey` as const;
/**
 * Update the password of a specific user based on API key
 */
export const updatePassByKey = query<void, typeof updatePassByKeyQuery>(updatePassByKeyQuery);

const createUserQuery = `insert into ${users} (${users.cols}) values ($name, $password, $apiKey)` as const;
/**
 * Create a new user
 */
export const createUser = query<void, typeof createUserQuery>(createUserQuery);

