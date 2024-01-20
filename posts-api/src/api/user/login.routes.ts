import { credentials } from '@db/queries/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';

import validator from './validator';

import { password } from 'bun';

export default routes()
    // Parse credentials
    .state(validator)

    // Log in
    .post('/login', async ctx => {
        const info = credentials.get({ $username: ctx.state.username });

        // Check username and password
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

    // Handle fallback
    .use(send.plug)

