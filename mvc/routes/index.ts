import { Group } from "@stricjs/router";

// This example is very simple
// This describes how you would use router groups
const ids = new Set(['001', '002', '003', '004', '005']);

export default new Group('/api')
    .get('/check', c => {
        const id = c.data.get('id');

        if (id === null) {
            c.status = 400;
            return 'Invalid ID!';
        }

        if (!ids.has(id.toString())) {
            c.status = 404;
            return 'ID not found!';
        }

        return 'ID found!';
    }, { body: 'form', wrap: 'send' })
