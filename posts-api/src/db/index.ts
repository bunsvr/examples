import { Database } from 'bun:sqlite';

import * as user from '@db/table/user';
import * as post from '@db/table/post';

// Setup DB
const db = new Database(`${import.meta.dir}/local/.db`, { create: true });

db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA synchronous = NORMAL");

// Create necessary tables
db.run(user.init);
db.run(post.init);

export default db;
