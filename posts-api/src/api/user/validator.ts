import { jsonv } from '@stricjs/app/parser';
import { isUser } from '@schema/user';

export default jsonv(isUser, ctx => {
    // Handle error
    ctx.body = 'Invalid username or password';
    ctx.status = 400;

    // Call the fallback
    return null;
});

