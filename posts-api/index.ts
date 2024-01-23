import { build } from '@stricjs/app';
import { status } from '@stricjs/app/send';

// Build routes
const app = await build({
    // Auto prefix routes path by directory name
    autoprefix: true,
    // Load routes from specific directories
    routes: ['./src/routes'],

    // Serve options
    serve: {
        reusePort: true,
        error: (err) => {
            // Log info to console then return 500
            console.error(err);
            return status(null, 500);
        }
    }
});

// Log routes only logs in dev
app.logRoutes();

// Use for testing
export default app.boot();
