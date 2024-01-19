import { parseUser } from '@schema/user';
import { createUser, userExists } from '@db/queries/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';
import createAPIKey from './createAPIKey';
import { apiKey } from '@db/user';

export default routes('/user')
    // Parse credentials
    .state(parseUser)
    .reject(() => send.stat('Invalid credentials', 403))

    // Cast password to the hash form
    .layer(async ctx => ctx.state.password = await Bun.password.hash(ctx.state.password))

    // Sign up
    .post('/signup', async ctx => {
        if (userExists.get(ctx.state)) {
            ctx.body = 'Your username has already been taken';
            ctx.status = 403;

            return;
        }

        // Set the API key for insert
        const key = ctx.state[apiKey] = createAPIKey();
        createUser.run(ctx.state);

        // Send back the API key
        ctx.body = key;
    }, send.ctx);
