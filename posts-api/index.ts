import { build } from '@stricjs/app';

// Build routes
const app = await build({
    routes: ['./src/api'],
    serve: { reusePort: true }
});

// Seve with Bun
export default app;
