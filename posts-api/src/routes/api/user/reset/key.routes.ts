import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

import { updateKeyByUsername, usernameWithKey } from '@db/queries/user';

import createAPIKey from '@utils/user/createAPIKey';
import getAPIKey from '@utils/user/getAPIKey';
import apiKeyReject from '@utils/user/apiKeyReject';

export default routes()
    // Parse API key as text and check in DB
    .state(getAPIKey)
    // Check token and get username from state
    .state(ctx => usernameWithKey.get({ $apiKey: ctx.state }))
    .reject(apiKeyReject)

    // Create new API key, update and send back the new key
    .put('/key', ctx => {
        const { name: $name } = ctx.state,
            $apiKey = createAPIKey($name);

        // Update the API key of the current user (search by username)
        updateKeyByUsername.run({ $name, $apiKey });

        // Return the key back
        return text($apiKey);
    });
