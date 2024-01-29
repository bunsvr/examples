const t = {
    text: 'text not null',
    int: 'int not null',
    ref: (type: string, ref: string) => `${type} references ${ref}`
};

export default t;
