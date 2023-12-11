import { routes } from '@stricjs/app';
import { file } from '@stricjs/utils';

export default routes()
    .get('/', file(import.meta.dir + '/page.html'));
