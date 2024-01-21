import { t, vld, type Infer } from 'vld-ts';

// The schema fields should be the same as database query fields
export const User = t.obj({
    name: t.str,
    pass: t.str
});

// Schema type
export type User = Infer<typeof User>;

// Validator
export const isUser = vld(User);
