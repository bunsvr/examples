import { Router as Stric } from '@stricjs/router';
import routes from './routes';
import views from './views';

export default new Stric()
    .plug(routes)
    .plug(views);
