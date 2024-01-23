import type { Database } from 'bun:sqlite';

export default (db: Database, name: string, properties: Record<string, string>, primaryKeys: string[] = []) => {
    const props = [];
    for (const propName in properties)
        props.push(`${propName} ${properties[propName]}`);

    db.run(`create table if not exists ${name} ( ${props.join()}${primaryKeys.length === 0 ? '' : `,primary key (${primaryKeys})`} )`);
}
