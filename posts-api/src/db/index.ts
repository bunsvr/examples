import { Database } from 'bun:sqlite';

import users from '@db/table/users';
import posts from '@db/table/posts';

// Setup DB
const db = new Database(`${import.meta.dir}/local/.db`, { create: true });

// Pragmas
db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA synchronous = NORMAL");

// Create necessary tables
db.run(users.init);
db.run(posts.init);

export default db;
