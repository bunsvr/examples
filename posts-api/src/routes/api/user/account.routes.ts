import { createUser, userExists, credentials } from '@db/queries/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';

import { password } from 'bun';

import validator from './validator';
import createAPIKey from './createAPIKey';

export default routes()
    // Parse credentials
    .use(validator)

    // Sign up
    .post('/signup', async ctx => {
        const { name: $username } = ctx.state;

        if (userExists.get({ $username }) === null) {
            const $password = await password.hash(ctx.state.pass),
                $apiKey = createAPIKey($username);

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
        const info = credentials.get({ $username: ctx.state.name });

        // Check username and password
        if (info !== null && await password.verify(ctx.state.pass, info.password)) {
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
