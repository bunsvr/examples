import { Router as Stric } from '@stricjs/router';
import { dir, group } from '@stricjs/utils';
import ws from './ws';

const app = new Stric()
    // Serve the public directory
    .all('/public/*', dir(import.meta.dir + '/public'))
    // Serve html files in pages and add websocket
    .plug(ws, group(import.meta.dir + '/pages', {
        extensions: ['.html'],
        select: 'extensions'
    }));

// Start the server
app.listen();
