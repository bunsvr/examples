import { Router as Stric } from '@stricjs/router';
import { dir, group } from '@stricjs/utils';
import room from './ws/room';

new Stric()
    // Plugin for pages and rooms
    .plug(room)
    // Serve the public directory
    .all('/public/*', dir(import.meta.dir + '/public'))
    .plug(group(import.meta.dir + '/pages', {
        extensions: ['.html'],
        select: 'extensions'
    }))
    // Start the server
    .listen();
