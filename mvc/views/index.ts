// There will be a better way to do this with `group`
import { Group } from '@stricjs/router';
import { file } from '@stricjs/utils';

export default new Group()
    .all('/', file(import.meta.dir + '/index.html'))
