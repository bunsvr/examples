import { build } from '@stricjs/app';
import { status } from '@stricjs/app/send';

// Build routes
const app = await build({
    routes: ['./src/api'],
    serve: {
        reusePort: true,
        error: err => {
            console.log(err);
            return status(null, 500);
        }
    },
});

app.logRoutes();
app.boot();

// Seve with Bun
export default app;
