export default <T extends string, O extends Record<string, string>>(table: T, props: O): {
    [K in keyof O]: `${T}.${O[K]}`
} => {
    const o: any = {};

    for (const key in props)
        o[key] = `${table}.${props[key]}`;

    return o;
}
