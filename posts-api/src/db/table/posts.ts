import t from '@db/utils/types';
import users from './users';

import sql from 'sql-light';

const posts = sql.table({
    name: 'posts',
    schema: {
        id: t.int,
        title: t.text,
        content: t.textDefault,

        // Store as string list separated by comma
        categories: t.textDefault,
        author: t.text,
        contributors: t.textDefault
    },
    primaryKeys: ['id'],
    foreignKeys: [{
        keys: ['author'],
        ref: users.ref('name')
    }]
});

export default posts;
