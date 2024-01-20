import { isUser } from '@schema/user';
import { createUser, credentials, searchUser } from '@db/queries/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';
import { jsonv } from '@stricjs/app/parser';

import { password } from 'bun';

export default routes('/user')
    // Parse credentials
    .state(
        jsonv(isUser, ctx => {
            // Handle error
            ctx.body = 'Invalid username or password';
            ctx.status = 400;

            return null;
        })
    )

    // Sign up
    .post('/signup', async ctx => {
        const { username: $username } = ctx.state;

        if (searchUser.get({ $username }) === null) {
            const $password = await password.hash(ctx.state.password),
                $apiKey = Bun.CryptoHasher.hash('sha256', $username, 'base64');

            // Set the API key for insert
            createUser.run({ $username, $password, $apiKey });

            // Send back the API key
            ctx.body = $apiKey;

            return;
        }

        ctx.body = 'Your username has already been taken';
        ctx.status = 403;

        // Call the fallback
        return null;
    })

    // Log in
    .post('/login', async ctx => {
        const info = credentials.get({ $username: ctx.state.username });

        // API key check
        if (info !== null && await password.verify(ctx.state.password, info.password)) {
            ctx.body = info.apiKey;
            return;
        }

        // Send back the key
        ctx.body = 'Invalid username or password';
        ctx.status = 403;

        // Call the fallback
        return null;
    })

    // Handle wrap and fallback
    .use(send.plug);
