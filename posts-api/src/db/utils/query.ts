import db from '@db';
import sql from 'sql-light';

export default <Output, Q extends string>(query: Q) => {
    const q = sql.query(query);
    return db.query<Output, typeof q.infer>(q);
}
