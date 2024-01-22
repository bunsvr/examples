import { plugin } from '@stricjs/app';

import getAPIKey from './getAPIKey';
import invalidAPIKey from './invalidAPIKey';

import { apiKeyExists } from '@db/queries/user';

// Validate token
export default plugin(routes => routes
    // Get token
    .state({ $apiKey: getAPIKey })
    // Validate and reject
    .guard(ctx => apiKeyExists.get(ctx.state))
    .reject(invalidAPIKey)
);
