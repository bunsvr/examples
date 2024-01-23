export default (name: string, properties: Record<string, string>, primaryKeys: string[] = []) => {
    const props = [];
    for (const propName in properties)
        props.push(`${propName} ${properties[propName]}`);

    return `create table if not exists ${name} ( ${props.join()}${primaryKeys.length === 0 ? '' : `,primary key (${primaryKeys})`} )`;
}
