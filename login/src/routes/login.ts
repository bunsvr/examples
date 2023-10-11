import { Group } from '@stricjs/router';
import { guard } from '@stricjs/utils';
import { badReq } from '../store/codes';

const check = guard.create({
    name: 'str',
    pass: 'str'
}),
    // Don't do this in prod. This is just an example
    username = 'Reve',
    password = '1234567890';

export default new Group().post('/login', c => {
    const query = check(c.data);

    // Input type validation
    if (query === null) {
        c.set = badReq;
        return 'Invalid data sent';
    }

    // Other validation
    if (query.name === username && query.pass === password)
        return 'Login successfully';

    c.set = badReq;
    return 'Invalid credentials';
}, { body: 'json', wrap: 'send' });

