import { Group } from '@stricjs/router';
import { file } from '@stricjs/utils';

const root = import.meta.dir + '/';

export default new Group()
    // Serve pages
    .get('/', file(root + 'index.html'))
    .get('/room/*', file(root + 'room.html'));

