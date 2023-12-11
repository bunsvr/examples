import { routes } from '@stricjs/app';
import { dir } from '@stricjs/utils';

// Serve static resources in public directory
export const main = () => routes('/public')
    .get('/*', dir('./public'));
