import createTable from '@db/utils/table/createTable';
import t from '@db/utils/table/types';
import user from './user';

const posts = createTable({
    name: 'posts',
    schema: {
        id: t.int,
        title: t.text,
        content: t.text,

        // Store as string list separated by comma
        categories: t.text,
        author: t.ref(t.text, user.rows.name),
        contributors: t.text
    },
    primaryKeys: ['id']
});

export default posts;
