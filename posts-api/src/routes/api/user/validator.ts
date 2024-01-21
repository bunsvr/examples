import { plugin } from '@stricjs/app';
import { jsonv } from '@stricjs/app/parser';

import { isUser } from '@schema/user';

export default plugin(
    routes => routes.state(
        jsonv(isUser), ctx => {
            // Handle error
            ctx.body = 'Invalid username or password';
            ctx.status = 400;

            // Call the fallback
            return null;
        }
    )
);

