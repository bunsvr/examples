import type { User } from '@schema/user';

export const oldPass = '123456789',
    newPass = '1234567890';

export const user = {
    name: 'John',
    pass: oldPass
} satisfies User;
