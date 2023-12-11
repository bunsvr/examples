import { init } from '@stricjs/app';

init({
    // Enable WebSocket
    ws: true,
    // All routes are located in src
    routes: ['src']
});
