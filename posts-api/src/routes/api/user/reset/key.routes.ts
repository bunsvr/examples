import { routes } from '@stricjs/app';
import { text, status } from '@stricjs/app/send';
import * as parser from '@stricjs/app/parser';

import { updateAPIKey, usernameWithKey } from '@db/queries/user';
import createAPIKey from '../createAPIKey';

export default routes()
    // Parse API key as text and check in DB
    .state(parser.text)
    .state(ctx => usernameWithKey.get({ $apiKey: ctx.state }))

    // Handle API key not found
    .reject(() => status('Invalid API key', 403))

    // Create new API key, update and send back the new key
    .put('/key', ctx => {
        const { username: $username } = ctx.state,
            $apiKey = createAPIKey($username);

        // Update the API key of the current user (search by username)
        updateAPIKey.run({ $username, $apiKey });

        // Return the key back
        return text($apiKey);
    })


