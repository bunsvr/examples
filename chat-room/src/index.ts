import { Router as Stric } from '@stricjs/router';
import { dir } from '@stricjs/utils';
import pages from './pages';
import room from './ws/room';

export default new Stric({ hostname: '0.0.0.0' })
    .plug(pages, room)
    .all('/public/*', dir(import.meta.dir + '/public'));
