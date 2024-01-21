import { test, expect } from 'bun:test';
import body from './mockUser';
import app from '@app';
import { client } from '@stricjs/app';

const tc = client(app);

test('Sign up', async () => {
    const res = await tc.post('/api/user/signup', { body });

    expect(res.status).not.toBe(400);
});

test('Log in', async () => {
    const res = await tc.post('/api/user/login', { body });

    expect(res.status).toBe(200);
});
