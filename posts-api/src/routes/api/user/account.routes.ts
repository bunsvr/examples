import { createUser, userExists, credentials } from '@db/queries/user';

import createAPIKey from '@utils/user/createAPIKey';
import passwordHash from '@utils/user/passwordHash';

import { isUser } from '@schema/user';

import { routes } from '@stricjs/app';
import * as send from '@stricjs/app/send';
import * as parser from '@stricjs/app/parser';

import { password } from 'bun';

export default routes()
    // Parse credentials
    .state(
        parser.jsonv(isUser), ctx => {
            // Handle error
            ctx.body = 'Invalid username or password';
            ctx.status = 400;

            // Call the fallback
            return null;
        }
    )

    // Sign up
    .post('/signup', async ctx => {
        const { name: $name } = ctx.state;

        if (userExists.get({ $name }) === null) {
            const $password = await passwordHash(ctx.state.pass),
                $apiKey = createAPIKey($name);

            // Set the API key for insert
            createUser.run({ $name, $password, $apiKey });

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
        const info = credentials.get({ $name: ctx.state.name });

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
