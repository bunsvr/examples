import { Router, macro } from '@stricjs/router';

export default new Router({
    base: 'http://localhost:3000'
}).get('/', macro('Hello world!'));
