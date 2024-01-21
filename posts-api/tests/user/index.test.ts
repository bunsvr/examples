import { test, expect } from 'bun:test';
import mockUser from './mockUser';
import app from '@app';
import { client } from '@stricjs/app';

const tc = client(app, '/api/user');

test('User account', async () => {
    // Sign up and log in
    const userInfo = { body: mockUser };

    const resSignup = await tc.post('/signup', userInfo);
    expect(resSignup.status).not.toBe(400);

    const resLogin = await tc.post('/login', userInfo);
    expect(resLogin.status).toBe(200);

    // API key reset
    const oldKey = await resLogin.text();
    console.log('Old API key:', oldKey);

    const resResetKey = await tc.put('/reset/key', { body: oldKey });
    expect(resResetKey.status).toBe(200);

    const newKey = await resResetKey.text();
    console.log('New API key:', newKey);
    expect(newKey).not.toBe(oldKey);
});
