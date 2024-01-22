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
        const { username: $username } = ctx.state,
            $apiKey = createAPIKey($username);

        // Update the API key of the current user (search by username)
        updateKeyByUsername.run({ $username, $apiKey });

        // Return the key back
        return text($apiKey);
    });
