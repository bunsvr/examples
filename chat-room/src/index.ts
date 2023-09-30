import { Router as Stric } from '@stricjs/router';
import { dir } from '@stricjs/utils';
import pages from './pages';
import room from './ws/room';

export default new Stric()
    // Plugin for pages and rooms
    .plug(pages)
    .plug(room)
    // Serve the public directory
    .all('/public/*', dir(import.meta.dir + '/public'));
