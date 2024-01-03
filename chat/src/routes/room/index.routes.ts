import { routes } from '@stricjs/app';
import render from './page.template';
import { qs } from '@stricjs/utils';
import { stat, html } from '@stricjs/app/send';
import route from './index.ws';

// Get the room ID
const getID = qs.searchKey('id'), userLimit = 1e6 + 7;

export default routes('/room')
    .state({ id: getID })

    // Render room page
    .get('/', c => html(render(c.state)))

    // Websocket endpoint
    .get('/ws', c => route.upgrade(c, {
        data: { name: `User${Date.now() % userLimit}`, room: c.state.id }
    }))

    // Fallback
    .reject(() => stat('A room ID must be provided!', 400));
