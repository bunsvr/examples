import { routes } from '@stricjs/app';
import render from './page.template';
import { qs } from '@stricjs/utils';
import { stat, html } from '@stricjs/app/send';
import route from './index.ws';

// Get the room ID
const getID = qs.searchKey('id'), userLimit = 1e5 + 7;

export default routes('/room')
    .get('/', c => {
        const id = getID(c);

        // Basic validation
        return id === null ? stat('A room ID must be provided!', 400) : html(render({ id }));
    })
    .get('/ws', c => {
        const room = getID(c);
        if (room === null) return;

        return route.upgrade(c, {
            data: { name: `User${Date.now() % userLimit}`, room }
        });
    });
