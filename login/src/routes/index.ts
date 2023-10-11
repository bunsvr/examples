import { Group } from '@stricjs/router';
import login from './login';

export default new Group('/api').plug(login);
