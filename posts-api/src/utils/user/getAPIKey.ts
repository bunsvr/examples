import { state } from '@stricjs/app';
import { auth } from '@stricjs/utils';

// Get token and verify using Bearer
export default state(ctx => auth.bearer(ctx.req));
