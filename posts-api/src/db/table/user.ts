import createTable from '@db/utils/table/createTable';
import t from '@db/utils/table/types';

const users = createTable({
    name: 'Users',
    schema: {
        name: t.text,
        password: t.text,
        apiKey: t.text
    },
    primaryKeys: ['name', 'apiKey']
});

export default users;

