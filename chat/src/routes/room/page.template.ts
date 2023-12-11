import { template } from '@stricjs/utils';

// For VSCode users install `es6-html-string` extension
export default template.create(`
    <!DOCTYPE html>
    <html>

    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='stylesheet' href='/public/styles/room.css' />
        <title>$(id: str)</title>
    </head>

    <body>
        <main id='msgbox'></main>
        <form id='msgsubmit'>
            <input type='text' id='msginp' placeholder='Send a message...' />
            <button type='submit'>Send</button>
        </form>
        <script src='/public/scripts/room.js'></script>
    </body>

    </html>
`);
