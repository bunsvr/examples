import { plugin } from '@stricjs/app';

import getAPIKey from '@utils/user/getAPIKey';
import apiKeyReject from '@utils/user/apiKeyReject';

import { usernameWithKey } from '@db/queries/user';

/**
 * Validate API key and get the corresponding username
 */
export default plugin(routes => routes
    .state(getAPIKey)
    // Check token and get username from state
    .state(ctx => usernameWithKey.get({ $apiKey: ctx.state }))
    .reject(apiKeyReject)
);
