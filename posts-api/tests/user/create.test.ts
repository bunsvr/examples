import { test, expect } from 'bun:test';
import tc from '@client';
import body from './mockUser';

test('Sign up', async () => {
    const res = await tc.post('/api/user/signup', { body });

    expect(res.status).not.toBe(400);
});

test('Log in', async () => {
    const res = await tc.post('/api/user/login', { body });

    expect(res.status).toBe(200);
});
