import { createUser, searchUser } from '@db/queries/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';

import { password } from 'bun';

import validator from './validator';

export default routes()
    // Parse credentials
    .use(validator)

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

    // Handle wrap and fallback
    .use(send.plug);
