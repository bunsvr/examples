export default <T extends string[]>(props: T): { [K in T[number]]: K; } => {
    const o: any = {};
    for (const key of props) o[key] = key;
    return o;
}
