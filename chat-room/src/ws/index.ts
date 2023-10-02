import { Group } from '@stricjs/router';
import room from './room';

export default new Group('/ws').plug(room);
