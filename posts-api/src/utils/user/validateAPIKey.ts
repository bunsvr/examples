import { plugin } from '@stricjs/app';

import getAPIKey from './getAPIKey';
import apiKeyReject from './apiKeyReject';

import { apiKeyExists } from '@db/queries/user';

// Validate token
export default plugin(routes => routes
    // Get token
    .state({ $apiKey: getAPIKey })
    // Validate and reject
    .guard(ctx => apiKeyExists.get(ctx.state))
    .reject(apiKeyReject)
);
