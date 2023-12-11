import { routes } from '@stricjs/app';
import render from './page.template';
import { qs } from '@stricjs/utils';
import { stat, html } from '@stricjs/app/send';

// Get the room ID
const getID = qs.searchKey('id');

export default routes().get('/room', c => {
    const id = getID(c);

    // Basic validation
    return id === null ? stat("A room ID must be provided!", 400) : html(render({ id }));
});
