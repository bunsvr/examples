import { dir, group } from '@stricjs/utils';
import routes from './routes';
import { cors } from './store/cors';
import { router } from '@stricjs/router';

export default router(
    routes, group(import.meta.dir + '/pages', {
        extensions: ['.html'],
        select: 'extensions',
        // Allow pages to be accessed outside
        headers: cors.headers
    })
)
    // Serve all files in `public`
    .all('/public/*', dir(import.meta.dir + '/public', {
        // Allow resources to be accessed outside
        headers: cors.headers
    }))
    // Use default 404
    .use(404);
