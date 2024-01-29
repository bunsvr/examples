import { routes } from '@stricjs/app';
import { text } from '@stricjs/app/send';

import { updateKeyByUsername } from '@db/queries/user';

import createAPIKey from '@utils/user/createAPIKey';
import getUserFromKey from '@utils/user/getUserFromKey';

export default routes('/key')
    .use(getUserFromKey)

    // Create new API key, update and send back the new key
    .put('/', ctx => {
        const { name: $name } = ctx.state,
            $apiKey = createAPIKey($name);

        // Update the API key of the current user (search by username)
        updateKeyByUsername.run({ $name, $apiKey });

        // Return the key back
        return text($apiKey);
    });
