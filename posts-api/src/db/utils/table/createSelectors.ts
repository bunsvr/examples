export default <T extends Record<string, string>>(props: T): {
    [K in keyof T]: `$${T[K]}`
} => {
    const o: any = {};

    for (const key in props)
        o[key] = '$' + props[key];

    return o;
}
