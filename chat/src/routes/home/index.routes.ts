import { routes } from '@stricjs/app';
import { html } from '@stricjs/app/send';

const page = await Bun.file(import.meta.dir + '/page.html').text();

export default routes()
    .get('/', () => html(page));
