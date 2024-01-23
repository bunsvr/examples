import { Database } from 'bun:sqlite';
import { createUserTable } from './user';
import { createPostTable } from './post';

const db = new Database(
    import.meta.dir + (process.env.NODE_ENV !== 'production' ? '/dev.db' : '/prod.db'),
    { create: true }
);

// Setup DB
db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA synchronous = NORMAL");

// Create necessary tables
createUserTable(db);
createPostTable(db);

export default db;
