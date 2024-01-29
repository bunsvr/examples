import createProps from './createProps';
import createRows from './createRows';
import createSelectors from './createSelectors';
import createTableInit from './createTableInit';

export interface TableOptions<Name extends string = any, Schema extends Record<string, string> = any> {
    name: Name;
    schema: Schema;

    primaryKeys?: Extract<keyof Schema, string>[];
}

export default <Name extends string, Schema extends Record<string, string>>(o: TableOptions<Name, Schema>) => {
    const keys = Object.keys(o.schema) as Extract<keyof Schema, string>[];

    const props: {
        [K in Extract<keyof Schema, string>]: K
    } = createProps(keys) as any;

    const x = {
        $: createSelectors(props),
        init: createTableInit(o),
        table: o.name, props,

        list: (...rows: Extract<keyof Schema, string>[]) => rows,
        select: (...rows: Extract<keyof Schema, string>[]) => rows.map(row => x.$[row]).join(),

        rows: createRows(o.name, props),
        keys,
        vars: keys.map(v => '$' + v)
    };

    return x;
}
