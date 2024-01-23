import createTable from '@db/utils/table/createTable';
import t from '@db/utils/table/types';

const posts = createTable({
    name: 'Posts',
    schema: {
        id: t.int,
        title: t.text,
        categories: t.text,
        content: t.text,
        authors: t.text,
        contributors: t.text
    },
    primaryKeys: ['id']
});

export default posts;
