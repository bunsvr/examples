import { status } from '@stricjs/app/send';

export default () => status('Invalid API key', 403);
