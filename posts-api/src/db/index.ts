import { Database } from 'bun:sqlite';
import { createUserTable } from './user';

const db = new Database(
    import.meta.dir + (process.env.NODE_ENV !== 'production' ? '/dev.db' : '/prod.db'),
    { create: true }
);

// Setup DB
db.run("PRAGMA journal_mode = WAL");
db.run("PRAGMA synchronous = NORMAL");

createUserTable(db);

export default db;
