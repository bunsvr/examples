import { username, password } from '@db/user';
import { t, vld, type Infer } from 'vld-ts';

// The schema fields should be the same as database query fields
export const User = t.obj({
    [username]: t.str,
    [password]: t.str
});

// Schema type
type User = Infer<typeof User>;

// Validator
export const isUser = vld(User);
