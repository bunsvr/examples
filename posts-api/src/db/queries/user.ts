import db from '@db';
import {
    apiKey as userAPIKey,
    userTable, username, password
} from '@db/user';

export const userExists = db.query(`exists(select 1 from ${userTable} with (nolock) where ${userTable}.${username} = $${username})`);
export const apiKey = db.query(`select (${userAPIKey}) from ${userTable} with (nolock) limit 1`);

export const createUser = db.query(`insert into ${userTable} (${username}, ${password}, ${apiKey}) values ($${username}, $${password}, $${apiKey})`);

