import { test, expect } from 'bun:test';
import { newPass, oldPass, user } from './mockData';
import app from '@app';
import { client } from '@stricjs/app';

const tc = client(app, '/api/user');

// Sign up and log in info
const userInfo = { body: user };

test('Sign up', async () => {
    // Sign up and log in
    console.time('Account creation');

    const resSignup = await tc.post('/signup', userInfo);
    expect(resSignup.status).not.toBe(400);

    const resLogin = await tc.post('/login', userInfo);
    expect(resLogin.status).toBe(200);

    console.timeEnd('Account creation');

    // API key reset
    console.time('Reset API key');

    const oldKey = await resLogin.text();

    const resResetKey = await tc.put('/reset/key', {
        headers: { authorization: `Bearer ${oldKey}` }
    });
    expect(resResetKey.status).toBe(200);

    const newKey = await resResetKey.text();
    expect(newKey).not.toBe(oldKey);

    console.timeEnd('Reset API key');

    // Reset password
    console.time('Reset password');

    const headers = { authorization: `Bearer ${newKey}` };

    let resResetPass = await tc.put('/reset/pass', { body: newPass, headers });
    expect(resResetPass.status).toBe(200);

    resResetPass = await tc.put('/reset/pass', { body: oldPass, headers });
    expect(resResetPass.status).toBe(200);

    console.timeEnd('Reset password');
});
