import type { TableOptions } from './createTable';

export default (options: TableOptions) => {
    const props = [];
    for (const propName in options.schema)
        props.push(`${propName} ${options.schema[propName]}`);

    const { primaryKeys } = options,
        noPrimaryKeys = typeof primaryKeys === 'undefined' || primaryKeys.length === 0;

    return `create table if not exists ${options.name} ( ${props.join()}${noPrimaryKeys ? '' : `,primary key (${primaryKeys})`} )`;
}
