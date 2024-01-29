import { createUser, userExists, credentials } from '@db/queries/user';

import createAPIKey from '@utils/user/createAPIKey';
import passwordHash from '@utils/user/passwordHash';

import { routes } from '@stricjs/app';
import { plug } from '@stricjs/app/send';
import { jsonv } from '@stricjs/app/parser';

import { password } from 'bun';

import { t, vld } from 'vld-ts';

// Input user detail
const User = t.obj({
    name: t.str,
    pass: t.str
}), validator = jsonv(vld(User));

export default routes()
    // Parse credentials
    .state(validator, ctx => {
        // Handle error
        ctx.body = 'Invalid username or password';
        ctx.status = 400;

        // Call the fallback
        return null;
    })

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
    .use(plug);
