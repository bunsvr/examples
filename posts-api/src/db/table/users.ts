import t from '@db/utils/types';
import sql from 'sql-light';

const users = sql.table({
    name: 'users',
    schema: {
        name: t.text,
        password: t.text,
        apiKey: t.text
    },
    primaryKeys: ['name', 'apiKey']
});

export default users;

