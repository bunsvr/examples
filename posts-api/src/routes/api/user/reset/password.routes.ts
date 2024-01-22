import { layer, routes, type Handler } from '@stricjs/app';

import { updatePassByKey } from '@db/queries/user';

import passwordHash from '@utils/user/passwordHash';
import validateToken from '@utils/user/validateAPIKey';

const hashPass = (
    async ctx => passwordHash(await ctx.req.text())
) satisfies Handler;

export default routes()
    // Validate token
    .use(validateToken)

    // Hash input password
    .state({ $password: layer(hashPass) })

    // Update password and send back 200
    .put('/pass', ctx => {
        // Include $password and $apiKey
        updatePassByKey.run(ctx.state);
        return new Response;
    });

